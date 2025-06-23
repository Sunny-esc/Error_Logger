import React, { useState } from "react";
import react1 from '../assets/svgs/logo/react1.svg';
//import Login from "./loginup.jsx";
import Loginbutton2 from "../comp/loginbutton2.jsx";
import Login from "./loginup.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";

const LoginPopup = ({ onClose }) => {
  const navigate=useNavigate();
  const [loading,setloading]=useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username:"",
  });

  const handleChange = (e) => {
    setUser(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSignup = async () => {
    try {
      const response =await axios.post("https://error-logger.onrender.com/api/auth/register", {
  email: user.email,
  password: user.password,
  username:user.username,
});
if (!user.email || !user.username || !user.password) {
  toast.error("All fields are required");
  return;
}

      console.log("Signup successful:", response.data);
      toast.success("signup successfull")
      navigate('/login');
      setInterval(onClose(),2000); // Close popup after signup
    } catch (error) {
      if(error.response.data===409){
        toast.error("already exist")
      }
      toast.error("failed to register")
      console.error("Error during signup:", error.response?.data || error.message);
    }
  };

 

  return (
    <div className="fixed inset-0 text-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm">
              <Toaster position="top-center" reverseOrder={false} />

        <div className="flex justify-center mb-6">
          <img src={react1} alt="Logo" className="h-6" />
        </div>

        <h2 className="text-xl font-medium mb-6 text-center "  >{loading?"Processing..":"Signup"}</h2>
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
                       <button onClick={()=>navigate('/login') }className="w-9  text-lg text-blue-400 underline hover:text-blue-600 ">Login</button> 

        </p>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={onSignup}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="text-blue-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
