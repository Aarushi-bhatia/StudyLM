import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PDFChatHomepage from "./pages/Chat";
import Auth from "./auth/Auth";

const DocumentQA = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chat" element={<PDFChatHomepage />} />
        <Route path="/auth" element={<Auth />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export default DocumentQA;
