export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-slate-900 font-bold text-lg">P</span>
              </div>
              <div>
                <span className="text-xl font-light text-white">Pottery</span>
                <span className="text-amber-400 font-medium">Store</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Discover exquisite handcrafted pottery pieces that bring elegance 
              and natural beauty to your space. Each piece tells a unique story 
              of craftsmanship and tradition.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/products" className="text-slate-400 hover:text-amber-400 transition-colors duration-200">
                  All Products
                </a>
              </li>
              <li>
                <a href="/categories" className="text-slate-400 hover:text-amber-400 transition-colors duration-200">
                  Categories
                </a>
              </li>
              <li>
                <a href="/about" className="text-slate-400 hover:text-amber-400 transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-slate-400 hover:text-amber-400 transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/shipping" className="text-slate-400 hover:text-amber-400 transition-colors duration-200">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="text-slate-400 hover:text-amber-400 transition-colors duration-200">
                  Returns
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-slate-400 hover:text-amber-400 transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-slate-400 hover:text-amber-400 transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Copyright */}
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} PotteryStore. All rights reserved.
            </p>
            
            {/* Legal Links */}
            <div className="flex gap-6 text-sm">
              <a href="/privacy" className="text-slate-400 hover:text-amber-400 transition-colors duration-200">
                Privacy
              </a>
              <a href="/terms" className="text-slate-400 hover:text-amber-400 transition-colors duration-200">
                Terms
              </a>
              <a href="/contact" className="text-slate-400 hover:text-amber-400 transition-colors duration-200">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}