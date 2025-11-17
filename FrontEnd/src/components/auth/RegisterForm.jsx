// src/components/auth/RegisterForm.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

export default function RegisterForm() {
  const router = useRouter();
  const { register, loading, error } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMsg(null);

    const result = await register(name, email, password);

    if (!result.success) {
      setLocalError(result.error || "Register failed");
      return;
    }

    setSuccessMsg("Registered successfully. You can now login.");
    setTimeout(() => {
      router.push("/auth/login");
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl border border-amber-200/50 p-6 shadow-lg max-w-md mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-light text-slate-800 mb-2 font-serif">
          Create Account
        </h1>
        <p className="text-slate-600 text-sm">
          Join us and start your pottery journey
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {(localError || error) && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {localError || error}
          </div>
        )}
        {successMsg && (
          <div className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">
            {successMsg}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Your full name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200/50 outline-none transition-all duration-300 text-sm"
          />
        </div>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200/50 outline-none transition-all duration-300 text-sm"
          />
        </div>
        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Create a strong password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200/50 outline-none transition-all duration-300 text-sm"
          />
          <p className="text-xs text-slate-500 mt-1">
            Must be at least 8 characters long
          </p>
        </div>
        {/* Terms */}
        <label className="flex items-start gap-2 text-xs text-slate-600">
          <input
            type="checkbox"
            required
            className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 mt-0.5 scale-90"
          />
          <span>
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              Privacy Policy
            </Link>
          </span>
        </label>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 text-white py-2.5 rounded-lg hover:bg-amber-600 transition-all duration-300 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-slate-500">
              Or sign up with
            </span>
          </div>
        </div>
        {/* Social Sign Up */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 font-medium text-sm"
          >
            <div className="w-4 h-4 text-sm">G</div>
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 font-medium text-sm"
          >
            <div className="w-4 h-4 text-sm text-blue-500">f</div>
            Facebook
          </button>
        </div>
        {/* Login Link */}{" "}
        <p className="text-center text-slate-600 text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-amber-600 hover:text-amber-700 font-semibold"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
