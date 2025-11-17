// ProductFilters.js - التصميم الجديد
"use client";

import { useState } from "react";
import { FunnelIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

const FILTER_BUTTONS = [
  { 
    key: "category", 
    label: "Category", 
    options: ["All", "Furniture", "Electronics", "Fashion", "Home Decor"] 
  },
  { 
    key: "price", 
    label: "Price Range", 
    options: ["Any", "< $100", "$100 - $150", "> $150"] 
  },
];

const SORT_OPTIONS = [
  { value: "popular", label: "Most Popular" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
];

export default function ProductFilters({ filters, onFilterChange, productCount }) {
  const [sort, setSort] = useState("popular");
  const [openKey, setOpenKey] = useState(null);

  const handleSortChange = (value) => {
    setSort(value);
    onFilterChange?.((prev) => ({ ...prev, sort: value }));
  };

  const handleFilterChange = (key, value) => {
    onFilterChange?.((prev) => ({ 
      ...prev, 
      [key]: value === "Any" || value === "All" ? null : value 
    }));
    setOpenKey(null);
  };

  return (
    <div className="mb-8 p-6 bg-amber-50/50 rounded-2xl border border-amber-200/50">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Filter Section */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-amber-700">
            <FunnelIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
          </div>

          {FILTER_BUTTONS.map((filter) => (
            <div key={filter.key} className="relative">
              <button
                type="button"
                onClick={() =>
                  setOpenKey((prev) =>
                    prev === filter.key ? null : filter.key
                  )
                }
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-amber-200 text-amber-700 hover:bg-amber-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <span className="text-sm font-medium">{filter.label}</span>
                <span className="text-amber-500 text-xs">▼</span>
              </button>
              
              {openKey === filter.key && (
                <div className="absolute left-0 z-20 mt-2 w-48 rounded-2xl bg-white shadow-xl border border-amber-200/50 py-3 backdrop-blur-sm">
                  {filter.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleFilterChange(filter.key, opt)}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-amber-50 transition-colors flex items-center justify-between"
                    >
                      <span>{opt}</span>
                      {opt === "All" || opt === "Any" ? (
                        <div className="w-2 h-2 rounded-full bg-amber-200"></div>
                      ) : null}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sort Section */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-amber-700">
            <AdjustmentsHorizontalIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Sort by</span>
          </div>
          
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenKey((prev) => (prev === "sort" ? null : "sort"))}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-amber-200 text-amber-700 hover:bg-amber-50 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span className="text-sm font-medium">
                {SORT_OPTIONS.find(opt => opt.value === sort)?.label}
              </span>
              <span className="text-amber-500 text-xs">▼</span>
            </button>
            
            {openKey === "sort" && (
              <div className="absolute right-0 z-20 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-amber-200/50 py-3 backdrop-blur-sm">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      handleSortChange(option.value);
                      setOpenKey(null);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                      sort === option.value
                        ? "bg-amber-50 text-amber-700 font-medium"
                        : "text-slate-700 hover:bg-amber-50"
                    }`}
                  >
                    <span>{option.label}</span>
                    {sort === option.value && (
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(filters).map(([key, value]) => {
          if (!value || key === 'sort') return null;
          
          const filterLabel = FILTER_BUTTONS.find(f => f.key === key)?.label;
          return (
            <div
              key={key}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm"
            >
              <span>{filterLabel}: {value}</span>
              <button
                onClick={() => handleFilterChange(key, key === 'category' ? 'All' : 'Any')}
                className="w-4 h-4 rounded-full bg-amber-200 hover:bg-amber-300 transition-colors flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}