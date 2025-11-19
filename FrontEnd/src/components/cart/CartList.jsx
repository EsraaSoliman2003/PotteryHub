// src/components/cart/CartList.jsx
"use client";

import CartItem from "./CartItem";
import EmptyState from "@/components/shared/EmptyState";
import useCartStore from "@/store/useCartStore";

export default function CartList({ items }) {
  const { removeItem } = useCartStore();

  if (!items || items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        text="Add some beautiful pottery pieces to get started."
        icon="🛒"
      />
    );
  }

  const handleRemoveAll = () => {
    // لو حابة تعملي end-point لمسح الكارت كله بعدين
    items.forEach((item) => {
      removeItem(item.id);
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-200/30 p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-slate-800 font-serif">
          Your Items ({items.length})
        </h2>
        <button
          onClick={handleRemoveAll}
          className="text-amber-600 hover:text-amber-700 text-sm font-medium"
        >
          Remove All
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Promo Code */}
      <div className="mt-8 pt-6 border-t border-amber-200/30">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter promo code"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 outline-none transition-all"
          />
          <button
            onClick={() => console.log("Apply promo code")}
            className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-medium"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
