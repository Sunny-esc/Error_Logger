import { Navigate } from "react-router-dom";

const ProtectedPath = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedPath;
