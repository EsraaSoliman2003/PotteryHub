"use client";

import { useState } from "react";
import productsApi from "@/api/productsApi";

export default function ProductAddModal({ isOpen, onClose, onAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");
  const [imageUrl5, setImageUrl5] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  const [dimensions, setDimensions] = useState("");

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
        imageUrl2: imageUrl2 || null,
        imageUrl3: imageUrl3 || null,
        imageUrl4: imageUrl4 || null,
        imageUrl5: imageUrl5 || null,
        stock: parseInt(stock, 10),
        category,
        dimensions: dimensions || null,
      };

      const res = await productsApi.create(payload);
      onAdded(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMsg(
        typeof err === "string"
          ? err
          : "Failed to add product, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4">
        <div className="flex justify-between px-5 py-4 border-b">
          <h2 className="font-semibold text-lg">Add New Product</h2>
          <button onClick={onClose} className="text-xl">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          {errorMsg && (
            <div className="text-red-600 bg-red-100 border border-red-300 px-3 py-2 rounded">
              {errorMsg}
            </div>
          )}

          {/* Title */}
          <input
            type="text"
            placeholder="Product Title"
            className="w-full border rounded-lg px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            className="w-full border rounded-lg px-3 py-2"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* Price */}
          <input
            type="number"
            placeholder="Price"
            className="w-full border rounded-lg px-3 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            step="0.01"
          />

          {/* Main Image */}
          <input
            type="text"
            placeholder="Main Image URL"
            className="w-full border rounded-lg px-3 py-2"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />

          {/* Extra Images (اختيارية) */}
          <input
            type="text"
            placeholder="Second Image URL (optional)"
            className="w-full border rounded-lg px-3 py-2"
            value={imageUrl2}
            onChange={(e) => setImageUrl2(e.target.value)}
          />
          <input
            type="text"
            placeholder="Third Image URL (optional)"
            className="w-full border rounded-lg px-3 py-2"
            value={imageUrl3}
            onChange={(e) => setImageUrl3(e.target.value)}
          />
          <input
            type="text"
            placeholder="Fourth Image URL (optional)"
            className="w-full border rounded-lg px-3 py-2"
            value={imageUrl4}
            onChange={(e) => setImageUrl4(e.target.value)}
          />
          <input
            type="text"
            placeholder="Fifth Image URL (optional)"
            className="w-full border rounded-lg px-3 py-2"
            value={imageUrl5}
            onChange={(e) => setImageUrl5(e.target.value)}
          />

          {/* Stock & Category */}
          <input
            type="number"
            placeholder="Stock"
            className="w-full border rounded-lg px-3 py-2"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            min="0"
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full border rounded-lg px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          {/* Dimensions */}
          <input
            type="text"
            placeholder='Dimensions (e.g. 12" H × 8" W)'
            className="w-full border rounded-lg px-3 py-2"
            value={dimensions}
            onChange={(e) => setDimensions(e.target.value)}
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
              className="px-5 py-2 bg-amber-500 text-white rounded-lg shadow disabled:opacity-60"
            >
              {loading ? "Saving..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
