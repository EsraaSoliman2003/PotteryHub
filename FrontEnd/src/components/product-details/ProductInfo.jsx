// src/components/product-details/ProductInfo.jsx
import ProductActions from "./ProductActions";

export default function ProductInfo({ product }) {
  const price = Number(product.price || 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <span className="text-sm text-gray-500 uppercase tracking-wide">
          {product.category}
        </span>

        <h1 className="text-2xl font-light text-gray-900">
          {product.title}
        </h1>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          <span className="text-gray-500 text-sm">USD</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {product.description}
      </p>

      {/* Details */}
      <div className="space-y-3">
        {product.dimensions && (
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500">Dimensions</span>
            <span className="text-gray-900 font-medium">
              {product.dimensions}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500">In Stock</span>
          <span className="text-gray-900 font-medium">
            {product.stock > 0 ? product.stock : "Out of stock"}
          </span>
        </div>
      </div>

      {/* Actions */}
      <ProductActions product={product} />
    </div>
  );
}
