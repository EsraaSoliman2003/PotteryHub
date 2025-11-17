import MainLayout from "@/components/layout/MainLayout";

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50/30 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>Our Story</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-slate-800 mb-6 font-serif">
              About Our <span className="text-amber-600">Pottery Store</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Where traditional craftsmanship meets modern elegance in every unique piece.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-200/30 p-8 lg:p-12 mb-12">
            <div className="prose prose-lg max-w-none">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                
                {/* Text Content */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-light text-slate-800 font-serif">
                    Handcrafted with Passion
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    Welcome to our pottery store, a curated collection of exquisite handcrafted pieces 
                    that bring beauty and tradition into your everyday life. Each item in our collection 
                    tells a story of skilled craftsmanship and artistic vision.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    Our journey began with a simple belief: that functional art should be accessible to 
                    everyone. We work directly with master artisans who have dedicated their lives to 
                    perfecting the ancient art of pottery.
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-4 mt-8">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      </div>
                      <span className="text-slate-700 font-medium">100% Handcrafted Pieces</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      </div>
                      <span className="text-slate-700 font-medium">Eco-Friendly Materials</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      </div>
                      <span className="text-slate-700 font-medium">Traditional Techniques</span>
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-200/50">
                  <h3 className="text-lg font-semibold text-slate-800 mb-6 text-center">
                    Our Impact
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-white rounded-xl border border-amber-200/30">
                      <div className="text-2xl font-bold text-amber-600 mb-1">500+</div>
                      <div className="text-sm text-slate-600">Unique Pieces</div>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-amber-200/30">
                      <div className="text-2xl font-bold text-amber-600 mb-1">50+</div>
                      <div className="text-sm text-slate-600">Master Artisans</div>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-amber-200/30">
                      <div className="text-2xl font-bold text-amber-600 mb-1">100%</div>
                      <div className="text-sm text-slate-600">Handmade</div>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-amber-200/30">
                      <div className="text-2xl font-bold text-amber-600 mb-1">5+</div>
                      <div className="text-sm text-slate-600">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mission Section */}
              <div className="mt-12 pt-8 border-t border-amber-200/30">
                <h2 className="text-2xl font-light text-slate-800 mb-6 font-serif text-center">
                  Our Mission
                </h2>
                <p className="text-slate-600 leading-relaxed text-center max-w-3xl mx-auto">
                  We are dedicated to preserving traditional pottery techniques while bringing 
                  contemporary design sensibilities to create pieces that are both functional 
                  and beautiful. Every item in our store is carefully selected to ensure it 
                  meets our standards of quality, craftsmanship, and aesthetic appeal.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-8 text-white">
              <h2 className="text-2xl font-light mb-4 font-serif">
                Ready to Explore?
              </h2>
              <p className="text-amber-100 mb-6 max-w-md mx-auto">
                Discover our unique collection of handcrafted pottery pieces.
              </p>
              <button className="bg-white text-amber-600 px-8 py-3 rounded-xl hover:bg-amber-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105">
                View Our Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}