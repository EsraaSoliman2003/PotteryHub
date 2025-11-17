// LoginPage.js - التصميم الممتلئ
import MainLayout from "@/components/layout/MainLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100/30">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Visual Section */}
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

        {/* Right Side - Form Section */}
        <div className="flex items-center justify-center p-8 mt-12">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
