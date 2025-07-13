import { NavLink } from "react-router-dom";
import about from "../assets/svgs/about.svg";
import docs from "../assets/svgs/docs.svg";
import product from "../assets/svgs/product.svg";
import home from './home.svg'
import logox from './svgs/logox.svg'
import React, { useEffect, useState } from "react";
import ChangeTheme from "../changetheme";
import Signbutton from "../comp/signbutton.jsx";
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Loginbutton2 from "../comp/loginbutton2";

const navItems = [
  { name: "Home", to: "/", icon:home },
  { name: "About", to: "/about", icon: about },

  { name: "Docs", to: "/docs", icon: docs },
  { name: "Projects", to: "/projects", icon: product },
];

function MobileDrawer({ renderLinks }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      className="p-4 "
    >
      <div className="flex flex-col gap-4 backdrop-blur-2xl">
        {renderLinks()}
        <div className="flex flex-wrap gap-4">
           <Signbutton closeDrawer={() => setOpen(false)} />
          <Loginbutton2 closeDrawer={() => setOpen(false)}/>

       

        <ChangeTheme closeDrawer={() => setOpen(false)} />
       <button className="bg-black text-white  w-fit p-2 text-lg"  onClick={toggleDrawer(false)}> <CloseIcon /> close</button>
        </div>
      </div>
    </Box>
  );

  return (
    <>
    <span className="bg-white rounded-xl">
    <IconButton onClick={toggleDrawer(true)} className="">
        <MenuIcon fontSize="inherit" />
      </IconButton>
    </span>
      

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} className="backdrop-blur-2xl">
        {DrawerContent}
      </Drawer>
    </>
  );
}

export default function Header() {
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setMobile(mediaQuery.matches);

    const handleSize = (e) => {
      setMobile(e.matches);
      setOpen(false);
    };

    mediaQuery.addEventListener("change", handleSize);
    return () => mediaQuery.removeEventListener("change", handleSize);
  }, []);

  const renderLinks = () => (
    <div className={`${mobile ? "flex-col gap-4" : "flex space-x-6"} flex`}>
      {navItems.map(({ name, to, icon }) => (
        <div className="flex items-center gap-1" key={name}>
          <img
            src={icon}
            alt={`${name} icon`}
            className="w-6 mix-blend-darken"
          />
          <NavLink
            to={to}
            className={({ isActive }) =>
              `hover:underline hover:text-blue-400 transition flex ${
                isActive ? "underline text-blue-400" : ""
              }`
            }
          >
            {name}
          </NavLink>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex  justify-between backdrop-blur-xl   items-center text-xl shadow-2xl my-1 rounded-2xl px-6 py-4 fixed top-0 w-full    z-50">
        <a href="/" className="absolute left-1/2 transform -translate-x-1/2 md:text-3xl font-bold flex gap-1">
            <img src={logox} alt="" className="w-9" />
            logger
          </a>
    {mobile ? (
  <MobileDrawer renderLinks={renderLinks} />
) :  (
        <div className="flex  items-center justify-between space-x-6 w-full ">
          <div>
          {renderLinks()}
          </div>
          
          <div className="flex gap-4 items-center justify-center">
            <div alt="change theme" className="flex items-center gap-1 ">
              <ChangeTheme />
            </div>
            <div className="">
              <Signbutton />
            </div>
         

            <div className="flex items-center gap-1 hover:underline">
              <Loginbutton2 />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
