// src/app/cart/page.jsx
"use client";

import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";
import useCartStore from "@/store/useCartStore";
import Loader from "@/components/shared/Loader";

export default function CartPage() {
  const { cart, loading, error, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const items = cart?.items ?? [];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50/30 to-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-light text-slate-800 mb-4 font-serif">
              Shopping <span className="text-amber-600">Cart</span>
            </h1>
            <p className="text-lg text-slate-600">
              Review your items and proceed to checkout
            </p>
          </div>

          {loading && (
            <div className="flex justify-center py-10">
              <Loader />
            </div>
          )}

          {error && !loading && (
            <div className="text-center text-red-600 py-6">
              {error}
            </div>
          )}

          {!loading && !error && (
            <>
              {items.length > 0 ? (
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Cart Items */}
                  <div className="lg:col-span-2">
                    <CartList items={items} />
                  </div>

                  {/* Order Summary */}
                  <div className="lg:col-span-1">
                    <CartSummary items={items} />
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-6">🛒</div>
                  <h2 className="text-2xl font-light text-slate-800 mb-4">
                    Your cart is empty
                  </h2>
                  <p className="text-slate-600 mb-8">
                    Add some beautiful pottery to your cart
                  </p>
                  <button className="bg-amber-500 text-white px-8 py-3 rounded-xl hover:bg-amber-600 transition-colors font-semibold">
                    Continue Shopping
                  </button>
                </div>
              )}
            </>
          )}

          {/* Continue Shopping */}
          <div className="text-center mt-12">
            <button className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2 mx-auto">
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
