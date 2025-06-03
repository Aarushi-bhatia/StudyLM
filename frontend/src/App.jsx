import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";
import PDFChatHomepage from "./pages/Chat";

const DocumentQA = () => {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/conversation" element={<Chatpage />} />
        <Route path="/chat" element={<PDFChatHomepage />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export default DocumentQA;
