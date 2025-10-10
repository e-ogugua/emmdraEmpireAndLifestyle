'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
      <section className="relative z-10 py-16 px-3 sm:px-4 bg-gradient-to-br from-orange-100 via-yellow-50 to-green-100">
        <div className="container mx-auto text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="heading-1 text-gray-900 mb-6 sm:mb-8 font-bold drop-shadow-sm">
              Welcome to <span className="text-brand-burnt-orange font-black drop-shadow-md">Emmdra</span> Empire
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-800 max-w-4xl mx-auto mb-6 sm:mb-8 drop-shadow-sm leading-relaxed">
              Your complete lifestyle destination where <strong className="text-brand-burnt-orange font-bold">Fashion</strong>, <strong className="text-brand-vibrant-green font-bold">Beauty</strong>, <strong className="text-brand-dark-teal font-bold">DIY</strong>, <strong className="text-brand-burnt-orange font-bold">Lifestyle</strong>, and <strong className="text-brand-vibrant-green font-bold">Family</strong> come together in perfect harmony.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-800 max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16 drop-shadow-sm leading-relaxed">
              From trendy outfits that make you shine, to beauty secrets that glow from within, creative DIY projects that inspire, lifestyle tips that transform, and family moments that last forever — we have got everything to make your world more beautiful.
            </p>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-10 sm:mb-12">
              {[
                { name: 'Fashion', link: '/shop', color: 'bg-brand-burnt-orange text-white hover:bg-brand-burnt-orange-light border-2 border-brand-burnt-orange/50 shadow-lg hover:shadow-xl hover:scale-105 font-bold' },
                { name: 'Beauty', link: '/shop', color: 'bg-brand-vibrant-green text-white hover:bg-brand-vibrant-green-light border-2 border-brand-vibrant-green/50 shadow-lg hover:shadow-xl hover:scale-105 font-bold' },
                { name: 'DIY', link: '/diy', color: 'bg-brand-dark-teal text-white hover:bg-brand-dark-teal-light border-2 border-brand-dark-teal/50 shadow-lg hover:shadow-xl hover:scale-105 font-bold' },
                { name: 'Lifestyle', link: '/blog', color: 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 border-2 border-yellow-600/70 shadow-lg hover:shadow-xl hover:scale-105 font-bold' },
                { name: 'Family', link: '/about', color: 'bg-purple-500 text-white hover:bg-purple-400 border-2 border-purple-600/60 shadow-lg hover:shadow-xl hover:scale-105 font-bold' }
              ].map((category) => (
                <Link
                  key={category.name}
                  href={category.link}
                  className={`${category.color} px-4 py-2 sm:px-5 sm:py-3 rounded-full text-sm transition-all duration-300 min-h-[44px] flex items-center justify-center backdrop-blur-sm`}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
              <Link
                href="/shop"
                className="bg-brand-burnt-orange text-white font-black text-lg sm:text-xl px-8 py-4 sm:px-10 sm:py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-brand-burnt-orange/70 hover:border-orange-400 hover:bg-brand-burnt-orange-light min-h-[56px] flex items-center justify-center"
              >
                🛍️ Shop Our Collection
              </Link>
              <Link
                href="/diy"
                className="bg-brand-vibrant-green text-white font-black text-lg sm:text-xl px-8 py-4 sm:px-10 sm:py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-brand-vibrant-green/70 hover:border-green-400 hover:bg-brand-vibrant-green-light min-h-[56px] flex items-center justify-center"
              >
                ✨ Start Creating
              </Link>
              <Link
                href="/blog"
                className="bg-brand-dark-teal text-white font-black text-lg sm:text-xl px-8 py-4 sm:px-10 sm:py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-brand-dark-teal/70 hover:border-blue-400 hover:bg-brand-dark-teal-light min-h-[56px] flex items-center justify-center"
              >
                📖 Read Stories
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-10 border-t border-brand-neutral-300">
              <p className="text-body text-gray-900 mb-4 sm:mb-6 font-bold text-lg sm:text-xl drop-shadow-sm">Trusted by families across Nigeria</p>
              <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-8">
                <div className="flex items-center gap-2 bg-brand-vibrant-green/10 px-4 py-2 rounded-full border border-brand-vibrant-green/30">
                  <svg className="w-5 h-5 text-brand-vibrant-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-bold text-gray-900">Premium Quality</span>
                </div>
                <div className="flex items-center gap-2 bg-brand-dark-teal/10 px-4 py-2 rounded-full border border-brand-dark-teal/30">
                  <svg className="w-5 h-5 text-brand-dark-teal" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-bold text-gray-900">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 bg-brand-burnt-orange/10 px-4 py-2 rounded-full border border-brand-burnt-orange/30">
                  <svg className="w-5 h-5 text-brand-burnt-orange" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-bold text-gray-900">Expert Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-3 sm:px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="heading-2 text-brand-neutral-900 mb-3 sm:mb-4 drop-shadow-sm">
              Featured <span className="text-brand-burnt-orange font-black">Products</span>
            </h2>
            <p className="text-body text-brand-neutral-700 max-w-2xl mx-auto drop-shadow-sm">
              Discover our handpicked selection of premium fashion, beauty, and lifestyle essentials
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {/* Product 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src="/images/PremiumLeatherHandbags.png"
                  alt="Premium Leather Handbag"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                  <span className="bg-brand-burnt-orange text-white px-3 py-1 rounded-full text-xs font-bold shadow-md border border-brand-burnt-orange/50">Featured</span>
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-bold text-brand-neutral-900 mb-2 text-sm sm:text-base leading-tight">Premium Leather Handbag</h3>
                <p className="text-brand-neutral-700 text-sm sm:text-base mb-3 leading-relaxed">Elegant genuine leather handbag with multiple compartments</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base sm:text-lg text-brand-burnt-orange">₦45,000</span>
                  <Link href="/shop" className="bg-brand-dark-teal text-white px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-brand-dark-teal-light min-h-[36px] flex items-center font-medium">
                    Shop
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src="/images/NaturalHairOil.png"
                  alt="Natural Hair Oil"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-bold text-brand-neutral-900 mb-2 text-sm sm:text-base leading-tight">Natural Hair Oil</h3>
                <p className="text-brand-neutral-700 text-sm sm:text-base mb-3 leading-relaxed">Organic hair treatment with coconut and jojoba oils</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base sm:text-lg text-brand-burnt-orange">₦12,000</span>
                  <Link href="/shop" className="bg-brand-vibrant-green text-white px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-brand-vibrant-green-light min-h-[36px] flex items-center font-medium">
                    Shop
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src="/images/AnkaraPrintBlouses.png"
                  alt="Ankara Print Blouse"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-bold text-brand-neutral-900 mb-2 text-sm sm:text-base leading-tight">Ankara Print Blouse</h3>
                <p className="text-brand-neutral-700 text-sm sm:text-base mb-3 leading-relaxed">Traditional meets modern with contemporary cut</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base sm:text-lg text-brand-burnt-orange">₦15,000</span>
                  <Link href="/shop" className="bg-brand-burnt-orange text-white px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-brand-burnt-orange-light min-h-[36px] flex items-center font-medium">
                    Shop
                  </Link>
                </div>
              </div>
            </div>

            {/* Product 4 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <Image
                  src="/images/StatementEarrings.png"
                  alt="Statement Earrings"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-bold text-brand-neutral-900 mb-2 text-sm sm:text-base leading-tight">Statement Earrings</h3>
                <p className="text-brand-neutral-700 text-sm sm:text-base mb-3 leading-relaxed">Bold geometric design perfect for special occasions</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base sm:text-lg text-brand-burnt-orange">₦8,500</span>
                  <Link href="/shop" className="bg-brand-dark-teal text-white px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-brand-dark-teal-light min-h-[36px] flex items-center font-medium">
                    Shop
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/shop"
              className="bg-brand-burnt-orange text-white font-semibold text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-brand-burnt-orange hover:border-brand-burnt-orange-light min-h-[48px] flex items-center justify-center"
            >
              🛍️ View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Featured DIY Projects Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-brand-neutral-900 mb-4 drop-shadow-sm">
              Featured <span className="text-brand-dark-teal font-black">DIY Projects</span>
            </h2>
            <p className="text-body text-brand-neutral-700 max-w-2xl mx-auto drop-shadow-sm">
              Unleash your creativity with our step-by-step tutorials and craft ideas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* DIY 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/HandmadeBeadedNecklace.png"
                  alt="Handmade Beaded Necklace"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-brand-vibrant-green text-white px-3 py-1 rounded-full text-xs font-bold shadow-md border border-brand-vibrant-green/50">Popular</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-brand-neutral-900 mb-2 text-lg leading-tight">Handmade Beaded Necklace</h3>
                <p className="text-brand-neutral-700 text-sm mb-3 leading-relaxed">Create beautiful jewelry with step-by-step guidance</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-vibrant-green font-semibold text-sm">Beginner • 45 min</span>
                  <Link href="/diy/handmade-beaded-necklace" className="bg-brand-vibrant-green text-white px-3 py-1 rounded-full text-sm hover:bg-brand-vibrant-green-light font-medium">
                    Try It
                  </Link>
                </div>
              </div>
            </div>

            {/* DIY 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/NaturalHairTreatmentMask.png"
                  alt="Natural Hair Treatment"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-brand-neutral-900 mb-2 text-lg leading-tight">Natural Hair Treatment</h3>
                <p className="text-brand-neutral-700 text-sm mb-3 leading-relaxed">DIY hair mask using natural ingredients</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-vibrant-green font-semibold text-sm">Beginner • 30 min</span>
                  <Link href="/diy/natural-hair-treatment-mask" className="bg-brand-vibrant-green text-white px-3 py-1 rounded-full text-sm hover:bg-brand-vibrant-green-light font-medium">
                    Try It
                  </Link>
                </div>
              </div>
            </div>

            {/* DIY 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/DIYAnkaraThrowPillow.png"
                  alt="DIY Ankara Pillow"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-brand-neutral-900 mb-2 text-lg leading-tight">DIY Ankara Throw Pillow</h3>
                <p className="text-brand-neutral-700 text-sm mb-3 leading-relaxed">Create beautiful home decor with Ankara fabric</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-vibrant-green font-semibold text-sm">Intermediate • 2 hrs</span>
                  <Link href="/diy/diy-ankara-throw-pillow" className="bg-brand-vibrant-green text-white px-3 py-1 rounded-full text-sm hover:bg-brand-vibrant-green-light font-medium">
                    Try It
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/diy"
              className="bg-brand-dark-teal text-white font-semibold text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-brand-dark-teal hover:border-brand-dark-teal-light min-h-[48px] flex items-center justify-center"
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
            <h2 className="heading-2 text-brand-neutral-900 mb-4 drop-shadow-sm">
              Featured <span className="text-brand-burnt-orange font-black">Workshops</span>
            </h2>
            <p className="text-body text-brand-neutral-700 max-w-2xl mx-auto drop-shadow-sm">
              Join our hands-on workshops and learn from industry experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Workshop 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/EmmdraFashionDesignAndAccessories.png"
                  alt="Fashion Styling Workshop"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-brand-burnt-orange text-white px-3 py-1 rounded-full text-xs font-bold shadow-md border border-brand-burnt-orange/50">Upcoming</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-brand-neutral-800 mb-2">Fashion Styling Masterclass</h3>
                <p className="text-brand-neutral-600 text-sm mb-3">Learn professional styling techniques</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-brand-neutral-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Feb 15, 2024
                  </div>
                  <div className="flex items-center text-sm text-brand-neutral-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    3 hours
                  </div>
                  <div className="flex items-center text-sm text-brand-neutral-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    Enugu Studio
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-lg text-brand-burnt-orange">₦25,000</span>
                  <Link href="/workshops/fashion-styling-masterclass" className="bg-brand-burnt-orange text-white px-3 py-1 rounded-full text-sm hover:bg-brand-burnt-orange-light">
                    Register
                  </Link>
                </div>
              </div>
            </div>

            {/* Workshop 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/DIYJewelryMakingWorkshop.png"
                  alt="Jewelry Making Workshop"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-brand-neutral-800 mb-2">DIY Jewelry Making</h3>
                <p className="text-brand-neutral-600 text-sm mb-3">Create beautiful handmade jewelry</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-brand-neutral-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Feb 22, 2024
                  </div>
                  <div className="flex items-center text-sm text-brand-neutral-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    4 hours
                  </div>
                  <div className="flex items-center text-sm text-brand-neutral-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    Workshop Space
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-lg text-brand-burnt-orange">₦15,000</span>
                  <Link href="/workshops/diy-jewelry-making" className="bg-brand-burnt-orange text-white px-3 py-1 rounded-full text-sm hover:bg-brand-burnt-orange-light">
                    Register
                  </Link>
                </div>
              </div>
            </div>

            {/* Workshop 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-purple-100">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/beautyHub.png"
                  alt="Natural Beauty Workshop"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-brand-neutral-800 mb-2">Natural Beauty Workshop</h3>
                <p className="text-brand-neutral-600 text-sm mb-3">Create your own natural beauty products</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-brand-neutral-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Mar 1, 2024
                  </div>
                  <div className="flex items-center text-sm text-brand-neutral-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    2.5 hours
                  </div>
                  <div className="flex items-center text-sm text-brand-neutral-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    Beauty Hub
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-lg text-brand-burnt-orange">₦18,000</span>
                  <Link href="/workshops/natural-beauty-workshop" className="bg-brand-burnt-orange text-white px-3 py-1 rounded-full text-sm hover:bg-brand-burnt-orange-light">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/workshops"
              className="bg-brand-vibrant-green text-white font-semibold text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-brand-vibrant-green hover:border-brand-vibrant-green-light min-h-[48px] flex items-center justify-center"
            >
              🎓 View All Workshops
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-brand-neutral-900 mb-4 drop-shadow-sm">
              Featured <span className="text-brand-dark-teal font-black">Stories</span>
            </h2>
            <p className="text-body text-brand-neutral-700 max-w-2xl mx-auto drop-shadow-sm">
              Read inspiring stories, fashion tips, and lifestyle advice from our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Blog 1 */}
            <article className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/5EssentialFashionTipsforNigerianWeather.png"
                  alt="Fashion Tips for Nigerian Weather"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-brand-dark-teal text-white px-3 py-1 rounded-full text-xs font-bold shadow-md border border-brand-dark-teal/50">Fashion</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-brand-neutral-800 mb-2 line-clamp-2">5 Essential Fashion Tips for Nigerian Weather</h3>
                <p className="text-brand-neutral-600 text-sm mb-3 line-clamp-2">Learn how to dress comfortably and stylishly in Nigeria&apos;s tropical climate...</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-dark-teal font-medium text-sm">Fashion Tips</span>
                  <Link href="/blog/fashion-tips-nigerian-weather" className="bg-brand-dark-teal text-white px-3 py-1 rounded-full text-sm hover:bg-brand-dark-teal-light">
                    Read
                  </Link>
                </div>
              </div>
            </article>

            {/* Blog 2 */}
            <article className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/DIYNaturalBeautyRemediesatHome.png"
                  alt="DIY Natural Beauty Remedies"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-brand-neutral-800 mb-2 line-clamp-2">DIY Natural Beauty Remedies at Home</h3>
                <p className="text-brand-neutral-600 text-sm mb-3 line-clamp-2">Discover simple, effective beauty treatments using kitchen ingredients...</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-dark-teal font-medium text-sm">Beauty</span>
                  <Link href="/blog/diy-natural-beauty-remedies" className="bg-brand-dark-teal text-white px-3 py-1 rounded-full text-sm hover:bg-brand-dark-teal-light">
                    Read
                  </Link>
                </div>
              </div>
            </article>

            {/* Blog 3 */}
            <article className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/BuildingaCapsuleWardrobeforBusyProfessionals.png"
                  alt="Capsule Wardrobe Guide"
                  fill
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-brand-neutral-800 mb-2 line-clamp-2">Building a Capsule Wardrobe for Busy Professionals</h3>
                <p className="text-brand-neutral-600 text-sm mb-3 line-clamp-2">Streamline your morning routine with a carefully curated professional wardrobe...</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-dark-teal font-medium text-sm">Lifestyle</span>
                  <Link href="/blog/capsule-wardrobe-professionals" className="bg-brand-dark-teal text-white px-3 py-1 rounded-full text-sm hover:bg-brand-dark-teal-light">
                    Read
                  </Link>
                </div>
              </div>
            </article>
          </div>

          <div className="text-center">
            <Link
              href="/blog"
              className="bg-brand-burnt-orange text-white font-semibold text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-brand-burnt-orange hover:border-brand-burnt-orange-light min-h-[48px] flex items-center justify-center"
            >
              📖 Read More Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
