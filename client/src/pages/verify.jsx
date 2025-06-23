import {toast,Toaster} from 'react-hot-toast'
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyPage = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.get(`https://error-logger.onrender.com/api/auth/verify/${token}`);
        setStatus("Email verified successfully! Redirecting to login...");
        toast.success("verfied");
        setTimeout(() => {
          navigate("/login");
        }, 3000); // wait 3 seconds before redirect
      } catch (err) {
        setStatus("Verification failed: Invalid or expired token.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="text-center space-y-4">
            <Toaster position="top-right" reverseOrder={false} />
      
        <h1 className="text-2xl md:text-3xl font-bold">Email Verification</h1>
        <p className="text-lg">{status}</p>
      </div>
    </div>
  );
};

export default VerifyPage;
