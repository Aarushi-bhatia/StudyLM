import React, { useState } from 'react';

const DocumentQA = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

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
      const response = await fetch("http://localhost:5000/upload", {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      setError("An error occurred while uploading the file.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!file) {
      setError("Please upload a document first.");
      return;
    }
    
    if (!question) {
      setError("Please enter a question.");
      return;
    }
    
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("document", file);
    formData.append("question", question);
    
    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      setError("An error occurred while processing your question.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Animation classes for elements
  const fadeIn = "transition-opacity duration-500 ease-in-out";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header with gradient underline */}
      <header className="p-4 flex justify-between items-center border-b border-blue-500/30">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">DocWise</div>
        
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        {/* Announcement banner with glow effect */}
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-full px-6 py-3 flex items-center mb-16 shadow-lg shadow-blue-500/10 border border-blue-500/20">
          <div className="mr-3 text-blue-400">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <rect width="20" height="20" rx="4" fill="currentColor" />
            </svg>
          </div>
          <span className="font-medium">New! Introducing AI Document Q&A</span>
        </div>

        {/* Main heading with gradient */}
        <h1 className="text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
          What do you want to ask?
        </h1>
        
        {/* Subheading */}
        <p className="text-gray-300 text-lg mb-12 text-center max-w-2xl">
          Upload, summarize, and ask questions about your <span className="text-white font-medium">pdf documents</span> using our advanced AI technology.
        </p>

        {/* File upload section with improved styling */}
        <div className="w-full max-w-3xl mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 transition-all hover:border-blue-500/30">
            <p className="text-lg font-medium mb-4 text-blue-300">Upload your document</p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full">
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="application/pdf"
                />
                <label 
                  htmlFor="file-upload" 
                  className="flex items-center justify-center w-full px-4 py-3 bg-gray-700/70 hover:bg-gray-700 cursor-pointer rounded-lg border border-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  {fileName ? fileName : "Select PDF file"}
                </label>
              </div>
              
              <button
                onClick={handleUpload}
                className={`px-6 py-3 rounded-lg font-medium transition-all w-full sm:w-auto
                  ${loading 
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-md hover:shadow-blue-500/20'}`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : "Upload & Summarize"}
              </button>
            </div>
          </div>
        </div>

        {/* Question input box with enhanced design */}
        <div className="w-full max-w-3xl mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 transition-all hover:border-blue-500/30">
            <textarea
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-4 outline-none resize-none h-24 text-white placeholder-gray-400 focus:border-blue-500/50 transition-colors"
              placeholder="Ask a question about your document..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="flex mt-4 items-center">
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors rounded-full hover:bg-gray-700/50">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-400 transition-colors rounded-full hover:bg-gray-700/50">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
              
              {/* Ask button */}
              <button 
                onClick={handleAskQuestion}
                className={`ml-auto px-6 py-3 rounded-lg font-medium transition-all
                  ${loading 
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-md hover:shadow-blue-500/20'}`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : "Ask Question"}
              </button>
            </div>
          </div>
        </div>

        {/* Error message with improved styling */}
        {error && (
          <div className={`w-full max-w-3xl mb-6 p-4 bg-red-900/30 backdrop-blur-sm border border-red-500/50 rounded-lg text-red-200 shadow-lg ${fadeIn}`}>
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Summary display with card design */}
        {summary && (
          <div className={`w-full max-w-3xl mb-6 ${fadeIn}`}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 hover:border-blue-500/30 transition-all">
              <h2 className="font-bold text-lg mb-3 text-blue-300 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Document Summary
              </h2>
              <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/50">
                <p className="text-gray-200 leading-relaxed">{summary}</p>
              </div>
            </div>
          </div>
        )}

        {/* Answer display with card design */}
        {answer && (
          <div className={`w-full max-w-3xl mb-6 ${fadeIn}`}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 hover:border-blue-500/30 transition-all">
              <h2 className="font-bold text-lg mb-3 text-blue-300 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Answer
              </h2>
              <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-600/50">
                <p className="text-gray-200 leading-relaxed">{answer}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer area with subtle gradient */}
      <footer className="p-6 border-t border-gray-800">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full"></div>
          <span className="ml-3 text-gray-400 text-sm">© 2025 DocWise. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default DocumentQA;