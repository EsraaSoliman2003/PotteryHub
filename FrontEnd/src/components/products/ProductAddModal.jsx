"use client";

import { useState } from "react";
import productsApi from "@/api/productsApi";

export default function ProductAddModal({ isOpen, onClose, onAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      setLoading(true);

      const payload = {
        title,
        description,
        price: parseFloat(price),
        imageUrl,
        stock: parseInt(stock),
        category,
      };

      const res = await productsApi.create(payload);
      onAdded(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4">
        <div className="flex justify-between px-5 py-4 border-b">
          <h2 className="font-semibold text-lg">Add New Product</h2>
          <button onClick={onClose} className="text-xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          {errorMsg && (
            <div className="text-red-600 bg-red-100 border border-red-300 px-3 py-2 rounded">
              {errorMsg}
            </div>
          )}

          <input
            type="text"
            placeholder="Product Title"
            className="w-full border rounded-lg px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full border rounded-lg px-3 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Image URL"
            className="w-full border rounded-lg px-3 py-2"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Stock"
            className="w-full border rounded-lg px-3 py-2"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full border rounded-lg px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-amber-500 text-white rounded-lg shadow"
            >
              {loading ? "Saving..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
