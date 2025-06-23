import React, { useState } from "react";
import LoginPopup from "../login/signup.jsx"; // Adjust the import path as necessary
import sign from "../assets/svgs/sign.svg";
const Signbutton = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <button
        className="flex  items-center gap-1 hover:underline    px-4 sm:px-6 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        onClick={() => setShowPopup(true)}
      >
        <img src={sign} alt="signup" className="w-6" />
        Get Started
      </button>

      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}
    </>
  );
};
export default Signbutton;
