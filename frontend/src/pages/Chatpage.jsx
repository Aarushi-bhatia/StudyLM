import React, { useState } from "react";
import Loading from "../components/Loading";
import Conversation from "../components/Conversation";
import FixedInput from "../components/FixedInput";
import Nav from "../components/Nav";

const Chatpage = () => {
  // const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([
    { type: "question", content: "What is React?" },
    { type: "answer", content: "React is a JavaScript library for building user interfaces." },
    { type: "error", content: "Failed to fetch answer." }
  ]);
  
  return (
    <div className="flex flex-col bg-[#2C2025] min-h-screen">
      <div className="flex-grow space-y-6 pb-4 ">
      <Nav />
      {answers.map((item, index) => (
        <Conversation key={index} item={item} index={index} />
      ))}
      {loading && <Loading />}
      </div>
      <FixedInput
        answers={answers}
        setAnswers={setAnswers}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default Chatpage;
