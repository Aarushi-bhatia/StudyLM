"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconMenu2,
} from "@tabler/icons-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Chat from "./Chat.jsx";
import { MessageSquare, SquarePen, Clock, Trash2 } from "lucide-react";

export function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const [isHoverMode, setIsHoverMode] = useState(true);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const { chatId: urlChatId } = useParams();
  const [activeChatId, setActiveChatId] = useState(urlChatId || null);
  const location = useLocation();

  // Sync activeChatId from URL on mount / URL change
  useEffect(() => {
    if (urlChatId && urlChatId !== activeChatId) {
      setActiveChatId(urlChatId);
    }
  }, [urlChatId]);

  // Sync URL when activeChatId changes (push to history)
  useEffect(() => {
    if (activeChatId) {
      const targetPath = `/chat/${activeChatId}`;
      if (location.pathname !== targetPath) {
        navigate(targetPath, { replace: true });
      }
    } else {
      if (location.pathname !== "/chat") {
        navigate("/chat", { replace: true });
      }
    }
  }, [activeChatId]);

  // ─── Fetch sidebar chat list ───
  const fetchChatHistory = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

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

  // Fetch on mount and when path changes
  useEffect(() => {
    fetchChatHistory();
  }, [location.pathname, fetchChatHistory]);

  // ─── Handle new chat button ───
  const handleNewChat = () => {
    setActiveChatId(null); // Reset to fresh state
  };

  // ─── Handle clicking a sidebar chat ───
  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
  };

  // ─── Handle deleting a chat ───
  const handleDeleteChat = async (e, chatId) => {
    e.preventDefault();
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
        // If we deleted the active chat, reset
        if (activeChatId === chatId) {
          setActiveChatId(null);
        }
        fetchChatHistory();
      }
    } catch (err) {
      console.error("Error deleting chat:", err);
    }
  };

  // ─── Sidebar toggle ───
  const togglePin = () => {
    setIsHoverMode((prev) => {
      const newMode = !prev;
      if (newMode === false) setOpen(true);
      return newMode;
    });
  };
  const isOpen = isHoverMode ? open : true;

  // Format relative time for sidebar
  const formatRelativeTime = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-background">
      <div className="flex w-full h-screen">
        <Sidebar open={open} setOpen={setOpen} animate={isHoverMode}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              <div className="py-1">
                <SidebarToggle
                  onToggle={togglePin}
                  isPinned={!isHoverMode}
                  isOpen={isOpen}
                />
              </div>

              <div
                className={`mt-14 flex flex-col gap-2 ${
                  isOpen ? "items-start" : "items-center"
                }`}
              >
                {/* New Chat Button */}
                <button
                  onClick={handleNewChat}
                  className="flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors w-full group/sidebar"
                >
                  <SquarePen className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
                  {isOpen && (
                    <span className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre">
                      New Chat
                    </span>
                  )}
                </button>

                {/* Chat History */}
                {chats.length > 0 && (
                  <h2
                    className={`mt-8 text-sm font-semibold text-neutral-600 dark:text-white ${
                      isOpen ? "pl-3" : "self-center"
                    }`}
                  >
                    {isOpen ? "Recent" : "..."}
                  </h2>
                )}

                {chats.map((chat) => (
                  <button
                    key={chat._id}
                    onClick={() => handleSelectChat(chat._id)}
                    className={`flex items-center gap-2 py-2 px-2 rounded-lg transition-colors w-full text-left group/chat ${
                      activeChatId === chat._id
                        ? "bg-neutral-200 dark:bg-neutral-800"
                        : "hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
                    }`}
                  >
                    <MessageSquare className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                    {isOpen && (
                      <div className="flex-1 min-w-0">
                        <p className="text-neutral-700 dark:text-neutral-200 text-sm truncate">
                          {chat.title}
                        </p>
                        {/* <div className="flex items-center gap-1 mt-0.5">
                          <Clock className="h-3 w-3 text-neutral-400" />
                          <span className="text-xs text-neutral-400 truncate">
                            {formatRelativeTime(chat.updatedAt)}
                          </span>
                        </div> */}
                        {chat.lastMessagePreview && (
                          <p className="text-xs text-neutral-400 truncate mt-0.5">
                            {chat.lastMessagePreview}
                          </p>
                        )}
                      </div>
                    )}
                    {isOpen && (
                      <button
                        onClick={(e) => handleDeleteChat(e, chat._id)}
                        className="opacity-0 group-hover/chat:opacity-100 p-1 rounded hover:bg-red-500/20 transition-all"
                        title="Delete chat"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-red-400" />
                      </button>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div></div>
          </SidebarBody>
        </Sidebar>

        {/* Pass activeChatId and callbacks to Chat */}
        <Chat
          activeChatId={activeChatId}
          setActiveChatId={setActiveChatId}
          onNewChat={fetchChatHistory}
        />
      </div>
    </div>
  );
}

// Sidebar toggle button component
const SidebarToggle = ({ isPinned, onToggle, isOpen }) => {
  return (
    <button
      onClick={onToggle}
      className="group relative cursor-pointer z-20 flex items-center space-x-2 p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800"
      aria-label={isPinned ? "Collapse menu" : "Pin sidebar open"}
    >
      <IconMenu2 className="h-6 w-6 items-center shrink-0 text-neutral-700 dark:text-neutral-200" />

      {isOpen && (
        <span
          className="text-sm font-medium whitespace-pre text-neutral-700 dark:text-neutral-200
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          {isPinned ? "Collapse Menu" : "Keep Menu Expanded"}
        </span>
      )}
    </button>
  );
};
