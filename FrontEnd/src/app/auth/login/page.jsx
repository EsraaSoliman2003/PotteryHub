// LoginPage.js - التصميم الممتلئ
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100/30">
      <Link
        href="/"
        className="
          absolute top-6 left-6 z-50
          w-12 h-12
          flex items-center justify-center
          rounded-full
          bg-slate-900/80 
          backdrop-blur-md
          border border-slate-700/50
          shadow-md shadow-black/30
          transition-all duration-300 ease-out
          hover:bg-slate-800/90
          hover:shadow-lg hover:shadow-black/40
        "
      >
        <ArrowLeftIcon className="w-6 h-6 text-amber-300" />
      </Link>

      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Section */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <div className="max-w-md text-center">
            <div className="text-6xl mb-8">🎨</div>
            <h1 className="text-4xl font-light mb-6 font-serif">
              Welcome to <span className="font-medium">PotteryStore</span>
            </h1>
            <p className="text-amber-100 text-lg leading-relaxed">
              Discover beautiful handcrafted pottery pieces that bring elegance
              and natural beauty to your space.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="text-center">
                <div className="text-2xl mb-2">✨</div>
                <div className="text-sm">Handcrafted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🚚</div>
                <div className="text-sm">Free Shipping</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔒</div>
                <div className="text-sm">Secure</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⭐</div>
                <div className="text-sm">Premium Quality</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center p-8 mt-12">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
