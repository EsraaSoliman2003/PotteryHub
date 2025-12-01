// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5292/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject("Network error");
    }

    const status = error.response.status;
    const url = error.config?.url || "";

    if (
      status === 401 &&
      !url.includes("/auth/login") &&
      !url.includes("/auth/register")
    ) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-store");
        window.location.href = "/auth/login";
      }
    }

    const msg =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Unexpected error";

    return Promise.reject(msg);
  }
);

export default axiosClient;
