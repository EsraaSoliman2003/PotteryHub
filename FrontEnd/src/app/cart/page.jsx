"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";
import useCartStore from "@/store/useCartStore";
import Loader from "@/components/shared/Loader";
import ordersApi from "@/api/ordersApi";

export default function CartPage() {
  const router = useRouter();

  const { cart, loading, error, fetchCart, clearCart } = useCartStore();
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const items = cart?.items ?? [];

  const handlePlaceOrder = async () => {
    if (!items.length) {
      alert("Your cart is empty");
      return;
    }

    try {
      setPlacingOrder(true);

      const res = await ordersApi.createOrder();
      const order = res.data;

      clearCart();

      alert(`Order #${order.id} created successfully`);
      router.push("/profile");
    } catch (err) {
      console.error("Place order error:", err);
      alert(typeof err === "string" ? err : "Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleContinueShopping = () => {
    router.push("/products");
  };

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
            <div className="text-center text-red-600 py-6">{error}</div>
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
                    <CartSummary
                      items={items}
                      onCheckout={handlePlaceOrder}
                      placingOrder={placingOrder}
                    />
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
                  <button
                    onClick={handleContinueShopping}
                    className="bg-amber-500 text-white px-8 py-3 rounded-xl hover:bg-amber-600 transition-colors font-semibold"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </>
          )}

          {/* Continue Shopping */}
          <div className="text-center mt-12">
            <button
              onClick={handleContinueShopping}
              className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2 mx-auto"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
