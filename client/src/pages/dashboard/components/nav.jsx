import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangeTheme from "../../../changetheme";
import home from "../home.svg";
import info from '../info.svg';
import notes from '../notes.svg';
import account from '../account.svg';
import archive from '../archive.svg';
import Logoutbutton from "../../../comp/logout";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Box, Button } from '@mui/material';
import cloud from '../../../assets/svgs/cloud.svg'


const Expand = ({ onaiClick,onNotesClick, onsaved,onprofile,onhomeClick,oninfo }) => {
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
      {/* Desktop Sidebar */}
      <div
        ref={ref}
        className="hidden md:flex h-[100%] items-center my-1 mx-2 overflow-hidden flex-col  gap-2 rounded-xl shadow-md transition-all duration-300 ease-in-out"
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
         <button className="mt-5 p-3 shadow-2xl rounded-2xl group flex gap-1 transition-all justify-center items-center duration-300 ease-in-out hover:scale-120" onClick={onaiClick}>
          <img src={cloud} alt="" className="w-9" />
          <span className="hidden group-hover:block group-hover:ease-in-out">Ai</span>
        </button>

        <button className="mt-5 p-3 shadow-2xl rounded-2xl group flex gap-1 transition-all justify-center items-center duration-300 ease-in-out hover:scale-120" onClick={onNotesClick}>
          <img src={notes} alt="" className="w-9" />
          <span className="hidden group-hover:block group-hover:ease-in-out">Code</span>
        </button>

        <button className="mt-5 flex p-3 shadow-2xl rounded-2xl group gap-1 transition-all justify-center items-center duration-300 ease-in-out hover:scale-120" onClick={onsaved}>
          <img src={archive} alt="" className="w-9" />
          <span className="hidden text-sm group-hover:block group-hover:ease-in-out">Saved</span>
        </button>

        <button className="mt-5 p-3 shadow-2xl rounded-2xl group gap-1 transition-all justify-center items-center duration-300 ease-in-out hover:scale-120" onClick={onprofile}>
          <img src={account} alt="" className="w-9" />
          <span className="hidden group-hover:block group-hover:ease-in-out">Account</span>
        </button>

        <button className="mt-5 shadow-2xl rounded-2xl group p-3 flex gap-1 justify-center items-center transition-all duration-300 ease-in hover:scale-120" onClick={oninfo}>
          <img src={info} alt="" className="w-9" />
          <span className="hidden text-sm group-hover:block group-hover:ease-in-out">Info</span>
        </button>

        <div className="mt-4 mb-5"><Logoutbutton /></div>
        <div><ChangeTheme /></div>
      </div>
    </>
  );
};

export default Expand;
