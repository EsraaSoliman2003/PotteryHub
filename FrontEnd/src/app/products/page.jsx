// ProductsPage.js - التصميم الجديد
import MainLayout from "@/components/layout/MainLayout";
import ProductsList from "@/components/products/ProductsList";

export default function ProductsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50/40 to-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-light text-slate-800 mb-4 font-serif">
              Our Collection
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover our carefully curated selection of handcrafted pieces, 
              each telling a unique story of craftsmanship and beauty.
            </p>
          </div>

          {/* Products Container */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-200/30 p-6 lg:p-8">
            <ProductsList />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}