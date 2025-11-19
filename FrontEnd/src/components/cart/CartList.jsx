"use client";

import CartItem from "./CartItem";
import EmptyState from "@/components/shared/EmptyState";

export default function CartList({ items }) {
  if (!items.length) {
    return (
      <EmptyState
        title="Your cart is empty"
        text="Add some pottery pieces"
        icon="🛒"
      />
    );
  }

  return (
    <div className="bg-white/80 rounded-3xl border p-6">
      <h2 className="text-2xl font-light mb-6 font-serif">
        Your Items ({items.length})
      </h2>

      <div className="space-y-4">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
