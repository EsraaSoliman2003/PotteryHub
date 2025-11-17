// ProductInfo.js - التصميم البسيط
import ProductActions from "./ProductActions";

export default function ProductInfo({ productId }) {
  const product = {
    id: productId,
    title: `Ceramic Vase ${productId}`,
    price: 99.99,
    description: "Beautiful handcrafted ceramic vase that adds elegance to any space. Made with natural clay and finished with food-safe glaze.",
    category: "Home Decor",
    material: "Natural Clay",
    dimensions: '12" H × 8" W'
  };

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
            ${product.price.toFixed(2)}
          </span>
          <span className="text-gray-500 text-sm">USD</span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <p className="text-gray-600 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Details */}
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500">Material</span>
          <span className="text-gray-900 font-medium">{product.material}</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <span className="text-gray-500">Dimensions</span>
          <span className="text-gray-900 font-medium">{product.dimensions}</span>
        </div>
      </div>

      {/* Actions */}
      <ProductActions product={product} />
    </div>
  );
}