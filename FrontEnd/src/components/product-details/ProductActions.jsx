"use client";

import { useState } from "react";
import { ShareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import useCartStore from "@/store/useCartStore";
import useAuthStore from "@/store/useAuthStore";
import useSnackbarStore from "@/store/useSnackbarStore";

export default function ProductActions({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);

  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const { isAuthenticated } = useAuthStore();
  const { showSnackbar } = useSnackbarStore();

  const stock =
    typeof product.stock === "number"
      ? product.stock
      : parseInt(product.stock ?? "0", 10) || 0;

  const maxQty = stock > 0 ? stock : 1;
  const isOutOfStock = stock <= 0;

  const handleDecrease = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleIncrease = () => {
    setQuantity((q) => Math.min(maxQty, q + 1));
  };

  const requireAuth = () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return false;
    }
    return true;
  };

  const handleAddToCart = async () => {
    if (isOutOfStock) return;
    if (!requireAuth()) return;

    try {
      setAddingToCart(true);
      await addItem(product.id, quantity);

    } catch (err) {
      console.error("Add to cart error:", err);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (isOutOfStock) return;
    if (!requireAuth()) return;

    try {
      setBuyingNow(true);
      await addItem(product.id, quantity);
      router.push("/cart");
    } catch (err) {
      console.error("Buy now error:", err);
    } finally {
      setBuyingNow(false);
    }
  };

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      showSnackbar("Product link copied to clipboard ✅", {
        variant: "success",
      });
    } catch (err) {
      console.error("Share error:", err);
      showSnackbar("Failed to copy link", { variant: "error" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Quantity Selector */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div>
          <span className="font-medium text-gray-700">Quantity</span>
          <div className="text-xs text-gray-500 mt-1">
            {isOutOfStock
              ? "Out of stock"
              : `Max: ${maxQty} item${maxQty > 1 ? "s" : ""}`}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleDecrease}
            disabled={quantity <= 1 || isOutOfStock}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg text-gray-600 hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            −
          </button>

          <span className="text-xl font-bold w-8 text-center">{quantity}</span>

          <button
            onClick={handleIncrease}
            disabled={quantity >= maxQty || isOutOfStock}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg text-gray-600 hover:bg:white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock || addingToCart}
          className="w-full py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isOutOfStock
            ? "Out of Stock"
            : addingToCart
            ? "Adding..."
            : "Add to Cart"}
        </button>

        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock || buyingNow}
          className="w-full py-4 border-2 border-gray-900 text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isOutOfStock
            ? "Unavailable"
            : buyingNow
            ? "Processing..."
            : "Buy Now"}
        </button>
      </div>

      {/* Secondary Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleShare}
          className="
            flex-1 flex items-center justify-center gap-2 py-3 
            border border-gray-300 rounded-xl text-gray-700 
            hover:bg-gray-50 transition-colors
            cursor-pointer
          "
        >
          <ShareIcon className="w-5 h-5" />
          <span className="font-medium">Share</span>
        </button>
      </div>

      {/* Trust Features */}
      <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
        <div>
          <div className="text-lg">🚚</div>
          <div>Free Shipping</div>
        </div>
        <div>
          <div className="text-lg">↩️</div>
          <div>30-Day Returns</div>
        </div>
        <div>
          <div className="text-lg">🔒</div>
          <div>Secure Checkout</div>
        </div>
      </div>
    </div>
  );
}
