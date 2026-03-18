import { useState, useCallback } from "react";

export const useChatHistory = (activeChatId, setActiveChatId) => {
    const [chats, setChats] = useState([]);

const fetchChatHistory = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined" || token === "null") return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_IP}/api/chats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch chat history");
      const data = await response.json();
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }, []);

    const handleDeleteChat = useCallback(async (e, chatId) => {
        e.stopPropagation();
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_IP}/api/chats/${chatId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          if (activeChatId === chatId) {
            setActiveChatId(null);
          }
          fetchChatHistory();
        }
      } catch (err) {
        console.error("Error deleting chat:", err);
      }
    })

  return {chats, fetchChatHistory, setChats, handleDeleteChat};
};