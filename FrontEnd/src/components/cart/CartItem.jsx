"use client";

import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import useCartStore from "@/store/useCartStore";
import { useState } from "react";

export default function CartItem({ item }) {
  const { updateItem, removeItem } = useCartStore();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleUpdate = async (newQty) => {
    if (newQty < 1) return;
    setQuantity(newQty);
    await updateItem(item.id, newQty); 
  };

  const handleRemove = async () => {
    await removeItem(item.id);
  };

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border">
      <img src={item.imageUrl} className="w-20 h-20 rounded-lg" />

      <div className="flex-1">
        <h3 className="font-semibold text-slate-800">{item.title}</h3>
        <p className="text-sm text-slate-500">{item.description}</p>

        <div className="flex justify-between items-center mt-4">
          {/* Quantity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleUpdate(quantity - 1)}
              disabled={quantity <= 1}
              className="p-2 border rounded-lg"
            >
              <MinusIcon className="w-4 h-4" />
            </button>

            <span className="font-semibold">{quantity}</span>

            <button
              onClick={() => handleUpdate(quantity + 1)}
              className="p-2 border rounded-lg"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Remove */}
          <button onClick={handleRemove} className="text-red-500">
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
