// CartItem.js - مع إضافة use client
"use client";

import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function CartItem({ item }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const { id, name, price, image, category, description } = item;

  const updateQuantity = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    console.log(`Update item ${id} quantity to ${newQuantity}`);
  };

  const removeItem = () => {
    console.log(`Remove item ${id}`);
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
              ${(price * quantity).toFixed(2)}
            </div>
            {quantity > 1 && (
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
              onClick={() => updateQuantity(quantity - 1)}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-colors"
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            
            <span className="w-8 text-center font-semibold text-slate-800">
              {quantity}
            </span>
            
            <button
              onClick={() => updateQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={removeItem}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors group-hover:opacity-100 opacity-0"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}