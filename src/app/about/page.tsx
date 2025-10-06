'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { trackPageView } from '@/lib/analytics'

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Track about page view
    trackPageView({
      page_type: 'about',
      page_title: 'About - Emmdra Empire'
    })

    // Trigger animations after component mounts
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  return (
    <div className="relative">
      {/* Hero Section - Family Portrait */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                Meet the <span className="text-blue-600">Emmdra</span> Family
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                A husband-and-wife duo turning passion into purpose, creativity into community,
                and family values into a lifestyle empire.
              </p>
            </div>
          </div>
        </div>

        {/* Family Portrait Placeholder */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
          <div className={`transition-all duration-1000 delay-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-t-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Emmanuel & Chidera
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    Creative entrepreneurs, loving parents, and the heart of Emmdra Empire.
                    Our journey began with a simple belief: everyone deserves to express their unique style and creativity.
                  </p>
                  <div className="flex justify-center md:justify-start gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span>Husband & Wife Team</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Family-First Values</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-full h-64 bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm">Family Portrait Placeholder</p>
                      <p className="text-xs mt-1">Emmanuel & Chidera</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Journey Timeline */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-blue-600">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a simple dream to a thriving community, here&apos;s how Emmdra Empire came to life.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-600 to-purple-600 h-full"></div>

              {/* Timeline Items */}
              <div className="space-y-16">
                {/* 2020 - The Beginning */}
                <div className={`flex items-center transition-all duration-1000 delay-300 transform ${
                  isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}>
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-blue-50 p-6 rounded-2xl shadow-lg">
                      <h3 className="text-xl font-bold text-blue-800 mb-2">2020 - The Spark</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Emmanuel and Chidera discovered their shared passion for fashion and creativity.
                        What started as weekend projects became a vision for something bigger.
                      </p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-blue-600 rounded-full mx-4 relative z-10 shadow-lg"></div>
                  <div className="w-1/2"></div>
                </div>

                {/* 2021 - First Steps */}
                <div className={`flex items-center transition-all duration-1000 delay-500 transform ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}>
                  <div className="w-1/2"></div>
                  <div className="w-4 h-4 bg-purple-600 rounded-full mx-4 relative z-10 shadow-lg"></div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-purple-50 p-6 rounded-2xl shadow-lg">
                      <h3 className="text-xl font-bold text-purple-800 mb-2">2021 - First Collection</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Launched our first fashion collection, focusing on quality materials and unique designs.
                        The response from friends and family gave us the confidence to dream bigger.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2022 - Expansion */}
                <div className={`flex items-center transition-all duration-1000 delay-700 transform ${
                  isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}>
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-pink-50 p-6 rounded-2xl shadow-lg">
                      <h3 className="text-xl font-bold text-pink-800 mb-2">2022 - Beauty & Lifestyle</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Expanded into beauty products and lifestyle content. Our DIY tutorials and beauty tips
                        started building a loyal community of creative families.
                      </p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-pink-600 rounded-full mx-4 relative z-10 shadow-lg"></div>
                  <div className="w-1/2"></div>
                </div>

                {/* 2023 - Community Growth */}
                <div className={`flex items-center transition-all duration-1000 delay-900 transform ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}>
                  <div className="w-1/2"></div>
                  <div className="w-4 h-4 bg-green-600 rounded-full mx-4 relative z-10 shadow-lg"></div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-green-50 p-6 rounded-2xl shadow-lg">
                      <h3 className="text-xl font-bold text-green-800 mb-2">2023 - Community Focus</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Started workshops and training sessions. Our family grew beyond just us -
                        we now have a community of families embracing creativity and style together.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2024 - Emmdra Empire */}
                <div className={`flex items-center transition-all duration-1000 delay-1100 transform ${
                  isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}>
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-yellow-50 p-6 rounded-2xl shadow-lg border-2 border-yellow-200">
                      <h3 className="text-xl font-bold text-yellow-800 mb-2">2024 - Emmdra Empire</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Today, Emmdra Empire is more than a brand - it&apos;s a movement. We&apos;re building
                        a community where families can express themselves, learn together, and create beautiful memories.
                      </p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-yellow-600 rounded-full mx-4 relative z-10 shadow-lg"></div>
                  <div className="w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-blue-600">Mission</span> & <span className="text-purple-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Every decision we make, every product we create, and every story we share is guided by these core principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Family First */}
            <div className={`bg-white p-8 rounded-2xl shadow-lg transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Family First</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Everything we do starts and ends with family. We create products and content that bring families together,
                strengthen bonds, and create lasting memories.
              </p>
            </div>

            {/* Creativity */}
            <div className={`bg-white p-8 rounded-2xl shadow-lg transition-all duration-1000 delay-500 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Creativity Unleashed</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We believe everyone has a creative spark. Our DIY tutorials, styling tips, and workshops
                help people discover and express their unique creativity.
              </p>
            </div>

            {/* Quality & Authenticity */}
            <div className={`bg-white p-8 rounded-2xl shadow-lg transition-all duration-1000 delay-700 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Quality & Authenticity</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We source the finest materials and create with genuine care. Every product tells a story
                of craftsmanship, attention to detail, and authentic Nigerian creativity.
              </p>
            </div>
          </div>

          {/* Lifestyle Philosophy */}
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
              Our <span className="text-blue-600">Lifestyle Philosophy</span>
            </h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                &ldquo;Life is too short for ordinary style. Every day is an opportunity to express who you are,
                celebrate your culture, and create something beautiful with the people you love.&rdquo;
              </p>
              <p className="text-lg text-gray-600 italic">
                — Emmanuel & Chidera, Founders of Emmdra Empire
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Join Our Family?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re looking for the perfect outfit, want to learn a new craft,
              or need styling advice — we&apos;re here to help you shine.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/shop"
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🛍️ Explore Our Collection
              </Link>
              <Link
                href="/blog"
                className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                📖 Join Our Community
              </Link>
              <Link
                href="/contact"
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                📞 Get In Touch
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-16 pt-8 border-t border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white/90">
                <div className="text-center">
                  <h3 className="font-semibold mb-2">📍 Location</h3>
                  <p className="text-sm">Enugu, Nigeria</p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold mb-2">📞 Phone</h3>
                  <p className="text-sm">+234 812 239 4397</p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold mb-2">✉️ Email</h3>
                  <p className="text-sm">hello@emmdraempire.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
