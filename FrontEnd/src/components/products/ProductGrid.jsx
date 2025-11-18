// ProductGrid.js - التصميم الجديد
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onProductDeleted, onProductUpdated }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onDeleted={onProductDeleted}
          onUpdated={onProductUpdated}
        />
      ))}
    </div>
  );
}
