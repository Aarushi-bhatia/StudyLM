"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconMenu2,
  IconPin,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import Chat from "./Chat.jsx";
import { MessageSquare, SquarePen } from "lucide-react";

export function SidebarDemo() {
  const links = [
    {
      label: "New Chat",
      href: "/chat",
      icon: (
        <SquarePen className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const [isHoverMode, setIsHoverMode] = useState(true);

  const [chats, setChats] = useState([]);
  const location = useLocation();

  // useEffect(() => {
  //   // This function fetches from your backend
  //   const fetchChatHistory = async () => {
  //     try {
  //       // Assuming you have a way to make authenticated API calls
  //       const response = await fetch(
  //         `${import.meta.env.VITE_BACKEND_IP}/api/chats`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       // --- FIX ---
  //       // 1. Check if the response is OK
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch chat history");
  //       }

  //       // 2. Get the JSON data (which is your array of chats)
  //       const data = await response.json();

  //       // 3. Set the chats in state
  //       setChats(data);

  //       // 4. Delete the broken 'if' block that was here
  //       // ----------------
  //     } catch (error) {
  //       console.error("Error fetching chats:", error);
  //     }
  //   };
  //   fetchChatHistory();
  // }, [location.pathname]);

  // const togglePin = () => {
  //   // Flip the mode
  //   setIsHoverMode((prev) => {
  //     const newMode = !prev;
  //     // If we are *entering* pinned mode (newMode is false),
  //     // force the sidebar open.
  //     if (newMode === false) {
  //       setOpen(true);
  //     }
  //     return newMode;
  //   });
  // };
  // const isOpen = isHoverMode ? open : true;

  return (
    <div className=" bg-background ">
      {/* Header */}
      <div className="flex w-full h-screen  ">
        {/* <Sidebar open={open} setOpen={setOpen} animate={isHoverMode}>
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
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
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
                  <SidebarLink
                    key={chat._id}
                    link={{
                      label: chat.title, 
                      href: `/chat/${chat._id}`,
                      icon: (
                        <MessageSquare className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                      ),
                    }}
                  />
                ))}
              </div>
            </div>
            <div></div>
          </SidebarBody>
        </Sidebar> */}
        <Chat />
      </div>
    </div>
  );
}

// opening or closing sidebar
const SidebarToggle = ({ isPinned, onToggle, isOpen }) => {
  return (
    <button
      onClick={onToggle}
      className="group relative cursor-pointer z-20 flex items-center space-x-2 p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800"
      aria-label={isPinned ? "Collapse menu" : "Pin sidebar open"}
    >
      {isPinned ? (
        <IconMenu2 className="h-6 w-6 items-center shrink-0 text-neutral-700 dark:text-neutral-200" />
      ) : (
        <IconMenu2 className="h-6 w-6 items-center shrink-0 text-neutral-700 dark:text-neutral-200" />
      )}

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
