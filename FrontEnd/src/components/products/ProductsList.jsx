"use client";

import { useEffect, useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";
import ProductFilters from "./ProductFilters";
import EmptyState from "@/components/shared/EmptyState";
import productsApi from "@/api/productsApi";
import useAuthStore from "@/store/useAuthStore";
import ProductAddModal from "./ProductAddModal";

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-amber-200 text-amber-600 hover:bg-amber-50 disabled:opacity-30"
      >
        ←
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          className={`w-10 h-10 rounded-xl border ${
            page === i + 1
              ? "bg-amber-500 text-white border-amber-500 shadow-lg"
              : "border-amber-200 text-amber-600 hover:bg-amber-50"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-amber-200 text-amber-600 hover:bg-amber-50 disabled:opacity-30"
      >
        →
      </button>
    </div>
  );
}

export default function ProductsList() {
  const [filters, setFilters] = useState({ sort: "popular" });
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const { user } = useAuthStore();
  const isAdmin = user?.role === "Admin";

  const pageSize = 8;

  // ======================= API Load ==========================
  useEffect(() => {
    (async () => {
      try {
        const res = await productsApi.getAll();
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ======================= FILTERING ==========================
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (filters.category) {
      list = list.filter((p) => p.category === filters.category);
    }

    if (filters.price === "< $100") {
      list = list.filter((p) => p.price < 100);
    } else if (filters.price === "$100 - $150") {
      list = list.filter((p) => p.price >= 100 && p.price <= 150);
    } else if (filters.price === "> $150") {
      list = list.filter((p) => p.price > 150);
    }

    if (filters.sort === "price_low") {
      list.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price_high") {
      list.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "newest") {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return list;
  }, [filters, products]);

  // ======================= PAGINATION ==========================
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginated = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  // ======================= Delete & Update ==========================
  const handleDeleted = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdated = (updated) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const handleAdded = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div>
      {/* Admin Add Product Button */}
      {isAdmin && (
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsAddOpen(true)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold shadow"
          >
            ➕ Add Product
          </button>
        </div>
      )}

      <ProductFilters filters={filters} onFilterChange={setFilters} productCount={filteredProducts.length} />

      {paginated.length ? (
        <>
          <ProductGrid
            products={paginated}
            onProductDeleted={handleDeleted}
            onProductUpdated={handleUpdated}
          />
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      ) : (
        <EmptyState
          title="No products found"
          text="Try adjusting your filters to see more results."
          icon="🛒"
        />
      )}

      {/* ADD PRODUCT MODAL */}
      <ProductAddModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdded={handleAdded}
      />
    </div>
  );
}
