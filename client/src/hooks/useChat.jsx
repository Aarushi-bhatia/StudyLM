import { useEffect, useState } from "react";
import axios from "axios";

export const useChat = (activeChatId, setActiveChatId, onNewChat) => {
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
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!activeChatId) {
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

        if (data.chat?.pdfId) {
          setUploadedFile({ name: data.chat.pdfId, fromHistory: true });
        }
      } catch (err) {
        console.error("Error loading chat messages:", err);
      }
    };

    loadMessages();
  }, [activeChatId, backend_IP]);

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

      if (activeChatId) {
        formData.append("chatId", activeChatId);
      }

      if (uploadedFile && !uploadedFile.fromHistory) {
        formData.append("document", uploadedFile);
      }

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

      if (isNewChat && chatId) {
        setActiveChatId(chatId);
        if (onNewChat) onNewChat();
      }

      const botResponse = {
        id: aiMessage?._id || Date.now() + 1,
        type: "bot",
        role: "model",
        content: aiMessage?.content || "Sorry, no answer was returned.",
        timestamp: new Date(aiMessage?.createdAt || Date.now()),
      };
      setMessages((prev) => [...prev, botResponse]);

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

  return {
    messages,
    inputValue,
    setInputValue,
    uploadedFile,
    isTyping,
    handleSendMessage,
    handleFileUpload,
    handleResetDocument,
  };
};
