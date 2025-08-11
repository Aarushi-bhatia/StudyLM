import React, { useState } from "react";
import { Link } from "react-router-dom";
import PDFWidget from "./PDFWidget";

const Welcome = () => {
  return (
    <div
      id="home"
      className="relative flex flex-col items-center justify-center h-full max-w-7xl mx-auto bg-background text-text"
    >
      {/* Welcome message */}
      <div className="flex gap-10 -ml-20 -mt-20">
        {/* Subheading */}
        <div className="hidden md:block md:relative md:text-left mt-16">
          <h1 className="text-7xl text-blackfont-bold mb-6">Ask. Read.</h1>
          <h1 className="text-7xl text-white textShine font-bold mb-6">
            Understand
          </h1>
          <p className="text-black/60 text-text text-2xl mb-18 max-w-2xl mt-10">
            Upload documents, get instant answers, and master your knowledge
            effortlessly.
          </p>
          <Link
            to="/chat"
            className="text-base bg-black dark:bg-white/80 text-white dark:text-black px-6 py-4 rounded-xl border/10 border-gray-300 font-medium hover:opacity-90 transition"
          >
            Go to Conversation
          </Link>
        </div>
        <div className="mt-8 hidden md:block">
          <PDFWidget />
        </div>
        {/* Mobile View */}
        <div className="md:hidden absolute inset-0 block text-center flex flex-col items-center justify-center  ">
          <h1 className="text-6xl text-black dark:text-white font-bold mb-6">Ask. Read.</h1>
          <h1 className="text-6xl text-white textShine font-bold mb-6">
            Understand
          </h1>
          <p className="text-black/60 text-text text-lg mb-14 max-w-md mt-4">
            Upload documents, get instant answers, and master your knowledge
            effortlessly.
          </p>
          <Link
            to="/chat"
            className="text-center bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-xl border/10 border-gray-300 font-medium hover:opacity-90 transition"
          >
            Go to Conversation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
