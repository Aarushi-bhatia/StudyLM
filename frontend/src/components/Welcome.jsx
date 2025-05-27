import React, { useState } from "react";

const Welcome = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSummary(data.summary);
      setIsDocumentUploaded(true);

      // Add the summary as the first message in the conversation
      setAnswers([
        {
          type: "summary",
          content: data.summary,
        },
      ]);
    } catch (error) {
      setError("An error occurred while uploading the file.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-5xl mx-auto">
      {/* Welcome message */}
      <div className="absolute w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,_#E2745B_0%,_transparent_80%)] blur-3xl opacity-50 -top-5 left-120 z-0"></div>
      <div className="absolute w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,_#1E90FF_0%,_transparent_35%)] blur-3xl opacity-50 top-130 left-170 z-0"></div>

      <h1 className="text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
       
      </h1>

      {/* Subheading */}
      <p className="text-gray-300 text-2xl mb-12 text-center max-w-2xl">
        Upload, summarize, and ask questions about your{" "}
        <span className="text-white font-medium">pdf documents</span> using our
        advanced AI technology.
      </p>

      {!isDocumentUploaded && (
        <div className="flex items-center">
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            className="hidden"
            accept="application/pdf"
          />
          <label
            htmlFor="file-upload"
            className="flex items-center mr-3 px-3 py-2 bg-gray-700/70 hover:bg-gray-700 cursor-pointer rounded-lg border border-gray-600 transition-colors"
          >
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
            {fileName ? fileName : "Select PDF"}
          </label>

          <button
            onClick={handleUpload}
            className={`px-4 py-2 mr-2 rounded-lg font-medium cursor-pointer text-sm transition-all
                ${
                  loading
                    ? "bg-[#EA775C] cursor-not-allowed"
                    : "bg-[#EA775C] hover:from-blue-500 hover:to-blue-400 shadow-md hover:shadow-blue-500/20"
                }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-4 w-4 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </div>
            ) : (
              "Upload & Summarize"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Welcome;
