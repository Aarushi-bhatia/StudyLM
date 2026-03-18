import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const useAuthRedirect = () => {
    const navigate = useNavigate();
    const {login} = useAuth();
useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      try {
        const tokenPayload = JSON.parse(atob(urlToken.split(".")[1]));
        const userData = {
          username: tokenPayload.name || tokenPayload.email,
          token: urlToken,
        };
        login(userData);
        window.history.replaceState({}, document.title, "/chat");
        return;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    const existingToken = localStorage.getItem("token");
    if (!existingToken) {
      setTimeout(() => Navigate("/auth"), 2000);
    }
  }, [navigate, login]);
}