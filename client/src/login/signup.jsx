import React, { useState, useEffect } from "react";
import react1 from "../assets/svgs/logo/react1.svg";

import axios from "axios";
import toast from "react-hot-toast";
import { SiGoogle } from "react-icons/si";
import { Backdrop, Box, Modal, Fade, Button, Typography } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";

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

//animations
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
const SpinnerLoader = ({ size = "w-8 h-8", color = "border-blue-500" }) => (
  <div
    className={`${size} border-4 border-gray-200 ${color} flex border-t-transparent rounded-full animate-spin justify-center items-center`}
  ></div>
);

const LoginPopup = ({ onClose }) => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setloading] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
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
  useEffect(() => {
    pingServer();
  }, []);
  const signupWithRetry = async (payload, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await axios.post(
          "https://error-logger.onrender.com/api/auth/register",
          payload
        );
      } catch (err) {
        if (i === retries - 1) throw err;
        await new Promise((res) => setTimeout(res, 3000)); // 3s delay between retries
      }
    }
  };
  const signupWithgoogleRetry = async (payload, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await axios.post(
          "https://error-logger.onrender.com/api/auth/google",
          payload
        );
      } catch (err) {
        if (i === retries - 1) throw err;
        await new Promise((res) => setTimeout(res, 3000)); // 3s delay between retries
      }
    }
  };
  const loginWithGoogle = async () => {
    await pingServer();
    toast("Waking up server, please wait...", { duration: 5000 });
    window.location.href = "https://error-logger.onrender.com/api/auth/google";
  };

  const onSignup = async () => {
    if (!user.email || !user.username || !user.password) {
      toast.error("All fields are required");
      return;
    }

    setloading(true);
    toast("Waking up server, please wait...", { duration: 5000 });

    await pingServer();
    try {
      const response = await signupWithRetry({
        email: user.email,
        password: user.password,
        username: user.username,
      });

      if (!user.email || !user.username || !user.password) {
        toast.error("All fields are required");
        return;
      }

      if (user.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      console.log("Signup successful:", response.data);
      toast.success("signup successfull");
      navigate("/login");
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      if (error.response.data === 409) {
        toast.error("");
      }
      toast.error(
        error.response?.data?.error || "Signup failed! Please try again."
      );
      console.error(
        "Error during signup:",
        error.response?.data || error.message
      );
    }
  };

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
          <div className="flex justify-center mb-4">
            <img src={react1} alt="Logo" className="h-6" />
          </div>

          <h2 className="text-xl text-black font-medium mb-4 text-center">
            {loading ? "Processing.." : "Signup"}
          </h2>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-700 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-3 text-gray-700 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          <p className="text-sm text-gray-800  md:text-lg mb-3">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 underline hover:text-blue-700"
            >
              Login
            </button>
          </p>

          <button
            onClick={loginWithGoogle}
            className="flex items-center gap-3 px-5 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:shadow-md transition duration-200"
          >
            <div className="bg-white w-5 h-5 flex items-center justify-center">
              <SiGoogle size={20} className="text-[#4285F4]" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Sign in with Google
            </span>
          </button>

          <div className="flex justify-between items-center mt-5">
            <button
              onClick={onSignup}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              {loading ? <SpinnerLoader /> : "Submit"}
            </button>
            <button onClick={onClose} className="text-blue-500 hover:underline">
              Cancel
            </button>
            <button
              onClick={handleHome}
              className="text-blue-500 hover:underline"
            >
              Home
            </button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default LoginPopup;
