import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const TypewriterMarkdown = ({ content, speed = 10, onType }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < content.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + content[index]);
        setIndex((prev) => prev + 1);
        if (onType) onType();
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, content, speed, onType]);

  return <ReactMarkdown>{displayedText}</ReactMarkdown>;
};

export default TypewriterMarkdown;