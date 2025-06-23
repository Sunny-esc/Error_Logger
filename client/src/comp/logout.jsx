 import React, { useState } from "react";
  import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
  import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
  import logout from "../assets/svgs/logout.svg";

export default function Logoutbutton() {
 

  // ✅ Initialize the component 
 const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ initialize it
  const onloginout = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      console.log("Logout successful:", response.data);
      toast.success("Logout successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.error || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className=" rounded-2xl  group p-3 items-center shadow-2xl  flex justify-center transition-all duration-300 ease-in hover:scale-120"
        onClick={onloginout}
      >
        <img src={logout} alt="" className="w-9" />
        <span className="hidden  group-hover:block">
          {loading ? "processing" : "Logout"}
        </span>
      </button>
    </div>
  );
}