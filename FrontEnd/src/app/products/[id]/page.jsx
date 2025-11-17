// ProductDetailsPage.js - النسخة الأنيقة
import MainLayout from "@/components/layout/MainLayout";
import ProductImagesGallery from "@/components/product-details/ProductImagesGallery";
import ProductInfo from "@/components/product-details/ProductInfo";

export default function ProductDetailsPage({ params }) {
  const { id } = params;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 p-8">
              <ProductImagesGallery productId={id} />
              <ProductInfo productId={id} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}