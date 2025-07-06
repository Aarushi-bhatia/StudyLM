import React from "react";
import { Link } from "react-router-dom";
import PDFWidget from "./PDFWidget";

const WelcomeMobile = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 min-h-screen flex flex-col items-center justify-center relative">
      {/* Background gradients */}
      <div className="absolute w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px] rounded-full bg-[radial-gradient(circle,_#E2745B_0%,_transparent_60%)] blur-2xl opacity-40 -top-10 left-5 sm:left-10 lg:left-20 z-0" />
      <div className="absolute w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px] rounded-full bg-[radial-gradient(circle,_#1E90FF_0%,_transparent_40%)] blur-2xl opacity-30 top-40 sm:top-60 lg:top-80 right-5 sm:right-10 lg:right-20 z-0" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
        <h1 className="text-5xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#FF8163] font-bold mb-1 sm:mb-2">
          Ask. Read.
        </h1>
        <h1 className="text-5xl sm:text-4xl lg:text-5xl xl:text-6xl text-white font-bold mb-4 sm:mb-6 lg:mb-8">
          Understand.
        </h1>
        <p className="text-[#D6C7BA] text-base sm:text-base lg:text-lg xl:text-xl mb-6 sm:mb-8 lg:mb-10 leading-relaxed px-2">
          Upload PDFs, ask questions, and get instant answers right before exams.
        </p>
        <Link
          to="/chat"
          className="bg-[#FF8163] text-white px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 rounded-full font-medium text-sm sm:text-base lg:text-lg shadow-md hover:opacity-90 transition-opacity duration-200 inline-block"
        >
          Go to Conversation
        </Link>
      </div>
      
      {/* PDF Widget */}
      <div className="mt-12 z-10 w-full flex justify-center">
  <div className="transform scale-75 sm:scale-90 origin-top">
    <PDFWidget />
  </div>
</div>

    </div>
  );
};

export default WelcomeMobile;