// ProductsList.js - التصميم الجديد
"use client";

import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";
import ProductFilters from "./ProductFilters";
import EmptyState from "@/components/shared/EmptyState";
import { products as MockData } from "../../../public/MockData.json";

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = page - 1; i <= page + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-amber-200 text-amber-600 hover:bg-amber-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        ←
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((p, index) => (
        <button
          key={index}
          onClick={() => typeof p === 'number' && onChange(p)}
          className={`w-10 h-10 flex items-center justify-center rounded-xl border text-sm font-medium transition-all ${
            p === page
              ? "bg-amber-500 text-white border-amber-500 shadow-lg"
              : typeof p === 'number'
              ? "border-amber-200 text-amber-600 hover:bg-amber-50"
              : "border-transparent text-amber-400 cursor-default"
          }`}
        >
          {p}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-amber-200 text-amber-600 hover:bg-amber-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        →
      </button>
    </div>
  );
}

export default function ProductsList() {
  const [filters, setFilters] = useState({ sort: "popular" });
  const [page, setPage] = useState(1);

  const pageSize = 8;

  const filteredProducts = useMemo(() => {
    let products = [...MockData];

    // Filter by category
    if (filters.category && filters.category !== "All") {
      products = products.filter((p) => p.category === filters.category);
    }

    // Filter by price
    if (filters.price === "< $100") {
      products = products.filter((p) => p.price < 100);
    } else if (filters.price === "$100 - $150") {
      products = products.filter((p) => p.price >= 100 && p.price <= 150);
    } else if (filters.price === "> $150") {
      products = products.filter((p) => p.price > 150);
    }

    // Sort
    if (filters.sort === "price_low") {
      products.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price_high") {
      products.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "popular") {
      products.sort((a, b) => b.orders - a.orders);
    }

    return products;
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div>
      {/* Results Count */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-slate-600">
          Showing <span className="font-semibold text-amber-600">{paginatedProducts.length}</span> of{" "}
          <span className="font-semibold text-amber-600">{filteredProducts.length}</span> products
        </div>
      </div>

      <ProductFilters 
  filters={filters}
  onFilterChange={setFilters} 
  productCount={filteredProducts.length}
/>

      
      {paginatedProducts.length ? (
        <>
          <ProductGrid products={paginatedProducts} />
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      ) : (
        <EmptyState 
          title="No products found" 
          text="Try adjusting your filters to see more results."
          icon="🔍"
        />
      )}
    </div>
  );
}