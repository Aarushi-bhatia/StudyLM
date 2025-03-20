import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSummary(response.data.summary);
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
    formData.append("question", question); // Add the question to the FormData
  
    try {
      const response = await axios.post("http://localhost:5000/ask", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAnswer(response.data.answer);
    } catch (error) {
      setError("An error occurred while processing your question.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-4">AI Document Q&A</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 w-full p-2 border rounded"
          accept="application/pdf"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? "Processing..." : "Upload & Summarize"}
        </button>
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {summary && (
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <h2 className="font-bold">Summary:</h2>
            <p>{summary}</p>
          </div>
        )}
        <div className="mt-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about the document"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleAskQuestion}
            className="bg-green-500 text-white px-4 py-2 rounded w-full mt-2 hover:bg-green-600 disabled:bg-green-300"
            disabled={loading}
          >
            {loading ? "Processing..." : "Ask Question"}
          </button>
        </div>
        {answer && (
          <div className="mt-4 p-3 bg-gray-50 rounded">
            <h2 className="font-bold">Answer:</h2>
            <p>{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;