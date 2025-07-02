import React, { useState } from "react";
import Nav from "../components/Nav";
import Welcome from "../components/Welcome";
import { AuthProvider } from "../context/AuthContext";

const Homepage = () => {
  const [answers, setAnswers] = useState([]);
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#2C2025] text-white">
      <AuthProvider>
      <Nav />
      </AuthProvider>
      <main className="flex-grow p-4">
        <Welcome />
      </main>
    </div>
  );
};

export default Homepage;
