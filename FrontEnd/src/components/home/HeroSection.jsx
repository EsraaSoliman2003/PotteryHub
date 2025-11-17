import { SparklesIcon } from "@heroicons/react/24/outline";

export default function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat min-h-screen border-b overflow-hidden"
      style={{
        backgroundImage: "url('/bg-pottery.png')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-amber-900/20"></div>

      {/* Decorations */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 min-h-screen grid gap-6 md:grid-cols-2 items-center">
        <div className="text-white flex flex-col items-center md:items-start justify-center space-y-6">
          {/* Badge */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
            <SparklesIcon className="h-4 w-4 text-amber-200" />
            <span className="text-xs font-medium text-amber-100">
              Handcrafted Excellence
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-2 leading-tight font-serif italic tracking-tight">
            Do you love <span className="text-amber-100">pottery</span>?
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg leading-relaxed max-w-xl text-center md:text-left text-gray-100 opacity-95 font-light">
            Where{" "}
            <span className="text-amber-200 font-medium">
              traditional craftsmanship
            </span>{" "}
            meets modern elegance in every unique piece.
          </p>

          {/* Search Box */}
          <div className="relative w-full max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, categories..."
                className="w-full px-5 py-3 pl-11 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/30 transition-all duration-300"
              />
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-900 px-6 py-3.5 rounded-full hover:bg-gray-100 transition-colors duration-300 text-sm font-medium">
                Search
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-6 mt-4 text-white/90 justify-center md:justify-start">
            <div className="text-center md:text-left group cursor-pointer">
              <div className="text-2xl font-serif font-bold text-amber-200 group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-xs opacity-80 mt-1">Unique Pieces</div>
            </div>

            <div className="text-center md:text-left group cursor-pointer">
              <div className="text-2xl font-serif font-bold text-amber-200 group-hover:scale-110 transition-transform duration-300">
                50+
              </div>
              <div className="text-xs opacity-80 mt-1">Master Artisans</div>
            </div>

            <div className="text-center md:text-left group cursor-pointer">
              <div className="text-2xl font-serif font-bold text-amber-200 group-hover:scale-110 transition-transform duration-300">
                100%
              </div>
              <div className="text-xs opacity-80 mt-1">Handcrafted</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 mt-6">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-full hover:bg-amber-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl border-2 border-white text-sm">
              Shop Collection
            </button>
            <button className="border-2 border-white/60 text-white px-6 py-3 rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300 font-semibold text-sm">
              Meet Artisans
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-white/60 text-xs mb-1">Scroll to explore</span>
          <div className="w-5 h-8 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2.5 bg-amber-200 rounded-full mt-1.5"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
