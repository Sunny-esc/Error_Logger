import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ import this
import Dashboard from "../pages/dashboard.jsx";
//import App from "../main.jsx"
import react1 from "../assets/svgs/logo/react1.svg";
//import LoginPopup from "./signup.jsx";
import Signbutton from "../comp/signbutton.jsx";
import Auth from "./auth";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const api = import.meta.env.VITE_API_URL;

//animation
const SpinnerLoader = ({ size = "w-8 h-8", color = "border-blue-500" }) => (
  <div
    className={`${size} border-4 border-gray-200 ${color} flex border-t-transparent rounded-full animate-spin justify-center items-center`}
  ></div>
);

// Dots Animation
const DotsLoader = () => (
  <div className="flex space-x-1">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: `${i * 0.2}s`, animationDuration: "0.6s" }}
      ></div>
    ))}
  </div>
);

const Login = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  // ✅ initialize it
  const location = useLocation();
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  const from = location.state?.from?.pathname || "/dashboard";

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [admin, setAdmin] = useState({
    emaila: "Sunny@123",
    passworda: "Sunny@123",
  });

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onlogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast(
      "The error logger is running on free deployment.there is chance your unable to login due to this so \n\n try agin after some time.",
      {
        duration: 7000,
      }
    );
    if (user.email === admin.emaila && user.password === admin.passworda) {
      const response = await axios.post(
        "https://error-logger.onrender.com/api/auth/admin",
        {
          email: user.email,
          password: user.password,
        },
        { withCredentials: true }
      );
      // If admin credentials are correct, redirect to admin dashboard
      // or use cookies if your backend sets them
      localStorage.setItem("token", response.data.data.token); // or use cookies if your backend sets them

      console.log("Login successful:", response.data);
      toast.success("Login successful! Welcome back Admin");
    
      Auth.isUser = true;
      Auth.isAdmin = true;
      setTimeout(() => navigate("/admin", { replace: true }), 2000);
      if (onClose) onClose(); // Close popup after login
    } else {
      try {
        const response = await axios.post(
          "https://error-logger.onrender.com/api/auth/login",
          {
            email: user.email,
            password: user.password,
          },
          { withCredentials: true }
        );
        localStorage.setItem("token", response.data.token); // or use cookies if your backend sets them
        console.log("Login successful:", response.data);
        toast.success("Login successful! ");

        Auth.isUser = true;
        setTimeout(
          () => navigate(from || "/dashboard", { replace: true }),
          2000
        );
        if (onClose) onClose(); // Close popup after login
      } catch (error) {
        console.error("Login error:", error);
        toast.error(error.response?.data?.error || "Login failed!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 text-black  bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm">
        <Toaster/>
        <div className="flex justify-center mb-6">
          <img src={react1} alt="Logo" className="h-6" />
        </div>

        <h2 className="text-xl font-medium mb-6 text-center ">
          {loading ? (
            <>
              {" "}
              <DotsLoader /> Loading..{" "}
            </>
          ) : (
            "Login"
          )}
        </h2>

        <form onSubmit={onlogin}>
          <input
            name="email"
            placeholder="Email or phone"
            value={user.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <p className="text-sm md:text-lg mb-4">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/sign")}
              className="w-9 text-lg text-blue-400 underline hover:text-blue-600 "
            >
              sign
            </button>
          </p>

          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? <SpinnerLoader /> : "Submit"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-blue-500 hover:underline"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleHome}
              className="text-blue-500 hover:underline"
            >
              Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
