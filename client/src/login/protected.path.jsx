import Auth from "./auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedPath = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("token");
      setHasToken(!!token);
      setChecking(false);
    }, 1000); // Wait 500ms before checking

    return () => clearTimeout(timer); // Clean up
  }, []);

  if (checking) return null; // or a loading spinner
  if (!hasToken) return <Navigate to="/loginpage" />;
  return children;
};

export default ProtectedPath;
