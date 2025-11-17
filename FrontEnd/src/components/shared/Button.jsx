// Button.js - مع إضافة use client
"use client";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 font-medium " +
    "transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 " +
    "disabled:opacity-60 disabled:cursor-not-allowed hover:scale-105 hover:shadow-xl";

  const variants = {
    primary:
      "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 focus:ring-amber-500 shadow-lg",
    secondary:
      "bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200 focus:ring-slate-500",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-500",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}