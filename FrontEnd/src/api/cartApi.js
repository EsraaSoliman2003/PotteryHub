// src/api/cartApi.js
import axiosClient from "./axiosClient";

const cartApi = {
  getMyCart: () => axiosClient.get("/cart"),
  addItem: (data) => axiosClient.post("/cart/add", data),
  updateItem: (data) => axiosClient.put("/cart/update", data),
  removeItem: (id) => axiosClient.delete(`/cart/remove/${id}`),
};

export default cartApi;
