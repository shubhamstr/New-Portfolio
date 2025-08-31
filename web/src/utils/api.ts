// api.ts
import axios from "axios";
import { API_URL } from "./constants";

const api = axios.create({
  baseURL: API_URL || "http://localhost:5000/api", // fallback
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
