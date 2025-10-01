import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "./themeContext";
import Login from "./login";

export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/tasks/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchTodos();
  }, [isLoggedIn]);

  // Add new todo
  const handleAddTodo = async () => {
    if (!newTitle || !newDesc) return;
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/tasks/add",
        { title: newTitle, description: newDesc },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setTodos((prev) => [...prev, res.data]);
      setNewTitle("");
      setNewDesc("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
  };

  // Show login page if not logged in
  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      {/* Top bar */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Todo App</h1>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
              className="toggle"
            />
            <span>{theme === "light" ? "Light" : "Dark"}</span>
          </label>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="ml-2 px-3 py-1 rounded bg-slate-500 text-white"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Add Todo */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className={`flex-1 p-2 rounded border focus:outline-none ${
            theme === "light"
              ? "bg-white text-black placeholder-gray-500 border-gray-300"
              : "bg-gray-800 text-white placeholder-gray-400 border-gray-600"
          }`}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          className={`flex-1 p-2 rounded border focus:outline-none ${
            theme === "light"
              ? "bg-white text-black placeholder-gray-500 border-gray-300"
              : "bg-gray-800 text-white placeholder-gray-400 border-gray-600"
          }`}
        />
        <button
          onClick={handleAddTodo}
          className="px-3 bg-slate-500 text-white rounded"
        >
          Add Todo
        </button>
      </div>

      {/* Todo List as Accordion */}
      <div>
        <h2 className="text-xl font-bold mb-2">Todo List</h2>
        {todos.map((t, index) => (
          <div
            key={t.id}
            className={`collapse mb-2 border transition-colors duration-300 ${
              theme === "light"
                ? "bg-base-100 border-base-300 text-black"
                : "bg-gray-800 border-gray-600 text-white"
            }`}
          >
            <input
              type="radio"
              name="my-accordion-1"
              defaultChecked={index === 0}
            />
            <div className="collapse-title font-semibold">{t.title}</div>
            <div className="collapse-content text-sm">{t.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
