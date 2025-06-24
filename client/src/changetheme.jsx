import React, { useState } from "react";
import { useEffect } from "react";
export default function ChangeTheme() {
  const [theme, setTheme] = useState(() => {
    // Load from localStorage on first render
    return localStorage.getItem("theme") || "light";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
        localStorage.setItem("theme", newTheme); // persist change

  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <button
    
      onClick={toggleTheme}
      className=" p-2 rounded-full shadow-md transition-colors duration-300  "
    >
      {theme === "light" ? "🌞 Light" : "🌜 Dark"} 
    </button>
  );
}