// src/components/auth/LoginForm.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

export default function LoginForm() {
  const router = useRouter();
  const { login, loading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [localError, setLocalError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    const result = await login(email, password);

    if (!result.success) {
      setLocalError(result.error || "Login failed");
      return;
    }
    router.push("/profile");
  };

  return (
    <div className="bg-white rounded-xl border border-amber-200/50 p-6 shadow-lg max-w-md mx-auto">
      
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-light text-slate-800 mb-2 font-serif">
          Welcome Back
        </h1>
        <p className="text-slate-600 text-sm">
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        { (localError || error) && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
            {localError || error}
          </div>
        )}

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
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <Link
              href="#"
              className="text-xs text-amber-600 hover:text-amber-700"
            >
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200/50 outline-none transition-all duration-300 text-sm"
          />
        </div>

        {/* Remember Me */}
        <label className="flex items-center gap-2 text-xs text-slate-600">
          <input
            type="checkbox"
            className="rounded border-slate-300 text-amber-500 focus:ring-amber-500 scale-90"
          />
          Remember me
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 text-white py-2.5 rounded-lg hover:bg-amber-600 transition-all duration-300 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Signing in...
            </div>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-slate-500">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
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

        {/* Sign Up Link */}
        <p className="text-center text-slate-600 text-sm">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="text-amber-600 hover:text-amber-700 font-semibold"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
