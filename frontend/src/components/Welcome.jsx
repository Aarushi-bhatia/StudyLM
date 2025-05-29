import React, { useState } from "react";
import { Link } from "react-router-dom";

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
      <Link
          to="/conversation"
          className="text-sm px-4 py-2 bg-[#4A3F55] hover:bg-[#5e4d68] text-white rounded-lg transition-all"
        >
          Go to Conversation
        </Link>
    </div>
  );
};

export default Welcome;
