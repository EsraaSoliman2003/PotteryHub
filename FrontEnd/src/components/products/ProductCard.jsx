// src/components/products/ProductCard.jsx
"use client";

import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import productsApi from "@/api/productsApi";
import ProductEditModal from "./ProductEditModal";

export default function ProductCard({ product, onDeleted, onUpdated }) {
  const [inCart, setInCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const router = useRouter();
  const { user } = useAuthStore();
  const isAdmin = user?.role === "Admin";

  const productId = product.id ?? product.productId;

  const handleCardClick = () => {
    if (!productId) return;
    router.push(`/products/${productId}`);
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    setInCart((v) => !v);
    // TODO: ربطها بـ useCartStore + cartApi
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!productId) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.title}" ?`
    );
    if (!confirmed) return;

    try {
      setLoadingDelete(true);
      await productsApi.delete(productId);
      alert("Product deleted successfully");

      if (onDeleted) onDeleted(productId);
    } catch (err) {
      console.error("Delete product error:", err);
      alert(
        typeof err === "string" ? err : "Failed to delete product, try again."
      );
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleOpenEdit = (e) => {
    e.stopPropagation();
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => setIsEditOpen(false);

  const handleUpdatedFromModal = (updatedProduct) => {
    if (onUpdated) onUpdated(updatedProduct);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarIcon key={i} className="w-4 h-4 text-amber-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarIcon
          key="half"
          className="w-4 h-4 text-amber-400 fill-current"
        />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIcon
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300"
        />
      );
    }

    return stars;
  };

  return (
    <>
      {/* الكارت نفسه */}
      <div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="
          relative rounded-3xl overflow-hidden border border-amber-200/50 shadow-lg
          bg-white cursor-pointer transition-all duration-500
          hover:shadow-2xl hover:border-amber-300/70
          flex flex-col h-full
        "
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100/30">
          <img
            src={product.imageUrl}
            alt={product.title}
            className={`
              w-full h-full object-cover transition-transform duration-700
              ${isHovered ? "scale-110" : "scale-100"}
            `}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-amber-700 text-xs font-medium uppercase tracking-wide">
              {product.category}
            </span>
          </div>

          {isAdmin && (
            <div className="absolute top-4 right-4">
              <span className="px-2 py-1 rounded-full bg-amber-500 text-[10px] font-semibold text-slate-900 uppercase">
                Admin
              </span>
            </div>
          )}

          <div
            className={`
              absolute bottom-4 left-1/2 transform -translate-x-1/2
              transition-all duration-300
              ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-amber-700 text-sm font-medium">
              Quick View
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col gap-4">
          <div className="flex-1">
            <h3 className="font-serif text-xl font-medium text-slate-800 mb-2 line-clamp-1">
              {product.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-amber-100 gap-3">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-amber-600">
                ${Number(product.price).toFixed(2)}
              </span>
            </div>

            {!isAdmin && (
              <button
                onClick={handleCartClick}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    inCart
                      ? "bg-amber-100 text-amber-700 border border-amber-200"
                      : "bg-amber-500 text-white hover:bg-amber-600"
                  }
                `}
              >
                {inCart ? "Added ✓" : "Add to Cart"}
              </button>
            )}

            {isAdmin && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenEdit}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border border-amber-500 text-amber-600 hover:bg-amber-50 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loadingDelete}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border border-red-500 text-red-600 hover:bg-red-50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loadingDelete ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🧩 Modal التعديل */}
      <ProductEditModal
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
        product={product}
        onUpdated={handleUpdatedFromModal}
      />
    </>
  );
}
