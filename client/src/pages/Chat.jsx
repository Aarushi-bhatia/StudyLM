import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Upload,
  FileText,
  Sparkles,
  MessageSquare,
  Zap,
} from "lucide-react";
import Nav from "../components/Nav";
import axios from "axios";
import { AuthProvider } from "../context/AuthContext";
import ReactMarkdown from "react-markdown";

const PDFChatHomepage = () => {
  const backend_IP = import.meta.env.VITE_BACKEND_IP

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !uploadedFile) return;

    const newMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const formData = new FormData();
      formData.append("document", uploadedFile);
      formData.append("question", inputValue);
      const token = localStorage.getItem("token");

      const response = await axios.post(`${backend_IP}/ask`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const botResponse = {
        id: Date.now() + 1,
        type: "bot",
        content: response.data.answer || "Sorry no answer was returned",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      const errorMessage = {
        id: Date.now(),
        type: "bot",
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
  setMessages([
    {
      id: 1,
      type: "bot",
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <AuthProvider>
        <Nav uploadedFile={uploadedFile} handleResetDocument={handleResetDocument} />
      </AuthProvider>

       {/* Main Content */}
      <div className="flex-1 flex max-w-4xl mx-auto w-full ">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {!uploadedFile && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">
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
                      ? "border-purple-500 bg-purple-500/10 scale-105"
                      : "border-gray-600 hover:border-purple-500 hover:bg-purple-500/5"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-white font-medium mb-2">
                    Drop PDF here or click to upload
                  </p>
                  <p className="text-gray-400 text-sm">
                    Support for PDF files up to 10MB
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
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <Zap className="w-8 h-8 text-yellow-400 mb-3 mx-auto" />
                    <h3 className="text-white font-medium mb-2">
                      Instant Analysis
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Get immediate insights from your documents
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <MessageSquare className="w-8 h-8 text-blue-400 mb-3 mx-auto" />
                    <h3 className="text-white font-medium mb-2">
                      Natural Chat
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Ask questions in plain English
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                    <Sparkles className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
                    <h3 className="text-white font-medium mb-2">
                      Smart Summaries
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Extract key information automatically
                    </p>
                  </div>
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.type === "user"
                      ? "bg-[#7182FF]/20  text-white backdrop-blur-sm border border-white/20"
                      : message.type === "system"
                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                      : "bg-white/10 text-white backdrop-blur-sm border border-white/20"
                  }`}
                >
                  <div className="text-sm"><ReactMarkdown>{message.content}</ReactMarkdown></div>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}

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

          {/* Suggested Questions */}
          {uploadedFile && messages.length <= 2 && (
            <div className="px-6 pb-4">
              <p className="text-gray-400 text-sm mb-3">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputValue(question)}
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-sm text-gray-300 hover:text-white transition-all duration-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="sticky bottom-0 p-6 bg-black/20 backdrop-blur-xl border-t border-white/10">
            <div className="flex space-x-3">
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
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8163]  focus:border-transparent backdrop-blur-sm disabled:opacity-50"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || !uploadedFile}
                className="px-4 py-3 bg-[#7182FF] hover:bg-[#FF8163]/80 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFChatHomepage;
