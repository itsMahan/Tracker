import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "./themeContext";
import Login from "./login";
import Signup from "./signup"; // import signup page

export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [todos, setTodos] = useState([]);
  const [counters, setCounters] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCounterTitle, setNewCounterTitle] = useState("");
  const [newCounterDate, setNewCounterDate] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access_token")
  );

  const [openTodoId, setOpenTodoId] = useState(null);
  const [openCounterId, setOpenCounterId] = useState(null);

  const [editItem, setEditItem] = useState(null); // popup editing state
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editDate, setEditDate] = useState("");

  const [showSignup, setShowSignup] = useState(false); // signup toggle

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  };

  // Fetch Todos and Counters
  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/tasks/list", { headers });
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCounters = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/counters/list", { headers });
      setCounters(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchTodos();
      fetchCounters();
    }
  }, [isLoggedIn]);

  // Add Todo
  const handleAddTodo = async () => {
    if (!newTitle || !newDesc) return;
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/tasks/add",
        { title: newTitle, description: newDesc },
        { headers }
      );
      setTodos((prev) => [...prev, res.data]);
      setNewTitle("");
      setNewDesc("");
    } catch (err) {
      console.error(err);
    }
  };

  // Add Counter
  const handleAddCounter = async () => {
    if (!newCounterTitle || !newCounterDate) return;
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/counters/add",
        { title: newCounterTitle, start_date: newCounterDate },
        { headers }
      );
      setCounters((prev) => [...prev, res.data]);
      setNewCounterTitle("");
      setNewCounterDate("");
    } catch (err) {
      console.error(err);
    }
  };

  // Delete functions
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/delete/${id}`, { headers });
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCounter = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/counters/delete/${id}`, { headers });
      setCounters((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Open popup
  const openEditPopup = (item, type) => {
    setEditItem({ ...item, type });
    setEditTitle(item.title);
    setEditDesc(item.description || "");
    setEditDate(item.start_date || "");
  };

  // Save edit
  const saveEdit = async () => {
    if (!editItem) return;

    try {
      if (editItem.type === "todo") {
        const res = await axios.put(
          `http://127.0.0.1:8000/api/tasks/update/${editItem.id}`,
          { title: editTitle, description: editDesc },
          { headers }
        );
        setTodos((prev) => prev.map((t) => (t.id === editItem.id ? res.data : t)));
      } else if (editItem.type === "counter") {
        const res = await axios.put(
          `http://127.0.0.1:8000/api/counters/update/${editItem.id}`,
          { title: editTitle, start_date: editDate },
          { headers }
        );
        setCounters((prev) => prev.map((c) => (c.id === editItem.id ? res.data : c)));
      }
      setEditItem(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
  };

  // Show Login/Signup page if not logged in
  if (!isLoggedIn) {
    return showSignup ? (
      <Signup onSignup={() => setShowSignup(false)} />
    ) : (
      <Login
        onLogin={() => setIsLoggedIn(true)}
        onShowSignup={() => setShowSignup(true)}
      />
    );
  }

  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-300 ${
        theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
      }`}
    >
      {/* Top bar */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Todo & Counter App</h1>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
              className="toggle"
            />
            <span>{theme === "light" ? "Light" : "Dark"}</span>
          </label>
          <button
            onClick={handleLogout}
            className="ml-2 px-3 py-1 rounded bg-slate-500 text-white cursor-pointer"
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
          className="px-3 bg-slate-500 text-white rounded cursor-pointer"
        >
          Add Todo
        </button>
      </div>

      {/* Todo List */}
      <h2 className="text-xl font-bold mb-2">Todos</h2>
      {todos.map((t) => (
        <div
          key={t.id}
          className={`border rounded mb-2 transition-colors duration-300 ${
            theme === "light"
              ? "bg-white border-gray-300 text-black"
              : "bg-gray-800 border-gray-600 text-white"
          }`}
        >
          <div
            className="flex justify-between items-center p-2 cursor-pointer select-none"
            onClick={() => setOpenTodoId(openTodoId === t.id ? null : t.id)}
          >
            <span>{t.title}</span>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openEditPopup(t, "todo");
                }}
                className="px-2 py-1 bg-blue-500 rounded text-white cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTodo(t.id);
                }}
                className="px-2 py-1 bg-red-500 rounded text-white cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
          {openTodoId === t.id && (
            <div className="p-2 border-t border-gray-300 dark:border-gray-600 text-sm">
              {t.description}
            </div>
          )}
        </div>
      ))}

      {/* Add Counter */}
      <div className="flex gap-2 mt-6 mb-4">
        <input
          type="text"
          placeholder="Counter Title"
          value={newCounterTitle}
          onChange={(e) => setNewCounterTitle(e.target.value)}
          className={`flex-1 p-2 rounded border focus:outline-none ${
            theme === "light"
              ? "bg-white text-black placeholder-gray-500 border-gray-300"
              : "bg-gray-800 text-white placeholder-gray-400 border-gray-600"
          }`}
        />
        <input
          type="date"
          value={newCounterDate}
          onChange={(e) => setNewCounterDate(e.target.value)}
          className={`p-2 rounded border focus:outline-none ${
            theme === "light"
              ? "bg-white text-black placeholder-gray-500 border-gray-300"
              : "bg-gray-800 text-white placeholder-gray-400 border-gray-600"
          }`}
        />
        <button
          onClick={handleAddCounter}
          className="px-3 bg-slate-500 text-white rounded cursor-pointer"
        >
          Add Counter
        </button>
      </div>

      {/* Counter List */}
      <h2 className="text-xl font-bold mb-2">Counters</h2>
      {counters.map((c) => (
        <div
          key={c.id}
          className={`border rounded mb-2 transition-colors duration-300 ${
            theme === "light"
              ? "bg-white border-gray-300 text-black"
              : "bg-gray-800 border-gray-600 text-white"
          }`}
        >
          <div
            className="flex justify-between items-center p-2 cursor-pointer select-none"
            onClick={() => setOpenCounterId(openCounterId === c.id ? null : c.id)}
          >
            <span>{c.title}</span>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openEditPopup(c, "counter");
                }}
                className="px-2 py-1 bg-blue-500 rounded text-white cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCounter(c.id);
                }}
                className="px-2 py-1 bg-red-500 rounded text-white cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
          {openCounterId === c.id && (
            <div className="p-2 border-t border-gray-300 dark:border-gray-600 text-sm">
              Start Date: {c.start_date} | Days Passed:{" "}
              {Math.floor(
                (new Date() - new Date(c.start_date)) / (1000 * 60 * 60 * 24)
              )}
            </div>
          )}
        </div>
      ))}

      {/* Edit Modal */}
      {editItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setEditItem(null)}
        >
          <div
            className={`bg-white dark:bg-gray-800 p-4 rounded w-96 transition-colors duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-2">
              Edit {editItem.type === "todo" ? "Todo" : "Counter"}
            </h3>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
              className="w-full mb-2 p-2 rounded border focus:outline-none"
            />
            {editItem.type === "todo" && (
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="Description"
                className="w-full mb-2 p-2 rounded border focus:outline-none"
              />
            )}
            {editItem.type === "counter" && (
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="w-full mb-2 p-2 rounded border focus:outline-none"
              />
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditItem(null)}
                className="px-3 py-1 bg-gray-400 rounded text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-3 py-1 bg-blue-500 rounded text-white cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
