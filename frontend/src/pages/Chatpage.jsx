import React, { useState } from "react";
import Loading from "../components/Loading";
import Conversation from "../components/Conversation";

const Chatpage = () => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6 pb-4">
      {answers.map((item, index) => (
        <Conversation />
      ))}
      {loading && <Loading />}
    </div>
  );
};

export default Chatpage;
