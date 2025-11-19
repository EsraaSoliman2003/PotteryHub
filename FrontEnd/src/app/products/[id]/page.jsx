// src/app/products/[id]/page.jsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProductImagesGallery from "@/components/product-details/ProductImagesGallery";
import ProductInfo from "@/components/product-details/ProductInfo";
import productsApi from "@/api/productsApi";
import Loader from "@/components/shared/Loader";

export default function ProductDetailsPage() {
  const { id } = useParams();   // ناخد id من ال URL

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // لو لسه مفيش id ما تعملش request

    async function fetchProduct() {
      try {
        const res = await productsApi.getById(id);
        setProduct(res.data);
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <div className="text-center py-20">Product Not Found</div>;

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8 p-8">
              {/* الصور الحقيقية من ال API */}
              <ProductImagesGallery product={product} />

              {/* معلومات المنتج الحقيقية من ال API */}
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
