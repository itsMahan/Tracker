import React, { useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "./themeContext";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { theme, toggleTheme } = useContext(ThemeContext); // ✅ access theme + toggle

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });
      localStorage.setItem("access_token", res.data.access);
      localStorage.setItem("refresh_token", res.data.refresh);
      onLogin();
      setError("");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      {/* Theme toggle at top */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {/* Light icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>

        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
          className="toggle"
        />

        {/* Dark icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold">Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`p-2 rounded border focus:outline-none ${
            theme === "light"
              ? "bg-white text-black placeholder-gray-500 border-gray-300"
              : "bg-gray-800 text-white placeholder-gray-400 border-gray-600"
          }`}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`p-2 rounded border focus:outline-none ${
            theme === "light"
              ? "bg-white text-black placeholder-gray-500 border-gray-300"
              : "bg-gray-800 text-white placeholder-gray-400 border-gray-600"
          }`}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className={`p-2 rounded ${
            theme === "light" ? "bg-blue-500 text-white" : "bg-blue-700 text-white"
          }`}
        >
          Login
        </button>
      </form>
    </div>
  );
}
