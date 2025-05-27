import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Loading from "../components/Loading";
import Conversation from "../components/Conversation";
import FixedInput from "../components/FixedInput";
import Nav from "../components/Nav";
import Welcome from "../components/Welcome";
import Chatpage from "./Chatpage";

const Homepage = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");
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
    <div className="flex flex-col h-screen bg-[#2C2025] text-white">
      <Nav />
      <main className="flex-grow overflow-y-auto p-4">
        {!isDocumentUploaded && answers.length === 0 ? (
          <Welcome />
        ) : (
          <Chatpage />
        )}
      </main>

      {/* Fixed input box at bottom */}
      {isDocumentUploaded && <FixedInput />}
    </div>
  );
};

export default Homepage;
