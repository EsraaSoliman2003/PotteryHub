"use client";

import Link from "next/link";
import {
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter } from "next/navigation";

import useAuthStore from "@/store/useAuthStore";
import useCartStore from "@/store/useCartStore";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const { user, isAuthenticated, logout } = useAuthStore();
  const isAdmin = isAuthenticated && user?.role === "Admin";

  const cart = useCartStore((state) => state.cart);

  const cartCount =
    cart?.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-lg border-b border-slate-700/50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* --- Logo --- */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-amber-500/25 group-hover:scale-105 transition-all duration-300">
                <span className="text-slate-900 font-bold text-sm">P</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-light text-white">Pottery</span>
                <span className="text-amber-400 font-medium">Store</span>
              </div>
            </Link>

            {/* --- Desktop Navigation --- */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-300 hover:text-amber-400 font-medium text-sm transition-all duration-300 relative group py-2"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}

              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-amber-300 hover:text-amber-400 font-semibold text-sm transition-all duration-300 relative py-2"
                >
                  Admin
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-400/70"></span>
                </Link>
              )}
            </nav>

            {/* --- Search Bar (Desktop) --- */}
            <div className="hidden lg:flex items-center flex-1 max-w-xs mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-600 bg-slate-800/50 focus:bg-slate-800 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 outline-none text-white placeholder-slate-400 text-sm"
                />
                <MagnifyingGlassIcon className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            {/* --- Right Side Actions --- */}
            <div className="flex items-center gap-3">
              {/* Search Button (Mobile) */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="lg:hidden p-1.5 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
              </button>

              {/* Cart Icon */}
              <Link href="/cart" className="relative p-1.5 group">
                <ShoppingCartIcon className="w-5 h-5 text-slate-300 group-hover:text-amber-400 transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-900 text-[10px] rounded-full flex items-center justify-center font-bold shadow-lg">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User / Auth Area (Desktop) */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-1.5 p-1.5 px-3 rounded-xl bg-slate-700/50 text-slate-200 hover:bg-slate-700 hover:text-amber-400 transition-all duration-300 group border border-slate-600"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span className="font-medium text-sm">
                      {user?.name || "Account"}
                    </span>
                  </Link>

                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="px-3 py-1.5 text-sm bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-400 transition-colors font-semibold shadow-lg hover:shadow-amber-500/25"
                    >
                      Admin
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 text-sm text-slate-300 hover:text-red-400 hover:bg-slate-800/60 rounded-lg transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/auth/login"
                    className="px-3 py-1.5 text-sm text-slate-300 hover:text-amber-400 transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-3 py-1.5 text-sm bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-400 transition-colors font-semibold shadow-lg hover:shadow-amber-500/25"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden p-1.5 text-slate-300 hover:text-amber-400 transition-colors"
              >
                <Bars3Icon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- Mobile Search Overlay --- */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md lg:hidden">
          <div className="flex items-center h-14 px-4 border-b border-slate-700">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                autoFocus
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 outline-none"
              />
              <MagnifyingGlassIcon className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="ml-3 px-3 py-2 text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* --- Mobile Menu Overlay --- */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-md lg:hidden">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between h-14 px-4 border-b border-slate-700">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center">
                  <span className="text-slate-900 font-bold text-sm">P</span>
                </div>
                <span className="text-lg font-light text-white">
                  Pottery
                  <span className="text-amber-400 font-medium">Store</span>
                </span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-1.5 text-slate-300 hover:text-amber-400 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-medium text-slate-200 hover:text-amber-400 py-3 px-4 rounded-xl hover:bg-slate-800/50 transition-all duration-300 border border-transparent hover:border-slate-700"
                >
                  {link.label}
                </Link>
              ))}

              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-semibold text-amber-300 hover:text-amber-400 py-3 px-4 rounded-xl hover:bg-slate-800/50 transition-all duration-300 border border-amber-500/40"
                >
                  Admin Dashboard
                </Link>
              )}
            </nav>

            {/* Auth Buttons (Mobile) */}
            <div className="p-4 border-t border-slate-700 space-y-3">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 rounded-xl border-2 border-slate-600 text-slate-200 hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300 font-medium"
                  >
                    {user?.name || "My Account"}
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-center px-4 py-3 rounded-xl bg-red-500/90 text-white hover:bg-red-400 transition-all duration-300 font-semibold shadow-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 rounded-xl border-2 border-slate-600 text-slate-200 hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300 font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 hover:from-amber-400 hover:to-amber-300 transition-all duration-300 font-semibold shadow-lg"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-14"></div>
    </>
  );
}
