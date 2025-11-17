// CartList.js - مع إضافة use client
"use client";

import CartItem from "./CartItem";
import EmptyState from "@/components/shared/EmptyState";

const DEMO_CART = [
  {
    id: "p1",
    name: "Handcrafted Ceramic Vase",
    price: 99.99,
    image: "https://i.pinimg.com/1200x/fc/c9/2a/fcc92a030e4dbccd5677715b263748db.jpg",
    category: "Ceramics",
    quantity: 1,
    description: "Beautiful handcrafted vase with unique glaze patterns"
  },
  {
    id: "p2",
    name: "Artisan Coffee Mug Set",
    price: 45.00,
    image: "https://i.pinimg.com/1200x/fc/c9/2a/fcc92a030e4dbccd5677715b263748db.jpg",
    category: "Dinnerware",
    quantity: 2,
    description: "Set of 2 hand-thrown coffee mugs"
  },
];

export default function CartList() {
  if (!DEMO_CART.length) {
    return (
      <EmptyState
        title="Your cart is empty"
        text="Add some beautiful pottery pieces to get started."
        icon="🛒"
      />
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-200/30 p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light text-slate-800 font-serif">
          Your Items ({DEMO_CART.length})
        </h2>
        <button 
          onClick={() => console.log("Remove all items")}
          className="text-amber-600 hover:text-amber-700 text-sm font-medium"
        >
          Remove All
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {DEMO_CART.map((item) => (
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