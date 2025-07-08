import { useState, useEffect } from "react";
import { Link } from "react-router";
import logox from './svgs/logox.svg'

export default function Footer() {
  const [current, setDate] = useState(getDate());
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(getDate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

 
  return (
    <footer className="bg-slate-900 text-white py-8 mt-20 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between  ">
        <div className="mb-6 md:mb-0 space-y-4 ">
          <a href="/" className="md:text-2xl font-bold flex gap-1">
            <img src={logox} alt="" className="w-9" />
            logger
          </a>
          <p className="text-sm text-gray-400 ">Building something great.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-6 md:mb-0">
          <div className="flex flex-col">
            <Link to="/about" className="hover:text-blue-400">
              About
            </Link>
            <Link to="/docs" className="hover:text-blue-400">
              Docs
            </Link>
            <Link to="/projects" className="hover:text-blue-400">
              Project
            </Link>
          </div>
          <div className="md:flex flex-col hidden ">
            <Link to="/notfound" className="hover:text-blue-400">
              Contact
            </Link>
            <Link to="/notfound" className="hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link to="/notfound" className="hover:text-blue-400">
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-6  ">
          {current}
          <div className="flex gap-3 mt-2 text-gray-400">
            <a href="https://www.instagram.com/s19_ctrl/" className="hover:text-blue-400">
              insta
            </a>
            <a href="https://github.com/Sunny-esc" className="hover:text-blue-400">
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} Sunny. All rights reserved.
      </div>
    </footer>
  );
}
function getDate() {
  const today = new Date();
  const pad = (n) => n.toString().padStart(2, '0');

  const hours = pad(today.getHours());
  const minutes = pad(today.getMinutes());
  const seconds = pad(today.getSeconds());
  const day = pad(today.getDate());
  const year = today.getFullYear();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[today.getMonth()];

  return `${hours}:${minutes}:${seconds} | ${day} ${month} ${year}`;
}
