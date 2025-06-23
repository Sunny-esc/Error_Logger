import Auth from "./auth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
const ProtectedPath = ({ children }) => {
  
    // Check for token in localStorage (or check cookie)
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login" />;
    return children;
}
export default ProtectedPath;