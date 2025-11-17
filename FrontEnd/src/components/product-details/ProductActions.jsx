// ProductActions.js - النسخة الأنيقة
"use client";

import { useState } from "react";
import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

export default function ProductActions({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    console.log("Added to cart:", { product, quantity });
  };

  return (
    <div className="space-y-6">
      {/* Quantity Selector */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <span className="font-medium text-gray-700">Quantity</span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg text-gray-600 hover:bg-white transition-colors"
          >
            −
          </button>
          <span className="text-xl font-bold w-8 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg text-gray-600 hover:bg-white transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          className="w-full py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
        >
          Add to Cart
        </button>
        
        <button className="w-full py-4 border-2 border-gray-900 text-gray-900 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
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