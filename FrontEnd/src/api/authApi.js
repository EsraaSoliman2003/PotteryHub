// src/api/authApi.js
import axiosClient from "./axiosClient";

const authApi = {
  login: (data) => axiosClient.post("/auth/login", data),
  register: (data) => axiosClient.post("/auth/register", data),
  logout: () => axiosClient.post("/auth/logout"),
};

export default authApi;
