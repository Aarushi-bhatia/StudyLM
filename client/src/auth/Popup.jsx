import { useEffect } from "react";

export default function AuthPopup() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const username = params.get("username");

    if (token && username && window.opener) {
      
      // Store auth data in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      
      // Close popup and redirect parent window
      window.close();
      
      // // If popup doesn't close, redirect this window to main app
      // setTimeout(() => {
      //   window.location.href = "/chat";
      // }, 100);
    }else {
      console.error("AuthPopup: missing token or no opener");
    }
  }, []);

  return <p>Login successful! Redirecting...</p>;
}