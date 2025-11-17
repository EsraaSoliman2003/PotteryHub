// ProductImagesGallery.js - النسخة الأنيقة
"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function ProductImagesGallery({ productId }) {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    "https://i.pinimg.com/1200x/fc/c9/2a/fcc92a030e4dbccd5677715b263748db.jpg",
    "https://i.pinimg.com/1200x/fc/c9/2a/fcc92a030e4dbccd5677715b263748db.jpg",
    "https://i.pinimg.com/1200x/fc/c9/2a/fcc92a030e4dbccd5677715b263748db.jpg",
    "https://i.pinimg.com/1200x/fc/c9/2a/fcc92a030e4dbccd5677715b263748db.jpg"
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* Main Image with Navigation */}
      <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={images[selectedImage]}
          alt={`Product ${productId}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-700" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === index
                ? "border-gray-900"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}