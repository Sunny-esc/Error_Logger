import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ import this
import Dashboard from "../pages/dashboard.jsx";
import { SiGoogle } from "react-icons/si";
import { Eye, EyeOff } from "lucide-react";

import google from "../assets/svgs/google.svg"

//import App from "../main.jsx"
import react1 from "../assets/svgs/logo/react1.svg";
//import LoginPopup from "./signup.jsx";
import Signbutton from "../comp/signbutton.jsx";
import Auth from "./auth";

import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const api = import.meta.env.VITE_API_URL;

import { Backdrop, Box, Modal, Fade } from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};
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

  //wakeup call
  const pingServer = async () => {
    try {
      await axios.get("https://error-logger.onrender.com/");
    } catch (err) {
      console.warn("Ping failed — probably sleeping");
    }
  };

  const loginWithRetry = async (payload, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await axios.post(
          "https://error-logger.onrender.com/api/auth/login",
          payload,
          { withCredentials: true }
        );
      } catch (err) {
        if (i === retries - 1) throw err;
        await new Promise((res) => setTimeout(res, 3000)); // 3s delay between retries
      }
    }
  };
  const loginWithGoogle = async () => {
    await pingServer();
    toast("Redirecting to Google...", { duration: 4000 });
    window.location.href = "https://error-logger.onrender.com/api/auth/google";
  };

  //on login
  const onlogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast("Waking up the server, please wait...", { duration: 5000 });
    await pingServer();

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
        const response = await loginWithRetry({
          email: user.email,
          password: user.password,
        });
        localStorage.setItem("token", response.data.token); // or use cookies if your backend sets them
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
    const [showPassword, setShowPassword] = useState(false);
  

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <div className="flex justify-center mb-6">
            <img src={react1} alt="Logo" className="h-6" />
          </div>

          <h2 className="text-xl text-black font-medium mb-6 text-center">
            {loading ? (
              <>
                <DotsLoader /> Loading..
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
              className="w-full text-gray-700 px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="relative mb-3">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
                className="w-full px-4 text-gray-700 py-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-gray-800 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          

            <p className="text-sm text-gray-800  md:text-lg mb-4">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signuppage")}
                className="text-blue-500 underline hover:text-blue-700"
              >
                Sign
              </button>
            </p>
            <button
              onClick={loginWithGoogle}
              className="flex items-center gap-3 px-5 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:shadow-md transition duration-200"
            >
              <div className="bg-white w-5 h-5 flex items-center justify-center">
               <img src={google} alt="" className="w-6" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Sign in with Google
              </span>
            </button>

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
        </Box>
      </Fade>
    </Modal>
  );
};
export default Login;
