import React, { createContext, useState, useEffect } from "react";

// 1️⃣ Create the context
export const ThemeContext = createContext();

// 2️⃣ ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = "";
    if (theme === "light") {
      document.body.classList.add("bg-white", "text-black");
    } else {
      document.body.classList.add("bg-gray-900", "text-white");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
