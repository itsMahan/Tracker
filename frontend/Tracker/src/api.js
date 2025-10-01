import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/tasks/", // Base URL
});

// Automatically attach JWT token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// GET all todos
export const fetchTodos = () => api.get("list"); // GET /api/tasks/list

// POST new todo
export const createTodo = ({ title, description }) =>
  api.post("add", {
    title,
    description,
    completed: false, // <--- add this line
  });
