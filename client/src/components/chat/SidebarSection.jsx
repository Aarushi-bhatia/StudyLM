import React, { useEffect, useState, useCallback } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../ui/sidebar.jsx";
import { IconMenu2 } from "@tabler/icons-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Chat from "./Chat.jsx";
import { MessageSquare, SquarePen, Clock, Trash2 } from "lucide-react";
import { useChatHistory } from "../../hooks/useChatHistory.jsx";
import { useChatNavigation } from "../../hooks/useChatNavigation.jsx";

export function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const [isHoverMode, setIsHoverMode] = useState(true);
  const { chatId: urlChatId } = useParams();
  const [activeChatId, setActiveChatId] = useState(urlChatId || null);
  const location = useLocation();

  useEffect(() => {
    if (urlChatId && urlChatId !== activeChatId) {
      setActiveChatId(urlChatId);
    }
  }, [urlChatId]);

  const { chats, fetchChatHistory, handleDeleteChat } = useChatHistory(activeChatId, setActiveChatId);
  useChatNavigation(activeChatId);

  useEffect(() => {
    fetchChatHistory();
  }, [location.pathname, fetchChatHistory]);

  const handleNewChat = () => {
    setActiveChatId(null); // Reset to fresh state
  };

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
  };

  const togglePin = () => {
    setIsHoverMode((prev) => {
      const newMode = !prev;
      if (newMode === false) setOpen(true);
      return newMode;
    });
  };
  const isOpen = isHoverMode ? open : true;

  return (
    <div className="bg-background">
      <div className="flex w-full h-screen">
        <Sidebar open={open} setOpen={setOpen} animate={isHoverMode}>
          <SidebarBody className="justify-between gap-10">
            <div
              className={`flex flex-1 flex-col overflow-x-hidden ${
                isOpen
                  ? "overflow-y-auto custom-scrollbar"
                  : "overflow-y-hidden"
              }`}
            >
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
                  <div
                    key={chat._id}
                    onClick={() => handleSelectChat(chat._id)}
                    className={`flex items-center gap-2 py-2 px-2 rounded-lg transition-colors w-full cursor-pointer text-left group/chat ${
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
                        className="opacity-0 group-hover/chat:opacity-100 p-1 rounded hover:bg-red-500/20 cursor-pointer transition-all"
                        title="Delete chat"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-red-400" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div></div>
          </SidebarBody>
        </Sidebar>

        <Chat
          activeChatId={activeChatId}
          setActiveChatId={setActiveChatId}
          onNewChat={fetchChatHistory}
        />
      </div>
    </div>
  );
}

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
