import Auth from "./auth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
const AdminPath = ({ children }) => {
    if (Auth.isUser && Auth.isAdmin) return children;
     const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/login" />;
    return children;
}

export default AdminPath;