import React, { useState } from "react";

const FixedInput = ({
  answers,
  setAnswers,
  loading,
  setLoading,
  file,
  setFile,
  isDocumentUploaded,
}) => {
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(""); // clear any previous error
    }
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();

    if (!isDocumentUploaded) {
      setError("Please upload a document first.");
      return;
    }

    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    const currentQuestion = question;
    setQuestion("");
    setLoading(true);
    setError("");

    // Immediately add the question to the conversation
    setAnswers((prev) => [
      ...prev,
      {
        type: "question",
        content: currentQuestion,
      },
    ]);

    const formData = new FormData();
    formData.append("document", file);
    formData.append("question", currentQuestion);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/ask`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Add the answer to the conversation
      setAnswers((prev) => [
        ...prev,
        {
          type: "answer",
          content: data.answer,
        },
      ]);
    } catch (error) {
      setError("An error occurred while processing your question.");
      console.error("Error:", error);

      // Add the error to the conversation
      setAnswers((prev) => [
        ...prev,
        {
          type: "error",
          content: "An error occurred while processing your question.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 bg-[#2C2025] ">
      {/* Error message */}
      {error && (
        <div className="max-w-3xl mx-auto mb-4 p-3 bg-red-900/30 backdrop-blur-sm border border-red-500/50 rounded-lg text-red-200 shadow-lg">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 mr-2 mt-0.5 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Question input form */}
      <form onSubmit={handleAskQuestion} className="max-w-3xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-700/50 transition-all hover:border-blue-500/30">
          <div className="flex items-center">
            <label className="cursor-pointer bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
              📄 Upload
              <input
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
              />
            </label>
            {/* Show file name */}
            {file && (
              <span className="text-sm text-gray-300 truncate max-w-xs">
                {file.name}
              </span>
            )}

            <textarea
              className="flex-grow bg-gray-700/50 border border-gray-600 rounded-lg p-3 outline-none resize-none h-12 text-white placeholder-gray-400 focus:border-blue-500/50 transition-colors"
              placeholder="Ask a question about your document..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAskQuestion(e);
                }
              }}
            />

            <button
              type="submit"
              className={`ml-3 px-4 py-3 rounded-lg font-medium transition-all
                    ${
                      loading
                        ? "bg-gray-700 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-md hover:shadow-blue-500/20"
                    }`}
              disabled={loading}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FixedInput;
