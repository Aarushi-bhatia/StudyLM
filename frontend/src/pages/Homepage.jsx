import React, { useState } from "react";
import FixedInput from "../components/FixedInput";
import Nav from "../components/Nav";
import Welcome from "../components/Welcome";
import Chatpage from "./Chatpage";

const Homepage = () => {
  const [answers, setAnswers] = useState([]);
  const [isDocumentUploaded, setIsDocumentUploaded] = useState(false);

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
