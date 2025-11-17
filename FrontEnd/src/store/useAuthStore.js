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

      // تسجيل الدخول
      login: async (email, password) => {
        try {
          set({ loading: true, error: null });

          const res = await authApi.login({ email, password });
          // الباك إند بيرجع { token, user: {id, name, email, role} }
          const { token, user } = res.data;

          // خزّن في zustand
          set({
            user,
            token,
            isAuthenticated: true,
            loading: false,
          });

          // لو حابة تحتفظي بالـ token كمان في localStorage (غير الـ persist)
          if (typeof window !== "undefined") {
            localStorage.setItem("token", token);
          }

          return { success: true };
        } catch (err) {
          console.error("Login error:", err);
          set({
            error: typeof err === "string" ? err : "Login failed",
            loading: false,
          });
          return { success: false, error: err };
        }
      },

      // تسجيل حساب جديد
      register: async (name, email, password) => {
        try {
          set({ loading: true, error: null });

          await authApi.register({ name, email, password });

          set({ loading: false });

          // مش بنعمل login أوتوماتيك هنا؛ ممكن تعملي redirect لصفحة login
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

      // تسجيل الخروج
      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }

        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-store", // اسم المفتاح في localStorage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
