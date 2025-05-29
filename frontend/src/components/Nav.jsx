import React, { useState } from "react";
import { FileCode } from 'lucide-react';

const Nav = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
    const [answers, setAnswers] = useState([]);
  
  const [fileName, setFileName] = useState("");
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);

  const handleResetDocument = () => {
    // Reset document state
    setFile(null);
    setFileName("");
    setSummary("");
    setAnswers([]);
    setIsDocumentUploaded(false);
    setError("");
  };

  return (
    <header className="p-4 z-50 flex bg-[#2C2025] justify-between items-center border-b border-[#453940]">
      <div className="max-w-2xl mx-auto">
      <FileCode />
      <div className="text-2xl font-bold text-[#FFFFF]">DocChat</div>

      {/* Document indicator when uploaded */}
      {isDocumentUploaded && (
        <div className="flex items-center">
          <div className="flex items-center px-3 py-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <svg
              className="w-4 h-4 mr-2 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            <span className="text-sm">{fileName}</span>
          </div>
          <button
            onClick={handleResetDocument}
            className="px-3 py-2 ml-4 cursor-pointer rounded-lg font-medium text-sm transition-all bg-[#EA775C] hover:bg-gray-600 border border-gray-600"
          >
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              New Document
            </div>
          </button>
        </div>
      )}
      </div>
    </header>
  );
};

export default Nav;
