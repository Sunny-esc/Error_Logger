import { NavLink } from "react-router-dom";
import about from "../assets/svgs/about.svg";
import docs from "../assets/svgs/docs.svg";
import product from "../assets/svgs/product.svg";
import login from "../assets/svgs/login.svg";
import sign from "../assets/svgs/sign.svg";
import home from './home.svg'
import logox from './svgs/logox.svg'
import React, { useEffect, useState } from "react";
import ChangeTheme from "../changetheme";
import Signbutton from "../comp/signbutton.jsx";
import Loginbutton2 from "../comp/loginbutton2";

const navItems = [
  { name: "Home", to: "/", icon:home },
  { name: "About", to: "/about", icon: about },

  { name: "Docs", to: "/docs", icon: docs },
  { name: "Projects", to: "/projects", icon: product },
];

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
    <div className="flex justify-between   items-center text-xl shadow-2xl my-1 rounded-2xl px-6 py-4 fixed top-0 w-full    z-50">
      <a href="/" className="md:text-2xl font-bold flex gap-1">
      <img src={logox} alt=""  className="w-9"/>
        logger
      </a>

      {mobile ? (
        <>
          <button onClick={() => setOpen((prev) => !prev)} className="text-3xl">
            ☰
          </button>
          {open && (
            <div className="absolute top-full left-0 w-full bg-gray-300  text-black shadow-md p-4 z-40">
              {renderLinks()}
              <div className="flex flex-col gap-2 mt-4">
              <div className="">
              <Signbutton />
            </div>

            <div className="flex items-center gap-1 hover:underline hover:text-blue-400 transition">
              <Loginbutton2 />
            </div>
                <div>
                  <ChangeTheme />
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center space-x-6 ">
          {renderLinks()}
          <div className="flex gap-4">
            <div alt="change theme" className="flex items-center gap-1 ">
              <ChangeTheme />
            </div>
            <div className="">
           <Signbutton/>
            </div>

            <div className="flex items-center gap-1 hover:underline hover:text-blue-400 transition">
              <Loginbutton2 />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
