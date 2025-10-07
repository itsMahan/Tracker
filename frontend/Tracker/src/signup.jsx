import React, { useState, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "./themeContext";

export default function Signup({ onSignup }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { theme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/users/register", {
        username,
        email,
        password,
        password2,
      });
      setSuccess("Account created successfully! Please login.");
      setError("");
      setTimeout(() => {
        onSignup(); // switch back to login page
      }, 1500);
    } catch (err) {
      setError("Failed to register. Try a different username or email.");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold cursor-pointer">Sign Up</h2>

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
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <input
          type="password"
          placeholder="Confirm Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          className={`p-2 rounded border focus:outline-none ${
            theme === "light"
              ? "bg-white text-black placeholder-gray-500 border-gray-300"
              : "bg-gray-800 text-white placeholder-gray-400 border-gray-600"
          }`}
        />

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <button
          type="submit"
          className={`p-2 rounded ${
            theme === "light" ? "bg-blue-500 text-white" : "bg-blue-700 text-white"
          }`}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
