import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PDFChatHomepage from "./pages/Chat";
import Auth from "./auth/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { Analytics } from "@vercel/analytics/next"

const DocumentQA = () => {
  return (
    <BrowserRouter>
    <Analytics />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              {" "}
              <PDFChatHomepage />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export default DocumentQA;
