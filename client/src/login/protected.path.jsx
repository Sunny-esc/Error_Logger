import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";

import Auth from "./auth";
import jwtDecode from "jwt-decode";

const ProtectedPath = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // optional: decode and update auth flags
      try {
        const decoded = jwtDecode(token);
        Auth.isUser = true;
        Auth.isAdmin = decoded?.isAdmin || false;
      } catch (e) {
        console.warn("Invalid token format");
      }

      // Clean up URL (remove ?token=...)
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  const storedToken = localStorage.getItem("token");
  if (!storedToken) return <Navigate to="/login" />;

  return children;
};

export default ProtectedPath;
