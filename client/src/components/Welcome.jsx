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
        <div className="relative text-left mt-16">
          <h1 className="text-7xl text-blackfont-bold mb-6">Ask. Read.</h1>
          <h1 className="text-7xl text-white textShine font-bold mb-6">
            Understand
          </h1>
          <div className="w-[40rem] relative">
            {/* Gradients */}
            {/* <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
  */}
            {/* Core component */}
            {/* <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        /> */}

            {/* Radial Gradient to prevent sharp edges */}
            {/* <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div> */}
          </div>
          <p className="text-black/60 text-text text-2xl mb-20 max-w-2xl mt-10">
            Upload documents, get instant answers, and master your knowledge
            effortlessly.
          </p>
          <Link
            to="/chat"
            className="text-base bg-black text-white px-6 py-4 rounded-xl border/10 border-gray-300 font-medium hover:opacity-90 transition"
          >
            Go to Conversation
          </Link>
        </div>
        <div className="mt-8">
          <PDFWidget />
        </div>
      </div>
    </div>
  );
};

export default Welcome;