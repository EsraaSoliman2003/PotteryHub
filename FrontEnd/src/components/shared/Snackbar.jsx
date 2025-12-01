// src/components/shared/Snackbar.jsx
"use client";

import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useSnackbarStore from "@/store/useSnackbarStore";

export default function Snackbar() {
  const { open, message, variant, duration, hideSnackbar } = useSnackbarStore();

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      hideSnackbar();
    }, duration);

    return () => clearTimeout(timer);
  }, [open, duration, hideSnackbar]);

  if (!open) return null;

  let colorClasses =
    "bg-slate-800 text-slate-50 border border-slate-600 shadow-slate-900/40";

  if (variant === "success") {
    colorClasses =
      "bg-emerald-600 text-emerald-50 border border-emerald-500 shadow-emerald-900/40";
  } else if (variant === "error") {
    colorClasses =
      "bg-rose-600 text-rose-50 border border-rose-500 shadow-rose-900/40";
  } else if (variant === "info") {
    colorClasses =
      "bg-sky-600 text-sky-50 border border-sky-500 shadow-sky-900/40";
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-[9999] flex justify-center pointer-events-none">
      <div
        className={`
          pointer-events-auto px-4 py-3 rounded-xl shadow-lg max-w-md w-[90%]
          flex items-center justify-between gap-3 text-sm
          ${colorClasses}
          transition-all duration-300 transform
          animate-[fadeInUp_0.25s_ease-out]
        `}
      >
        <span className="flex-1">{message}</span>

        <button
          type="button"
          onClick={hideSnackbar}
          className="p-1 rounded-full hover:bg-black/10 transition-colors"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>

        {/* Tailwind custom animation via global CSS لو حابة */}
      </div>
    </div>
  );
}
