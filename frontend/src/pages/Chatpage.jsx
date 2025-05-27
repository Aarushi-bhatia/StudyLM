import React from "react";

const Chatpage = () => {
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
