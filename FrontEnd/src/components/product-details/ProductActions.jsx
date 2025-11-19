// src/components/product-details/ProductActions.jsx
"use client";

import { useState } from "react";
import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

export default function ProductActions({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // 👇 هنا بنحوّل القيمة الجاية من ال API (string) لرقم
  // مثال: "10" أو "10 pcs" → 10
  const rawQty = product.quantity
    ? parseInt(product.quantity, 10)
    : 0;

  const maxQty = rawQty > 0 ? rawQty : 1;      // أقصى كمية نسمح بيها في الـ UI
  const isOutOfStock = rawQty <= 0;            // لو 0 أو أقل نعتبره out of stock

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    console.log("Added to cart:", { product, quantity });

    // هنا بعدين تربطيه بـ useCartStore أو cartApi
  };

  const handleDecrease = () => {
    setQuantity((q) => Math.max(1, q - 1));
  };

  const handleIncrease = () => {
    setQuantity((q) => Math.min(maxQty, q + 1)); // 👈 هنا اللي بيوقف عند أقصى قيمة
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
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg text-gray-600 hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>

        <button
          disabled={isOutOfStock}
          className="w-full py-4 border-2 border-gray-900 text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Buy Now
        </button>
      </div>

      {/* Secondary Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {isWishlisted ? (
            <HeartSolidIcon className="w-5 h-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5 h-5" />
          )}
          <span className="font-medium">Wishlist</span>
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">
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
