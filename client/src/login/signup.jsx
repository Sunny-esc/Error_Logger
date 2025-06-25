import React, { useState } from "react";
import react1 from "../assets/svgs/logo/react1.svg";
//import Login from "./loginup.jsx";
import Loginbutton2 from "../comp/loginbutton2.jsx";
import Login from "./loginup.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

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

const signupWithRetry = async (payload, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await axios.post(
        "https://error-logger.onrender.com/api/auth/register",
        payload,
        
      );
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((res) => setTimeout(res, 3000)); // 3s delay between retries
    }
  }
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

      console.log("Signup successful:", response.data);
      toast.success("signup successfull");
      navigate("/login");
      setInterval(onClose(), 2000); // Close popup after signup
    } catch (error) {
      if (error.response.data === 409) {
        toast.error("");
      }
  toast.error(error.response?.data?.error || "Signup failed! Please try again.");
      console.error(
        "Error during signup:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="fixed inset-0 text-black bg-opacity-40  backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm">
        <Toaster position="top-center" reverseOrder={false} />
        
        <div className="flex justify-center mb-6">
          <img src={react1} alt="Logo" className="h-6" />
        </div>

        <h2 className="text-xl font-medium mb-6 text-center ">
          {loading ? "Processing.." : "Signup"}
        </h2>
        <input
          type="username"
          name="username"
          placeholder="username"
          value={user.username}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <p className="text-sm md:text-lg mb-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="w-9  text-lg text-blue-400 underline hover:text-blue-600 "
          >
            Login
          </button>
        </p>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={onSignup}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
                          {loading ? <SpinnerLoader /> : "Submit"}

          </button>
          <button onClick={onClose} className="text-blue-500 hover:underline">
            Cancel
          </button>
            <button  type="button"
              onClick={handleHome}
              className="text-blue-500 hover:underline">
              Home
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
