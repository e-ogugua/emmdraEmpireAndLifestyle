'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import HeroCarousel from '../components/HeroCarousel'
import DiscoverMoreSection from '../components/DiscoverMoreSection'
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
      <section className="relative z-10 py-20 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
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

      {/* Discover More Section */}
      <section id="discover">
        <DiscoverMoreSection />
      </section>
    </div>
  )
}
