import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PDFChatHomepage from "./pages/Chat";
import Nav from "./components/Nav";
import { AuthProvider } from "./context/AuthContext";
import Auth from "./auth/Auth";
import ProtectedRoute from "./components/ProtectedRoute";

const DocumentQA = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Nav />
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
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default DocumentQA;