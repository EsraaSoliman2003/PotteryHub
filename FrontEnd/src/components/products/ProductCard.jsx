// ProductCard.js - بطاقة المنتج محسنة
"use client";

import { useState } from "react";
import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }) {
  const [inCart, setInCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleCartClick = (e) => {
    e.stopPropagation();
    setInCart((v) => !v);
  };

  // توليد نجوم التقييم
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} className="w-4 h-4 text-amber-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<StarIcon key="half" className="w-4 h-4 text-amber-400 fill-current" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarIcon key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        relative rounded-3xl overflow-hidden border border-amber-200/50 shadow-lg
        bg-white cursor-pointer transition-all duration-500
        hover:shadow-2xl hover:border-amber-300/70
        flex flex-col h-full
      "
    >
      {/* Product Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100/30">
        <img
          src={product.img}
          alt={product.title}
          className={`
            w-full h-full object-cover transition-transform duration-700
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
        />
        
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-amber-700 text-xs font-medium uppercase tracking-wide">
            {product.category}
          </span>
        </div>

        {/* Hover Quick View */}
        <div className={`
          absolute bottom-4 left-1/2 transform -translate-x-1/2
          transition-all duration-300
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}>
          <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-amber-700 text-sm font-medium">
            Quick View
          </span>
        </div>
      </div>

      {/* Product Content */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Product Title and Description */}
        <div className="mb-4 flex-1">
          <h3 className="font-serif text-xl font-medium text-slate-800 mb-2 line-clamp-1">
            {product.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
            {product.desc}
          </p>
        </div>

        {/* Rating and Orders */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {renderStars(product.rate)}
            </div>
            <span className="text-sm text-slate-500">({product.rate})</span>
          </div>
          <span className="text-sm text-slate-500">{product.orders} orders</span>
        </div>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between pt-4 border-t border-amber-100">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-amber-600">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-slate-500">
              {product.quantity} in stock
            </span>
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleCartClick}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${
                inCart
                  ? "bg-amber-100 text-amber-700 border border-amber-200"
                  : "bg-amber-500 text-white hover:bg-amber-600"
              }
            `}
          >
            {inCart ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}