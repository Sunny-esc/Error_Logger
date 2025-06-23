import React, { useState } from "react";
import { useEffect } from "react";
export default function ChangeTheme() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
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