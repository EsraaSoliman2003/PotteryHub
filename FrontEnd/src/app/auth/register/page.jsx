// RegisterPage.js - التصميم الممتلئ
import MainLayout from "@/components/layout/MainLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100/30">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Side - Visual Section */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <div className="max-w-md text-center">
            <div className="text-6xl mb-8">🏺</div>
            <h1 className="text-4xl font-light mb-6 font-serif">
              Join Our <span className="font-medium">Community</span>
            </h1>
            <p className="text-amber-100 text-lg leading-relaxed">
              Create your account and start exploring our exclusive collection
              of handcrafted pottery.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mt-12">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                  🎁
                </div>
                <span>Welcome gift for new members</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                  ⭐
                </div>
                <span>Earn loyalty points on every purchase</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                  📧
                </div>
                <span>Exclusive offers and updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
