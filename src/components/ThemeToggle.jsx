import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const storedTheme = Cookies.get("theme") || localStorage.getItem("theme") || "dark";
  const [isDarkMode, setIsDarkMode] = useState(storedTheme === "dark");

  useEffect(() => {
    const newTheme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    Cookies.set("theme", newTheme, { expires: 7 });
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);

  };

  return (
    <label className="swap swap-rotate p-2 cursor-pointer hover:scale-110 transition-all duration-200 hover:text-red-500">
      <input type="checkbox" checked={!isDarkMode} onChange={toggleTheme} />
      
      {/* Sun icon (light mode) */}
      <Sun className="swap-on stroke-2 lg:stroke-1"/>
      
      {/* Moon icon (dark mode) */}
      <Moon className="swap-off stroke-2 lg:stroke-1"/>
    </label>
   
  );
};

export default ThemeToggle;
