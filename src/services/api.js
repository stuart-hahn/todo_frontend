// src/services/api.js

import axios from "axios";

const API_URL = "http://localhost:3001/api/v1"; // Adjust the port if your Rails server runs on a different port

const api = axios.create({
  baseURL: API_URL,
});

export const getTasks = () => api.get("/tasks");
export const getTask = (id) => api.get(`/tasks/${id}`);
export const createTask = (task) => api.post("/tasks", { task });
export const updateTask = (id, task) => api.put(`/tasks/${id}`, { task });
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;
