import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const Conversation = ({ item, index }) => {

  return (
    <div className="max-w-4xl mx-auto">
    <div
      className={`max-w-3xl mx-auto ${
        item.type === "question" ? "ml-auto mr-0 max-w-xl" : ""
      }`}
    >
      {item.type === "question" ? (
        <div className="bg-[#FF8163] m-8 bg-[#2C2025] backdrop-blur-sm rounded-xl p-4 shadow-lg border border-blue-500/30">
          <ReactMarkdown>{item.content}</ReactMarkdown>
        </div>
      ) : item.type === "error" ? (
        <div className="bg-red-900/30 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-red-500/50">
          <p className="text-red-200">{item.content}</p>
        </div>
      ) : (
        <div className="bg-[#FF8163] backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
          <h2 className="font-bold text-lg mb-3 text-black flex items-center">
            
            Answer
          </h2>
          <div className="bg-[#FF8163] p-4 rounded-lg border border-gray-600/50">
            <ReactMarkdown>{item.content}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Conversation;
