// BestSellers.js - الأكثر مبيعاً
import SectionTitle from "@/components/shared/SectionTitle";
import ProductGrid from "@/components/products/ProductGrid";
import { bestSellers } from "../../../public/MockData.json";

export default function BestSellers() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32 bg-white">
      {/* Section Header with Decorative Elements */}
      <div className="relative">
        {/* Decorative Background */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-100/40 rounded-full blur-3xl"></div>
        
        <SectionTitle
          title="Best Selling Pottery"
          subtitle="Our most loved handcrafted pieces, cherished by customers worldwide."
          alignment="center"
        />

        {/* Decorative Elements */}
        <div className="flex justify-center gap-4 mt-8">
          <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mt-16">
        <ProductGrid products={bestSellers} />
      </div>

      {/* View All Products Button */}
      <div className="text-center mt-16">
        <button className="border-2 border-amber-500 text-amber-600 px-10 py-4 rounded-full hover:bg-amber-50 transition-all duration-300 font-semibold hover:border-amber-600 hover:scale-105">
          View All Products
        </button>
      </div>
    </section>
  );
}