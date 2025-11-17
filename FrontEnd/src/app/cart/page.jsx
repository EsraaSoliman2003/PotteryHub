// CartPage.js - بدون تغيير (يبقى server component)
import MainLayout from "@/components/layout/MainLayout";
import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";

const DEMO_CART = [
  {
    id: "p1",
    name: "Handcrafted Ceramic Vase",
    price: 99.99,
    image: "https://i.pinimg.com/1200x/fc/c9/2a/fcc92a030e4dbccd5677715b263748db.jpg",
    category: "Ceramics",
    quantity: 1,
  },
  {
    id: "p2",
    name: "Artisan Coffee Mug Set",
    price: 45.00,
    image: "https://i.pinimg.com/1200x/fc/c9/2a/fcc92a030e4dbccd5677715b263748db.jpg",
    category: "Dinnerware",
    quantity: 2,
  },
];

export default function CartPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50/30 to-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-light text-slate-800 mb-4 font-serif">
              Shopping <span className="text-amber-600">Cart</span>
            </h1>
            <p className="text-lg text-slate-600">
              Review your items and proceed to checkout
            </p>
          </div>

          {/* Cart Content */}
          {DEMO_CART.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <CartList />
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <CartSummary items={DEMO_CART} />
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🛒</div>
              <h2 className="text-2xl font-light text-slate-800 mb-4">Your cart is empty</h2>
              <p className="text-slate-600 mb-8">Add some beautiful pottery to your cart</p>
              <button className="bg-amber-500 text-white px-8 py-3 rounded-xl hover:bg-amber-600 transition-colors font-semibold">
                Continue Shopping
              </button>
            </div>
          )}

          {/* Continue Shopping */}
          <div className="text-center mt-12">
            <button className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2 mx-auto">
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}