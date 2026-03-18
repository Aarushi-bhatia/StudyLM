import React from "react";
import ReactMarkdown from "react-markdown";
import TypewriterMarkdown from "./TypewriterMarkdown";
const MessageBubble = ({
  message,
  isLastMessage,
  isTyping,
  scrollToBottom,
}) => {
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
};
export default MessageBubble;