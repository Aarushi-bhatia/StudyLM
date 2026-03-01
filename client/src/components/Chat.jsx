import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Send,
  Upload,
  FileText,
  Sparkles,
  MessageSquare,
  Zap,
} from "lucide-react";
import Nav from "./Nav";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

const TypewriterMarkdown = ({ content, speed = 10, onType }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < content.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + content[index]);
        setIndex((prev) => prev + 1);
        if (onType) onType();
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, content, speed, onType]);

  return <ReactMarkdown>{displayedText}</ReactMarkdown>;
};

/**
 * Chat component — the main chat interface.
 * Props:
 *   activeChatId   — currently active chat's _id (null for new chat)
 *   setActiveChatId — setter from parent to update active chat
 *   onNewChat      — callback to refresh the sidebar after a new chat is created
 */
const Chat = ({ activeChatId, setActiveChatId, onNewChat }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // ─── Auth: handle Google OAuth token from URL ───
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      try {
        const tokenPayload = JSON.parse(atob(urlToken.split(".")[1]));
        const userData = {
          username: tokenPayload.name || tokenPayload.email,
          token: urlToken,
        };
        login(userData);
        window.history.replaceState({}, document.title, "/chat");
        return;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    const existingToken = localStorage.getItem("token");
    if (!existingToken) {
      setTimeout(() => navigate("/auth"), 2000);
    }
  }, [navigate, login]);

  const backend_IP = import.meta.env.VITE_BACKEND_IP;

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      role: "model",
      content:
        "Hi! I'm ready to help you analyze your PDF. Upload a document and ask me anything about it!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // ─── Load messages when activeChatId changes ───
  useEffect(() => {
    if (!activeChatId) {
      // Reset to fresh state for a new chat
      setMessages([
        {
          id: 1,
          type: "bot",
          role: "model",
          content:
            "Hi! I'm ready to help you analyze your PDF. Upload a document and ask me anything about it!",
          timestamp: new Date(),
        },
      ]);
      setUploadedFile(null);
      setInputValue("");
      return;
    }

    // Load existing chat messages
    const loadMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${backend_IP}/api/chats/${activeChatId}/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();

        // Convert DB messages to component format
        const loadedMessages = data.messages.map((msg, idx) => ({
          id: msg._id || idx,
          type: msg.role === "user" ? "user" : "bot",
          role: msg.role,
          content: msg.content,
          timestamp: new Date(msg.createdAt),
        }));

        setMessages(
          loadedMessages.length > 0
            ? loadedMessages
            : [
                {
                  id: 1,
                  type: "bot",
                  role: "model",
                  content: "This chat has no messages yet. Ask something!",
                  timestamp: new Date(),
                },
              ]
        );

        // Restore PDF context info from chat metadata
        if (data.chat?.pdfId) {
          // We mark that a PDF was associated; user may need to re-upload
          // for RAG to work on follow-up questions.
          setUploadedFile({ name: data.chat.pdfId, fromHistory: true });
        }
      } catch (err) {
        console.error("Error loading chat messages:", err);
      }
    };

    loadMessages();
  }, [activeChatId, backend_IP]);

  // ─── Send Message (unified: new chat + follow-up) ───
  const handleSendMessage = async () => {
    if (!inputValue.trim() || !uploadedFile) return;

    const userContent = inputValue.trim();
    const newMessage = {
      id: Date.now(),
      type: "user",
      role: "user",
      content: userContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("content", userContent);

      // Attach chatId if continuing an existing conversation
      if (activeChatId) {
        formData.append("chatId", activeChatId);
      }

      // Attach PDF — always send it so RAG works
      if (uploadedFile && !uploadedFile.fromHistory) {
        formData.append("document", uploadedFile);
      }

      // If from history, include pdfId reference
      if (uploadedFile?.fromHistory) {
        formData.append("pdfId", uploadedFile.name);
      }

      const response = await axios.post(
        `${backend_IP}/api/chats/message`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { chatId, aiMessage, isNewChat } = response.data;

      // If a new chat was created, update activeChatId
      if (isNewChat && chatId) {
        setActiveChatId(chatId);
        // Notify sidebar to refresh
        if (onNewChat) onNewChat();
      }

      // Add AI response to messages
      const botResponse = {
        id: aiMessage?._id || Date.now() + 1,
        type: "bot",
        role: "model",
        content: aiMessage?.content || "Sorry, no answer was returned.",
        timestamp: new Date(aiMessage?.createdAt || Date.now()),
      };
      setMessages((prev) => [...prev, botResponse]);

      // Notify sidebar to refresh updatedAt order
      if (onNewChat) onNewChat();
    } catch (error) {
      const errorMessage = {
        id: Date.now(),
        type: "bot",
        role: "model",
        content: "Oops, something went wrong. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFileUpload = (file) => {
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
      const uploadMessage = {
        id: Date.now(),
        type: "system",
        content: `PDF "${file.name}" uploaded successfully! You can now ask questions about this document.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, uploadMessage]);
    }
  };

  const handleResetDocument = () => {
    setUploadedFile(null);
    setActiveChatId(null);
    setMessages([
      {
        id: 1,
        type: "bot",
        role: "model",
        content:
          "Hi! I'm ready to help you analyze your PDF. Upload a document and ask me anything about it!",
        timestamp: new Date(),
      },
    ]);
    setInputValue("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) handleFileUpload(files[0]);
  };

  const suggestedQuestions = [
    "What's the main topic of this document?",
    "Summarize the key points",
    "Find specific information about...",
    "What are the conclusions?",
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <Nav
        uploadedFile={uploadedFile}
        handleResetDocument={handleResetDocument}
      />

      <div className="flex-1 flex flex-col w-full min-h-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="w-full max-w-4xl mx-auto space-y-4">
            {!uploadedFile && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-[#7182FF] via-[#6F87F9] to-[#00affa] rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-3">
                  Upload Your PDF to Get Started
                </h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Drop your PDF here or click to upload. I'll analyze it and
                  answer any questions you have about the content.
                </p>

                {/* Drop Zone */}
                <div
                  className={`border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer mb-8 ${
                    isDragging
                      ? "border-[#7182FF] bg-[#7182FF]/10 scale-105"
                      : "border-gray-600 hover:border-[#7182FF] hover:bg-[#7182FF]/5"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 text-[#7182FF] mx-auto mb-4" />
                  <p className="text-black dark:text-white font-medium mb-2">
                    Drop PDF here or click to upload
                  </p>
                  <p className="text-gray-400 text-sm">
                    Support for PDF files containing text
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  className="hidden"
                />

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                  <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-black/10 dark:border-white/10">
                    <Zap className="w-8 h-8 text-yellow-400 mb-3 mx-auto" />
                    <h3 className="text-gray-600 dark:text-white font-medium mb-2">
                      Instant Analysis
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Get immediate insights from your documents
                    </p>
                  </div>
                  <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-black/10 dark:border-white/10">
                    <MessageSquare className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
                    <h3 className="text-gray-600 dark:text-white font-medium mb-2">
                      Natural Chat
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Ask questions in plain English
                    </p>
                  </div>
                  <div className="bg-black/5 dark:bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-black/10 dark:border-white/10">
                    <Sparkles className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
                    <h3 className="text-gray-600 dark:text-white font-medium mb-2">
                      Smart Summaries
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Extract key information automatically
                    </p>
                  </div>
                </div>
              </div>
            )}

            {messages.map((message, index) => {
              const isLastMessage = index === messages.length - 1;

              return (
                <div
                  key={message.id}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={` px-4 py-3 rounded-2xl ${
                      message.type === "user"
                        ? "max-w-xs lg:max-w-md bg-[#7182FF]/10 dark:bg-[#7182FF]/20 text-gray-600 dark:text-white backdrop-blur-sm border border-[#7182FF]/40 dark:border-white/20"
                        : message.type === "system"
                        ? "max-w-xs lg:max-w-md bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-300 border border-green-500/30"
                        : "w-full max-w-6xl text-left text-gray-600 dark:text-white leading-relaxed"
                    }`}
                  >
                    <div
                      className={`text-md ${
                        message.type === "bot"
                          ? "prose prose-sm md:prose-base dark:prose-invert max-w-none"
                          : ""
                      }`}
                    >
                      {message.type === "bot" && isLastMessage && !isTyping ? (
                        <TypewriterMarkdown
                          content={message.content}
                          speed={5}
                          onType={scrollToBottom}
                        />
                      ) : (
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggested Questions */}
        {uploadedFile && messages.length <= 2 && (
          <div className="px-6 pb-4 w-full max-w-4xl mx-auto">
            <p className="text-gray-400 text-text text-sm mb-3">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(question)}
                  className="px-3 py-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 hover:dark:bg-white/10 rounded-lg border border-white/10 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-700 hover:dark:text-white transition-all duration-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className=" p-6 bg-black/5 w-full max-w-5xl mx-auto dark:bg-black/20 backdrop-blur-xl border-t border-black/10 dark:border-white/10">
          <div className="flex space-x-3 w-full max-w-4xl mx-auto">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={
                  uploadedFile
                    ? "Ask anything about your PDF..."
                    : "Upload a PDF to start chatting..."
                }
                disabled={!uploadedFile}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-gray-700 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7182FF] focus:border-transparent backdrop-blur-sm disabled:opacity-50"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || !uploadedFile}
              className="px-4 py-3 bg-[#7182FF] hover:bg-[#7182FF]/80 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
