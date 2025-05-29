import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from "./pages/Homepage";
import Nav from "./components/Nav";
import Chatpage from "./pages/Chatpage";

const DocumentQA = () => {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/conversation" element={<Chatpage />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export default DocumentQA;
