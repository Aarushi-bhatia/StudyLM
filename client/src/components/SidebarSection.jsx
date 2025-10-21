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
import { motion } from "motion/react";
import PDFChatHomepage from "./Chat.jsx";
import { MessageSquare, SquarePen } from "lucide-react";

export function SidebarDemo() {
  const links = [
    {
      label: "New Chat",
      href: "#",
      icon: (
        <SquarePen className="h-6 w-6 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  const [isHoverMode, setIsHoverMode] = useState(true);


  const [chats, setChats] = useState([]);

  useEffect(() => {
    // This function fetches from your backend
    const fetchChatHistory = async () => {
      try {
        // Assuming you have a way to make authenticated API calls
        const response = await fetch('/api/chats'); 
        if (!response.ok) {
          throw new Error('Failed to fetch chat history');
        }
        const data = await response.json();
        setChats(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChatHistory();
  }, []);

  

  const togglePin = () => {
    // Flip the mode
    setIsHoverMode((prev) => {
      const newMode = !prev;
      // If we are *entering* pinned mode (newMode is false),
      // force the sidebar open.
      if (newMode === false) {
        setOpen(true);
      }
      return newMode;
    });
  };
  const isOpen = isHoverMode ? open : true;

  return (
    <div className=" bg-background ">
      {/* Header */}
      <div className="flex w-full h-screen  ">
        <Sidebar open={open} setOpen={setOpen} 
        animate={isHoverMode}
        >
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              <div className="py-1">
                {/* 7. Update SidebarToggle props */}
                <SidebarToggle
                  onToggle={togglePin}
                  isPinned={!isHoverMode}
                  isOpen={isOpen}
                />
              </div>
              {/* {open ? <Logo /> : <LogoIcon />} */}
             <div
                className={`mt-14 flex flex-col gap-2 ${
                  isOpen ? "items-start" : "items-center"
                }`}
              >
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
                {/* --- START: Added Chat History List --- */}
                {/* Show "Recent" heading only if there are chats */}
                {chats.length > 0 && (
                  <h2 className={`mt-8 text-sm font-semibold text-neutral-600 dark:text-neutral-400 ${
                      isOpen ? "pl-3" : "self-center"
                  }`}>
                    {isOpen ? "Recent" : "..."}
                  </h2>
                )}

                {/* Map over the fetched chats */}
                {chats.map((chat) => (
                  <SidebarLink
                    key={chat.id}
                    link={{
                      label: chat.title, // This is the PDF name
                      href: `/chat/${chat.id}`,
                      icon: (
                        <MessageSquare className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
                      ),
                    }}
                  />
                ))}
                {/* --- END: Added Chat History List --- */}

              </div>
            </div>
            <div>
             

              {/* <SidebarLink
                link={{
                  label: "Manu Arora",
                  href: "#",
                  icon: (
                    <img
                      src="https://assets.aceternity.com/manu.png"
                      className="h-7 w-7 shrink-0 rounded-full"
                      width={50}
                      height={50}
                      alt="Avatar"
                    />
                  ),
                }}
              /> */}
            </div>
          </SidebarBody>
        </Sidebar>
        <PDFChatHomepage />
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
      {/* Show Pin or Menu icon based on state */}
      {isPinned ? (
        <IconMenu2 className="h-6 w-6 items-center shrink-0 text-neutral-700 dark:text-neutral-200" />
      ) : (
        <IconMenu2 className="h-6 w-6 items-center shrink-0 text-neutral-700 dark:text-neutral-200" />
      )}

      {/* Show text only if the sidebar is open */}
      {isOpen && (
        <span className="text-sm font-medium whitespace-pre text-neutral-700 dark:text-neutral-200
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {isPinned ? "Collapse Menu" : "Keep Menu Expanded"}
        </span>
      )}
    </button>
  );
};
