// src/store/useCartStore.js
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import cartApi from "@/api/cartApi";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: null,        // { id, userId, items: [...] }
      loading: false,
      error: null,

      // جلب السلة من الـ API
      fetchCart: async () => {
        try {
          set({ loading: true, error: null });
          const res = await cartApi.getMyCart();
          set({ cart: res.data, loading: false });
        } catch (err) {
          console.error("Fetch cart error:", err);
          set({
            error: typeof err === "string" ? err : "Failed to load cart",
            loading: false,
          });
        }
      },

      // إضافة منتج للسلة
      addItem: async (productId, quantity = 1) => {
        try {
          set({ loading: true, error: null });
          const res = await cartApi.addItem({ productId, quantity });
          // الباك إند بيرجع السلة بعد التعديل
          set({ cart: res.data, loading: false });
        } catch (err) {
          console.error("Add item error:", err);
          set({
            error: typeof err === "string" ? err : "Failed to add item",
            loading: false,
          });
        }
      },

      // تعديل الكمية
      updateItem: async (itemId, quantity) => {
        try {
          set({ loading: true, error: null });
          const res = await cartApi.updateItem({ itemId, quantity });
          set({ cart: res.data, loading: false });
        } catch (err) {
          console.error("Update item error:", err);
          set({
            error: typeof err === "string" ? err : "Failed to update item",
            loading: false,
          });
        }
      },

      // حذف منتج من السلة
      removeItem: async (itemId) => {
        try {
          set({ loading: true, error: null });
          await cartApi.removeItem(itemId);

          const current = get().cart;
          if (current) {
            const updatedItems = current.items?.filter(
              (i) => i.id !== itemId
            );
            set({
              cart: { ...current, items: updatedItems },
              loading: false,
            });
          } else {
            set({ loading: false });
          }
        } catch (err) {
          console.error("Remove item error:", err);
          set({
            error: typeof err === "string" ? err : "Failed to remove item",
            loading: false,
          });
        }
      },

      clearCart: () => {
        set({ cart: null });
      },
    }),
    {
      name: "cart-store",
      partialize: (state) => ({
        cart: state.cart,
      }),
    }
  )
);

export default useCartStore;
