import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangeTheme from "../../../changetheme";
import home from "../home.svg";
import info from '../info.svg';
import notes from '../notes.svg';
import account from '../account.svg';
import archive from '../archive.svg';
import Logoutbutton from "../../../comp/logout";
import { Link } from "react-router";

const Expand = ({ onNotesClick, onsaved,onprofile,onhomeClick }) => {
  const navigate = useNavigate();
  const ref = useRef();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.width = "70px";
    }
  }, []);

  const handleMouseEnter = () => {
    if (ref.current) ref.current.style.width = "140px";
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.width = "80px";
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden flex justify-between items-center px-4 py-2">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white bg-gray-700 px-3 py-2 rounded-md"
        >
          {mobileMenuOpen ? "Close Menu" : "Open Menu"}
        </button>
        <ChangeTheme />
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col  rounded-xl shadow-lg p-4 gap-4 mx-2">
          <button  className="flex items-center gap-2" onClick={onhomeClick}>
            <img src={home} alt="Home" className="w-6" />
            <span>Home</span>
          </button>
          <button onClick={onNotesClick} className="flex items-center gap-2">
            <img src={notes} alt="Notes" className="w-6" />
            <span>Notes</span>
          </button>
          <button onClick={onsaved} className="flex items-center gap-2">
            <img src={archive} alt="Saved" className="w-6" />
            <span>Saved</span>
          </button>
          <button className="flex items-center gap-2" onClick={onprofile}>
            <img src={account} alt="Account" className="w-6" />
            <span>Account</span>
          </button>
          <div className="flex items-center gap-2">
            <img src={info} alt="Info" className="w-6" />
            <span>Info</span>
          </div>
          <Logoutbutton />
        </div>
      )}

      {/* Desktop Sidebar */}
      <div
        ref={ref}
        className="hidden md:flex h-[90%] items-center my-6 mx-2 overflow-hidden flex-col  gap-2 rounded-xl shadow-md transition-all duration-300 ease-in-out"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Same existing buttons */}
        <div className="mt-5 flex p-3 shadow-2xl rounded-2xl group gap-1 transition-all justify-center items-center duration-300 ease-in-out hover:scale-120" onClick={onhomeClick}>
          <button >
            <img src={home} alt="" className="w-9" />
            <span className="hidden group-hover:block group-hover:ease-in-out">
              Home
            </span>
          </button>
        </div>

        <button className="mt-5 p-3 shadow-2xl rounded-2xl group flex gap-1 transition-all justify-center items-center duration-300 ease-in-out hover:scale-120" onClick={onNotesClick}>
          <img src={notes} alt="" className="w-9" />
          <span className="hidden group-hover:block group-hover:ease-in-out">Notes</span>
        </button>

        <button className="mt-5 flex p-3 shadow-2xl rounded-2xl group gap-1 transition-all justify-center items-center duration-300 ease-in-out hover:scale-120" onClick={onsaved}>
          <img src={archive} alt="" className="w-9" />
          <span className="hidden text-sm group-hover:block group-hover:ease-in-out">Saved</span>
        </button>

        <button className="mt-5 p-3 shadow-2xl rounded-2xl group gap-1 transition-all justify-center items-center duration-300 ease-in-out hover:scale-120" onClick={onprofile}>
          <img src={account} alt="" className="w-9" />
          <span className="hidden group-hover:block group-hover:ease-in-out">Account</span>
        </button>

        <div className="mt-5 shadow-2xl rounded-2xl group p-3 flex gap-1 justify-center items-center transition-all duration-300 ease-in hover:scale-120">
          <img src={info} alt="" className="w-9" />
          <span className="hidden text-sm group-hover:block group-hover:ease-in-out">Info</span>
        </div>

        <div><Logoutbutton /></div>
        <div><ChangeTheme /></div>
      </div>
    </>
  );
};

export default Expand;
