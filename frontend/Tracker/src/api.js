import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/tasks/", // Your backend base URL
});

// Fetch all todos
export const fetchTodos = () => api.get("list/"); // GET http://127.0.0.1:8000/api/tasks/list/

// Create a new todo
export const createTodo = (text) => {
  console.log("API: creating todo with text:", text); // Debug
  return api.post("add/", { text }); // POST http://127.0.0.1:8000/api/tasks/add/
};

// Update a todo (toggle done)
export const updateTodo = (id, data) => {
  console.log("API: updating todo:", id, data); // Debug
  return api.patch(`${id}/update/`, data); // PATCH http://127.0.0.1:8000/api/tasks/{id}/update/
};

// Delete a todo
export const deleteTodo = (id) => {
  console.log("API: deleting todo:", id); // Debug
  return api.delete(`${id}/delete/`); // DELETE http://127.0.0.1:8000/api/tasks/{id}/delete/
};
