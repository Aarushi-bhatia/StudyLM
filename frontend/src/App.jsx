import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-4">AI Document Q&A</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-2" />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload & Summarize
      </button>
      {summary && (
        <div className="mt-4 p-3 bg-white shadow-md rounded">
          <h2 className="font-bold">Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;
