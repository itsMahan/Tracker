import { useState, useEffect } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    setLoading(true);
    setError("");
    try {
      const res = await fetchTodos();
      console.log("Todos fetched:", res.data); // Debug
      setTodos(res.data);
    } catch (err) {
      setError("Failed to load todos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function addTodo() {
    if (!input.trim() || adding) return;

    setAdding(true);
    setError("");
    const newTodo = { id: Date.now(), text: input, done: false };

    // Optimistic UI
    setTodos([...todos, newTodo]);
    setInput("");

    try {
      const res = await createTodo(input);
      console.log("Todo added:", res.data); // Debug
      loadTodos(); // Reload from backend to get actual ID
    } catch (err) {
      setError("Failed to add todo.");
      console.error(err);
      setTodos(todos); // Revert if failed
    } finally {
      setAdding(false);
    }
  }

  async function toggleTodo(id) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t))); // Optimistic UI

    try {
      await updateTodo(id, { done: !todo.done });
    } catch (err) {
      setError("Failed to update todo.");
      console.error(err);
      setTodos(todos); // Revert if failed
    }
  }

  async function removeTodo(id) {
    const oldTodos = [...todos];
    setTodos(todos.filter((t) => t.id !== id)); // Optimistic UI

    try {
      await deleteTodo(id);
    } catch (err) {
      setError("Failed to delete todo.");
      console.error(err);
      setTodos(oldTodos); // Revert if failed
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">My To-Do App</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="flex gap-2 mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          placeholder="Enter a task..."
          className="border rounded p-2 w-64"
        />
        <button
          onClick={addTodo}
          disabled={adding}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {adding ? "Adding..." : "Add"}
        </button>
      </div>

      {loading ? (
        <p>Loading todos...</p>
      ) : (
        <ul className="space-y-2 w-72">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-white p-2 rounded shadow"
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className={`cursor-pointer ${
                  todo.done ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => removeTodo(todo.id)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
