import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/tasks/", // Base URL
});

// GET all todos
export const fetchTodos = () => api.get("list"); // GET /api/tasks/list

// POST new todo
export const createTodo = ({ title, description }) =>
  api.post("add", { title, description }); // POST /api/tasks/add
