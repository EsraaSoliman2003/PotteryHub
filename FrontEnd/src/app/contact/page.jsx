import MainLayout from "@/components/layout/MainLayout";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50/30 to-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>Get In Touch</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-light text-slate-800 mb-6 font-serif">
              Contact <span className="text-amber-600">Us</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-200/30 p-8">
                <h2 className="text-2xl font-light text-slate-800 mb-6 font-serif">
                  Get in Touch
                </h2>
                
                {/* Contact Methods */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <EnvelopeIcon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">Email Us</h3>
                      <p className="text-slate-600">hello@potterystore.com</p>
                      <p className="text-sm text-slate-500 mt-1">We'll reply within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <PhoneIcon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">Call Us</h3>
                      <p className="text-slate-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-slate-500 mt-1">Mon-Fri from 8am to 6pm</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPinIcon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">Visit Us</h3>
                      <p className="text-slate-600">123 Artisan Street</p>
                      <p className="text-slate-600">Craftsville, CA 90210</p>
                      <p className="text-sm text-slate-500 mt-1">Showroom open by appointment</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-amber-200/30">
                  <h3 className="font-semibold text-slate-800 mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    {['Instagram', 'Facebook', 'Pinterest'].map((social) => (
                      <button
                        key={social}
                        className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-amber-100 hover:text-amber-700 transition-all duration-300 text-sm font-medium"
                      >
                        {social}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-amber-50/50 rounded-3xl border border-amber-200/50 p-8">
                <h3 className="text-xl font-light text-slate-800 mb-4 font-serif">Common Questions</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-1">Do you offer custom orders?</h4>
                    <p className="text-slate-600">Yes! We work with artisans to create custom pieces.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-1">What's your return policy?</h4>
                    <p className="text-slate-600">30-day return policy for all unused items.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-1">Do you ship internationally?</h4>
                    <p className="text-slate-600">Yes, we ship worldwide with tracking.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-amber-200/30 p-8">
              <h2 className="text-2xl font-light text-slate-800 mb-6 font-serif">
                Send us a Message
              </h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300 outline-none"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300 outline-none"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300 outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subject
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300 outline-none">
                    <option>General Inquiry</option>
                    <option>Custom Order</option>
                    <option>Wholesale</option>
                    <option>Shipping Question</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/50 transition-all duration-300 outline-none resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 text-white py-4 rounded-xl hover:bg-amber-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Send Message
                </button>
                
                <p className="text-center text-sm text-slate-500">
                  We'll get back to you within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}