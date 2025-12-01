// src/store/useSnackbarStore.js
"use client";

import { create } from "zustand";

const useSnackbarStore = create((set) => ({
  open: false,
  message: "",
  variant: "info", // "success" | "error" | "info"
  duration: 3000,  // ms

  showSnackbar: (message, options = {}) => {
    const { variant = "info", duration = 3000 } = options;
    set({
      open: true,
      message,
      variant,
      duration,
    });
  },

  hideSnackbar: () => {
    set({
      open: false,
      message: "",
    });
  },
}));

export default useSnackbarStore;
