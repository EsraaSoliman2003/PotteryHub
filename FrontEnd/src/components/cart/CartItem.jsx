// src/components/cart/CartItem.jsx
"use client";

import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import useCartStore from "@/store/useCartStore";

export default function CartItem({ item }) {
  const { updateItem, removeItem } = useCartStore();

  const { id, quantity, product } = item;

  const name = product?.title ?? "";
  const price = Number(product?.price ?? 0);
  const image = product?.imageUrl;
  const category = product?.category ?? "";
  const description = product?.description ?? "";

  const [localQty, setLocalQty] = useState(quantity);

  const handleUpdateQuantity = async (newQuantity) => {
    if (newQuantity < 1) return;

    setLocalQty(newQuantity);
    try {
      await updateItem(id, newQuantity); // itemId = item.id من الـ API
    } catch (err) {
      console.error("Update quantity error:", err);
      // ممكن ترجعي الكمية القديمة لو حابة
      // setLocalQty(quantity);
    }
  };

  const handleRemove = async () => {
    try {
      await removeItem(id);
    } catch (err) {
      console.error("Remove item error:", err);
    }
  };

  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl border border-amber-200/30 hover:border-amber-300/50 transition-all duration-300 group">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="w-20 h-20 lg:w-24 lg:h-24 bg-amber-100 rounded-xl overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-800 text-sm lg:text-base mb-1">
              {name}
            </h3>
            <p className="text-slate-500 text-xs mb-2 line-clamp-1">
              {description}
            </p>
            <span className="inline-block px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
              {category}
            </span>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-lg font-semibold text-slate-800">
              ${(price * localQty).toFixed(2)}
            </div>
            {localQty > 1 && (
              <div className="text-sm text-slate-500">
                ${price.toFixed(2)} each
              </div>
            )}
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleUpdateQuantity(localQty - 1)}
              disabled={localQty <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-colors"
            >
              <MinusIcon className="w-4 h-4" />
            </button>

            <span className="w-8 text-center font-semibold text-slate-800">
              {localQty}
            </span>

            <button
              onClick={() => handleUpdateQuantity(localQty + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors group-hover:opacity-100 opacity-0"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
