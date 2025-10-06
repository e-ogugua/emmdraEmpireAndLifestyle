'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import HeroCarousel from '../components/HeroCarousel'
import { trackPageView } from '@/lib/analytics'

export default function Home() {
  useEffect(() => {
    // Track homepage view
    trackPageView({
      page_type: 'home',
      page_title: 'Emmdra Empire Homepage'
    })
  }, [])

  return (
    <div className="relative">
      {/* Hero Carousel Section - Standalone */}
      <section className="relative">
        <HeroCarousel />
      </section>

      {/* Hero Text Section - Enhanced Introduction */}
      <section className="relative z-10 py-16 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">Emmdra Empire</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-6 leading-relaxed">
              Your complete lifestyle destination where <strong className="text-gray-800">Fashion</strong>, <strong className="text-gray-800">Beauty</strong>, <strong className="text-gray-800">DIY</strong>, <strong className="text-gray-800">Lifestyle</strong>, and <strong className="text-gray-800">Family</strong> come together in perfect harmony.
            </p>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
              From trendy outfits that make you shine, to beauty secrets that glow from within, creative DIY projects that inspire, lifestyle tips that transform, and family moments that last forever — we have got everything to make your world more beautiful.
            </p>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                { name: 'Fashion', link: '/shop', color: 'bg-pink-100 text-pink-800' },
                { name: 'Beauty', link: '/shop', color: 'bg-purple-100 text-purple-800' },
                { name: 'DIY', link: '/diy', color: 'bg-green-100 text-green-800' },
                { name: 'Lifestyle', link: '/blog', color: 'bg-blue-100 text-blue-800' },
                { name: 'Family', link: '/about', color: 'bg-orange-100 text-orange-800' }
              ].map((category) => (
                <Link
                  key={category.name}
                  href={category.link}
                  className={`${category.color} px-4 py-2 rounded-full font-medium text-sm hover:shadow-md transition-all duration-200 hover:scale-105`}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🛍️ Shop Our Collection
              </Link>
              <Link
                href="/diy"
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                ✨ Start Creating
              </Link>
              <Link
                href="/blog"
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                📖 Read Stories
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Trusted by families across Nigeria</p>
              <div className="flex justify-center items-center gap-8 text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Premium Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Expert Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured <span className="text-blue-600">Products</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium fashion, beauty, and lifestyle essentials
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Product 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/images/PremiumLeatherHandBags.png"
                  alt="Premium Leather Handbag"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold">Featured</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">Premium Leather Handbag</h3>
                <p className="text-gray-600 text-sm mb-3">Elegant genuine leather handbag with multiple compartments</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-blue-600">₦45,000</span>
                  <Link href="/shop" className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700">
                    Shop
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/images/NaturalHairOil.png"
                  alt="Natural Hair Oil"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">Natural Hair Oil</h3>
                <p className="text-gray-600 text-sm mb-3">Organic hair treatment with coconut and jojoba oils</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-blue-600">₦12,000</span>
                  <Link href="/shop" className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm hover:bg-purple-700">
                    Shop
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/images/AnkaraPrintBlouses.png"
                  alt="Ankara Print Blouse"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">Ankara Print Blouse</h3>
                <p className="text-gray-600 text-sm mb-3">Traditional meets modern with contemporary cut</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-blue-600">₦15,000</span>
                  <Link href="/shop" className="bg-pink-600 text-white px-3 py-1 rounded-full text-sm hover:bg-pink-700">
                    Shop
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 4 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/images/StatementEarrings.png"
                  alt="Statement Earrings"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">Statement Earrings</h3>
                <p className="text-gray-600 text-sm mb-3">Bold and beautiful earrings that add glamour</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-blue-600">₦8,500</span>
                  <Link href="/shop" className="bg-green-600 text-white px-3 py-1 rounded-full text-sm hover:bg-green-700">
                    Shop
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/shop"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🛍️ View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Featured DIY Projects Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured <span className="text-green-600">DIY Projects</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unleash your creativity with our step-by-step tutorials and craft ideas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* DIY 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/images/HandmadeBeadedNecklace.png"
                  alt="Handmade Beaded Necklace"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">Popular</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">Handmade Beaded Necklace</h3>
                <p className="text-gray-600 text-sm mb-3">Create beautiful jewelry with step-by-step guidance</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-medium text-sm">Beginner • 45 min</span>
                  <Link href="/diy/handmade-beaded-necklace" className="bg-green-600 text-white px-3 py-1 rounded-full text-sm hover:bg-green-700">
                    Try It
                  </Link>
                </div>
              </div>
            </div>

            {/* DIY 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/images/NaturalHairTreatmentMask.png"
                  alt="Natural Hair Treatment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">Natural Hair Treatment</h3>
                <p className="text-gray-600 text-sm mb-3">DIY hair mask using natural ingredients</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-medium text-sm">Beginner • 30 min</span>
                  <Link href="/diy/natural-hair-treatment-mask" className="bg-green-600 text-white px-3 py-1 rounded-full text-sm hover:bg-green-700">
                    Try It
                  </Link>
                </div>
              </div>
            </div>

            {/* DIY 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/images/DIYAnkaraThrowPillow.png"
                  alt="DIY Ankara Pillow"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">DIY Ankara Throw Pillow</h3>
                <p className="text-gray-600 text-sm mb-3">Create beautiful home decor with Ankara fabric</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-medium text-sm">Intermediate • 2 hrs</span>
                  <Link href="/diy/diy-ankara-throw-pillow" className="bg-green-600 text-white px-3 py-1 rounded-full text-sm hover:bg-green-700">
                    Try It
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/diy"
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              ✨ Explore All DIY Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Workshops Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured <span className="text-purple-600">Workshops</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our hands-on workshops and learn from industry experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Workshop 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/images/EmmdraFashionDesignAndAccessories.png"
                  alt="Fashion Styling Workshop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold">Upcoming</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">Fashion Styling Masterclass</h3>
                <p className="text-gray-600 text-sm mb-3">Learn professional styling techniques</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Feb 15, 2024
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    3 hours
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    Enugu Studio
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-lg text-purple-600">₦25,000</span>
                  <Link href="/workshops/fashion-styling-masterclass" className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm hover:bg-purple-700">
                    Register
                  </Link>
                </div>
              </div>
            </div>

            {/* Workshop 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/images/DIYJewelryMakingWorkshop.png"
                  alt="Jewelry Making Workshop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">DIY Jewelry Making</h3>
                <p className="text-gray-600 text-sm mb-3">Create beautiful handmade jewelry</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Feb 22, 2024
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    4 hours
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    Workshop Space
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-lg text-purple-600">₦15,000</span>
                  <Link href="/workshops/diy-jewelry-making" className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm hover:bg-purple-700">
                    Register
                  </Link>
                </div>
              </div>
            </div>

            {/* Workshop 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/images/NaturalBeautyWorkshop.png"
                  alt="Natural Beauty Workshop"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2">Natural Beauty Workshop</h3>
                <p className="text-gray-600 text-sm mb-3">Create your own natural beauty products</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Mar 1, 2024
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    2.5 hours
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    Beauty Hub
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-lg text-purple-600">₦18,000</span>
                  <Link href="/workshops/natural-beauty-workshop" className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm hover:bg-purple-700">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/workshops"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🎓 View All Workshops
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured <span className="text-indigo-600">Stories</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Read inspiring stories, fashion tips, and lifestyle advice from our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Blog 1 */}
            <article className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/images/5EssentialFashionTipsforNigerianWeather.png"
                  alt="Fashion Tips for Nigerian Weather"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-indigo-500 text-white px-2 py-1 rounded-full text-xs font-semibold">Fashion</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">5 Essential Fashion Tips for Nigerian Weather</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">Learn how to dress comfortably and stylishly in Nigeria&apos;s tropical climate...</p>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-600 font-medium text-sm">Fashion Tips</span>
                  <Link href="/blog/fashion-tips-nigerian-weather" className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm hover:bg-indigo-700">
                    Read
                  </Link>
                </div>
              </div>
            </article>

            {/* Blog 2 */}
            <article className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/images/DIYNaturalBeautyRemediesatHome.png"
                  alt="DIY Natural Beauty Remedies"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">DIY Natural Beauty Remedies at Home</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">Discover simple, effective beauty treatments using kitchen ingredients...</p>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-600 font-medium text-sm">Beauty</span>
                  <Link href="/blog/diy-natural-beauty-remedies" className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm hover:bg-indigo-700">
                    Read
                  </Link>
                </div>
              </div>
            </article>

            {/* Blog 3 */}
            <article className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="/images/BuildingaCapsuleWardrobeforBusyProfessionals.png"
                  alt="Capsule Wardrobe Guide"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">Building a Capsule Wardrobe for Busy Professionals</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">Streamline your morning routine with a carefully curated professional wardrobe...</p>
                <div className="flex items-center justify-between">
                  <span className="text-indigo-600 font-medium text-sm">Lifestyle</span>
                  <Link href="/blog/capsule-wardrobe-professionals" className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm hover:bg-indigo-700">
                    Read
                  </Link>
                </div>
              </div>
            </article>
          </div>

          <div className="text-center">
            <Link
              href="/blog"
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-indigo-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              📖 Read More Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
