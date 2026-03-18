import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Auth from "./components/auth/Auth";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "./context/AuthContext";
import ChatPage from "./pages/ChatPage";

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
                <ChatPage />
              </ProtectedRoute>
            }
          />          <Route
            path="/chat/:chatId"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />          <Route path="/auth" element={<Auth />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default DocumentQA;
