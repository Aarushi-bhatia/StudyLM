import React from "react";

const Conversation = () => {
  return (
    <div
      key={index}
      className={`max-w-3xl mx-auto ${
        item.type === "question" ? "ml-auto mr-0 max-w-xl" : ""
      }`}
    >
      {item.type === "question" ? (
        <div className="bg-blue-600/30 m-8 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-blue-500/30">
          <ReactMarkdown>{item.content}</ReactMarkdown>
        </div>
      ) : item.type === "summary" ? (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
          <h2 className="font-bold text-lg mb-3 text-blue-300 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Document Summary
          </h2>
          <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/50">
            <ReactMarkdown>{item.content}</ReactMarkdown>
          </div>
        </div>
      ) : item.type === "error" ? (
        <div className="bg-red-900/30 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-red-500/50">
          <p className="text-red-200">{item.content}</p>
        </div>
      ) : (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
          <h2 className="font-bold text-lg mb-3 text-blue-300 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            Answer
          </h2>
          <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/50">
            <ReactMarkdown>{item.content}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversation;
