// ProductGrid.js - التصميم الجديد
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <div className="
      grid gap-6 lg:gap-8
      grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
    ">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}