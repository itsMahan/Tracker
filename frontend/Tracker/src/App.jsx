import { useState, useEffect } from "react";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      const res = await fetchTodos();
      setTodos(res.data);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    }
  }

  async function addTodo() {
    if (input.trim() === "") return;
    try {
      await createTodo(input);
      setInput("");
      loadTodos();
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  }

  async function toggleTodo(id, done) {
    try {
      await updateTodo(id, { done: !done });
      loadTodos();
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  }

  async function removeTodo(id) {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">My To-Do App</h1>

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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2 w-72">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-white p-2 rounded shadow"
          >
            <span
              onClick={() => toggleTodo(todo.id, todo.done)}
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
    </div>
  );
}
