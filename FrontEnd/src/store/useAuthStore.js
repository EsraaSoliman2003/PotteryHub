// src/store/useAuthStore.js
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import authApi from "@/api/authApi";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      setUser: (updatedUser) => set({ user: updatedUser }),

      login: async (email, password) => {
        try {
          set({ loading: true, error: null });

          const res = await authApi.login({ email, password });

          const { user } = res.data;

          set({
            user,
            token: null,
            isAuthenticated: true,
            loading: false,
            error: null,
          });

          return { success: true };
        } catch (err) {
          console.error("Login error:", err);
          set({
            error: typeof err === "string" ? err : "Login failed",
            loading: false,
            isAuthenticated: false,
          });
          return { success: false, error: err };
        }
      },

      register: async (name, email, password) => {
        try {
          set({ loading: true, error: null });

          await authApi.register({ name, email, password });

          set({ loading: false });

          return { success: true };
        } catch (err) {
          console.error("Register error:", err);
          set({
            error: typeof err === "string" ? err : "Register failed",
            loading: false,
          });
          return { success: false, error: err };
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } catch (err) {
          console.error("Logout error:", err);
        }

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
