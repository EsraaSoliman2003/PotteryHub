// CategoriesSection.js - قسم فئات الفخار
import SectionTitle from "@/components/shared/SectionTitle";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const categories = [
  {
    name: "Dinnerware",
    description: "Handcrafted plates, bowls & serving sets.",
    count: "24 products",
    icon: "🍽️",
  },
  {
    name: "Vases",
    description: "Elegant vessels for flowers and decoration.",
    count: "18 products",
    icon: "🏺",
  },
  {
    name: "Mugs & Cups",
    description: "Unique drinking vessels with character.",
    count: "28 products",
    icon: "☕",
  },
];

export default function CategoriesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
      <SectionTitle
        title="Explore Our Collections"
        subtitle="Discover handcrafted pottery pieces for every aspect of your life."
        alignment="center"
      />

      <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-16">
        {categories.map((category, index) => (
          <div
            key={category.name}
            className="group relative bg-white rounded-3xl border border-amber-200/50 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-amber-300/70 overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-amber-100/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>

            {/* Category Icon */}
            <div className="text-4xl mb-4 transform transition-transform duration-300">
              {category.icon}
            </div>

            {/* Category Content */}
            <div className="relative z-10">
              <h3 className="font-serif text-2xl font-medium text-slate-800 mb-3 group-hover:text-amber-700 transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                {category.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-amber-600 uppercase tracking-wide">
                  {category.count}
                </span>
                <div className="flex items-center gap-1 text-amber-600 group-hover:gap-2 transition-all duration-300">
                  <span className="text-sm font-medium">Explore</span>
                  <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-amber-200/50 transition-all duration-300"></div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <button className="bg-amber-500 text-white px-8 py-4 rounded-full hover:bg-amber-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 border-2 border-amber-400/50">
          View All Categories
        </button>
      </div>
    </section>
  );
}
