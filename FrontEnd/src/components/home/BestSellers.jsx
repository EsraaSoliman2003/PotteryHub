// src/components/home/BestSellers.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import SectionTitle from "@/components/shared/SectionTitle";
import ProductGrid from "@/components/products/ProductGrid";
import productsApi from "@/api/productsApi";

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await productsApi.getBestSellers(4);
        setProducts(res.data || []);
      } catch (err) {
        console.error("Failed to load best sellers:", err);
        setError("Failed to load best sellers.");
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32 bg-white">
      {/* Section Header with Decorative Elements */}
      <div className="relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-100/40 rounded-full blur-3xl" />

        <SectionTitle
          title="Best Selling Pottery"
          subtitle="Our most loved handcrafted pieces, cherished by customers worldwide."
          alignment="center"
        />

        <div className="flex justify-center gap-4 mt-8">
          <div className="w-2 h-2 bg-amber-400 rounded-full" />
          <div className="w-2 h-2 bg-amber-400 rounded-full" />
          <div className="w-2 h-2 bg-amber-400 rounded-full" />
        </div>
      </div>

      {/* Loading / Error / Grid */}
      <div className="mt-16">
        {loading && (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && error && (
          <p className="text-center text-sm text-red-500">{error}</p>
        )}

        {!loading && !error && products.length > 0 && (
          <ProductGrid products={products} />
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center text-slate-500 text-sm">
            No best sellers yet.
          </p>
        )}
      </div>

      {/* View All Products Button */}
      <div className="text-center mt-16">
        <Link href="/products">
          <button className="border-2 border-amber-500 text-amber-600 px-10 py-4 rounded-full hover:bg-amber-50 transition-all duration-300 font-semibold hover:border-amber-600 hover:scale-105">
            View All Products
          </button>
        </Link>
      </div>
    </section>
  );
}
