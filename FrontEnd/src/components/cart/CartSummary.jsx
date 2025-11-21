// src/components/cart/CartSummary.jsx
"use client";

import Button from "@/components/shared/Button";
import { TruckIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function CartSummary({ items, onCheckout, placingOrder }) {
  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.product?.price ?? 0);
    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const freeShippingProgress = Math.min((subtotal / 100) * 100, 100);

  const handleCheckoutClick = () => {
    if (!onCheckout) return;
    onCheckout();
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-200/30 p-6 lg:p-8 sticky top-8">
      <h2 className="text-2xl font-light text-slate-800 mb-6 font-serif">
        Order Summary
      </h2>

      {/* Price Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="border-t border-amber-200/50 pt-4 flex justify-between text-lg font-semibold text-slate-800">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {/* Free Shipping Progress */}
        {subtotal < 100 && (
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/50">
            <div className="flex items-center gap-2 text-amber-700 text-sm mb-2">
              <TruckIcon className="w-4 h-4" />
              <span>Add ${(100 - subtotal).toFixed(2)} for free shipping!</span>
            </div>
            <div className="w-full bg-amber-200 rounded-full h-2">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <Button
        className="w-full py-4 text-lg font-semibold rounded-2xl mb-4"
        onClick={handleCheckoutClick}
        disabled={placingOrder || items.length === 0}
      >
        {placingOrder ? "Placing order..." : "Proceed to Checkout"}
      </Button>

      <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
        <ShieldCheckIcon className="w-4 h-4" />
        <span>Secure checkout</span>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-amber-200/30 text-center">
        <div>
          <div className="text-lg mb-1">🚚</div>
          <div className="text-xs text-slate-600">Free Shipping</div>
        </div>
        <div>
          <div className="text-lg mb-1">↩️</div>
          <div className="text-xs text-slate-600">30-Day Returns</div>
        </div>
        <div>
          <div className="text-lg mb-1">🔒</div>
          <div className="text-xs text-slate-600">Secure Payment</div>
        </div>
      </div>
    </div>
  );
}
