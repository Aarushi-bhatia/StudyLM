import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PDFChatHomepage from "./pages/Chat";
import Auth from "./auth/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "./context/AuthContext";

const DocumentQA = () => {
  return (
    <AuthProvider>
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
          {/* <Route path="/auth-popup" element={<AuthPopup />} /> */}
          <Route />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default DocumentQA;
