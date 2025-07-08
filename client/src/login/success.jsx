// Example: src/pages/Success.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      // Optionally redirect to dashboard or home
      navigate("/dashboard");
    }
  }, [navigate]);

  return <div>Logging you in...</div>;
}