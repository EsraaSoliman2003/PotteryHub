// src/api/ordersApi.js
import axiosClient from "./axiosClient";

const ordersApi = {
  createOrder: () => axiosClient.post("/orders"),
  getMyOrders: () => axiosClient.get("/orders/my"),

  // Admin only
  getAll: () => axiosClient.get("/orders"),
  updateStatus: (id, status) =>
    axiosClient.put(`/orders/${id}/status`, status),
};

export default ordersApi;
