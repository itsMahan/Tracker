import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ------------------- Todos -------------------
export const fetchTodos = () => api.get("tasks/list");
export const createTodo = ({ title, description }) =>
  api.post("tasks/add", { title, description });
export const updateTodo = (id, { title, description }) =>
  api.put(`tasks/update/${id}`, { title, description });
export const deleteTodo = (id) => api.delete(`tasks/delete/${id}`);

// ------------------- Counters -------------------
export const fetchCounters = () => api.get("counters/list");
export const addCounter = ({ title, start_date }) =>
  api.post("counters/add", { title, start_date });
export const updateCounter = (id, { title, start_date }) =>
  api.put(`counters/update/${id}`, { title, start_date });
export const deleteCounter = (id) => api.delete(`counters/delete/${id}`);
