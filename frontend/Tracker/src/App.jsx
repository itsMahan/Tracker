import { useState, useEffect } from "react";
import { fetchTodos, createTodo } from "./api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    setLoading(true);
    setError("");
    try {
      const res = await fetchTodos();
      setTodos(res.data || []);
    } catch (err) {
      setError("Failed to fetch todos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTodo() {
    if (!title.trim() || !description.trim() || adding) return;
    setAdding(true);
    setError("");

    try {
      await createTodo({ title, description }); // POST new todo
      setTitle("");
      setDescription("");
      setShowModal(false);
      loadTodos(); // Refresh list after POST
    } catch (err) {
      setError("Failed to add todo.");
      console.error(err);
    } finally {
      setAdding(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">My To-Do App</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Add Todo
      </button>

      {loading ? (
        <p>Loading todos...</p>
      ) : todos.length === 0 ? (
        <p>No todos yet. Add one above!</p>
      ) : (
        <ul className="space-y-2 w-96">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex flex-col bg-white p-2 rounded shadow text-black"
            >
              <span className="font-semibold">{todo.title}</span>
              <p className="text-sm">{todo.description}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-xl font-bold mb-4 text-black">Add New Todo</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded p-2 w-full mb-2 text-black"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded p-2 w-full mb-4 text-black"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTodo}
                disabled={adding}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
              >
                {adding ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
