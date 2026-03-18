import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useChatNavigation = (activeChatId) => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (activeChatId) {
      const targetPath = `/chat/${activeChatId}`;
      if (location.pathname !== targetPath) {
        navigate(targetPath, { replace: true });
      }
    } else {
      if (location.pathname !== "/chat") {
        navigate("/chat", { replace: true });
      }
    }
  }, [activeChatId]);
};
