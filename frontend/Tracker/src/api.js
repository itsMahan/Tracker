import axios from "axios"

const api = axios.create({
    baseURL:
});

export const fetchTodos = () => api.get()

export const createTodo = (Text) => api.post()

export const updateTodo = (id , data) => api.patch()

export const deleteTodo = (id) => api.delete()