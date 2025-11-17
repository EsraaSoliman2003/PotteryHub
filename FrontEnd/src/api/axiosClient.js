// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5292/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
axiosClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle API errors
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const msg =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Unexpected error";

    return Promise.reject(msg);
  }
);

export default axiosClient;
