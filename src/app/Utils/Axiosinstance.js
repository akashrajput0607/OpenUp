import axios from "axios";
export const API = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

// Add token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
