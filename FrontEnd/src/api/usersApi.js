// src/api/usersApi.js
import axiosClient from "./axiosClient";

const usersApi = {
  getAll: () => axiosClient.get("/users"),
  getById: (id) => axiosClient.get(`/users/${id}`),

  updateUser: (id, data) => axiosClient.put(`/users/${id}`, data),

  updateMe: (data) => axiosClient.put("/users/me", data),

  changePassword: (data) => axiosClient.put("/users/change-password", data),

  deleteUser: (id) => axiosClient.delete(`/users/${id}`),
};


export default usersApi;
