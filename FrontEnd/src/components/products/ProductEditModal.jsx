// src/components/products/ProductEditModal.jsx
"use client";

import { useEffect, useState } from "react";
import productsApi from "@/api/productsApi";

export default function ProductEditModal({
  isOpen,
  onClose,
  product,
  onUpdated,
}) {
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
  const [quantity, setQuantity] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (product && isOpen) {
      setTitle(product.title ?? "");
      setDescription(product.description ?? "");
      setPrice(product.price?.toString() ?? "");
      setImageUrl(product.imageUrl ?? "");
      setImageUrl2(product.imageUrl2 ?? "");
      setImageUrl3(product.imageUrl3 ?? "");
      setImageUrl4(product.imageUrl4 ?? "");
      setImageUrl5(product.imageUrl5 ?? "");
      setStock((product.stock ?? 0).toString());
      setCategory(product.category ?? "");
      setDimensions(product.dimensions ?? "");
      setQuantity(product.quantity ?? "");
      setErrorMsg("");
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const productId = product.id ?? product.productId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!productId) {
      setErrorMsg("Invalid product id");
      return;
    }

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);

    if (Number.isNaN(parsedPrice) || Number.isNaN(parsedStock)) {
      setErrorMsg("Price and stock must be numeric values");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title,
        description,
        price: parsedPrice,
        imageUrl,
        imageUrl2: imageUrl2 || null,
        imageUrl3: imageUrl3 || null,
        imageUrl4: imageUrl4 || null,
        imageUrl5: imageUrl5 || null,
        stock: parsedStock,
        category,
        dimensions: dimensions || null,
        quantity: quantity || null,
      };

      const res = await productsApi.update(productId, payload);
      const updated = res.data;

      if (onUpdated) onUpdated(updated);

      onClose();
    } catch (err) {
      console.error("Update product error:", err);
      setErrorMsg(
        typeof err === "string"
          ? err
          : "Failed to update product, please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Modal card */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded-lg">
              {errorMsg}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 outline-none text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 outline-none text-sm resize-none"
            />
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Price
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 outline-none text-sm"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 outline-none text-sm"
            />
          </div>

          {/* Images */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Main Image URL
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 outline-none text-sm"
            />

            <label className="block text-xs text-slate-500 mt-1 mb-1">
              Extra Images (optional)
            </label>
            <input
              type="text"
              placeholder="Second Image URL"
              value={imageUrl2}
              onChange={(e) => setImageUrl2(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm mb-1"
            />
            <input
              type="text"
              placeholder="Third Image URL"
              value={imageUrl3}
              onChange={(e) => setImageUrl3(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm mb-1"
            />
            <input
              type="text"
              placeholder="Fourth Image URL"
              value={imageUrl4}
              onChange={(e) => setImageUrl4(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm mb-1"
            />
            <input
              type="text"
              placeholder="Fifth Image URL"
              value={imageUrl5}
              onChange={(e) => setImageUrl5(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>

          {/* Dimensions & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Dimensions
              </label>
              <input
                type="text"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder='e.g. 12" H × 8" W'
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Quantity (string)
              </label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder='e.g. "10 pcs" or "Set of 4"'
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/40 outline-none text-sm"
              />
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-all disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-sm font-semibold text-slate-900 shadow-md hover:shadow-lg transition-all disabled:opacity-60 flex items-center gap-2"
            >
              {loading && (
                <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              )}
              <span>{loading ? "Saving..." : "Save changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
