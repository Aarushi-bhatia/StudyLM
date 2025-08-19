import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check localStorage first
  const localStorageToken = localStorage.getItem("token");
  
  // Check URL parameters for token (from Google OAuth callback)
  const urlParams = new URLSearchParams(window.location.search);
  const urlToken = urlParams.get("token");
  
  // Allow access if token exists in either localStorage or URL
  if (!localStorageToken && !urlToken) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;