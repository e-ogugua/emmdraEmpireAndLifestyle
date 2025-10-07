'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
      {/* Hero Section - Family Portrait with Beautiful Background */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/EmmdraOurStory.JPG"
            alt="Emmdra Family Story Background"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Elegant overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent"></div>
          {/* Brand color accent overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-pink-900/20 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
                Meet the <span className="text-blue-300">Emmdra</span> Family
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12 drop-shadow-md px-2">
                A husband-and-wife duo turning passion into purpose, creativity into community,
                and family values into a lifestyle empire.
              </p>
            </div>
          </div>
        </div>

        {/* Family Portrait Section */}
        <div className="relative -mt-8 px-4">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-5xl">
            <div className={`transition-all duration-1000 delay-500 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="bg-white/90 backdrop-blur-sm rounded-t-3xl p-8 shadow-2xl border border-white/20">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Emmanuel Portrait */}
                      <div className="relative group">
                        <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src="/images/EmmdraEmmanuelPotrait11.png"
                            alt="Emmanuel - Co-Founder"
                            fill
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                        <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                          <p className="text-xs font-semibold text-gray-700">Emmanuel</p>
                          <p className="text-xs text-gray-600">Creative Director</p>
                        </div>
                      </div>

                      {/* Chidera Portrait */}
                      <div className="relative group">
                        <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-purple-200 to-pink-300 rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src="/images/emmdraChideraPotrait10.png"
                            alt="Chidera - Co-Founder"
                            fill
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                        <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                          <p className="text-xs font-semibold text-gray-700">Chidera</p>
                          <p className="text-xs text-gray-600">Style Curator</p>
                        </div>
                      </div>
                    </div>

                    {/* Heart Connection Icon */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Journey Timeline */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-blue-600">Journey</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From a simple dream to a thriving community, here&apos;s how Emmdra Empire came to life.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line - Hidden on mobile, visible on larger screens */}
              <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-600 to-purple-600 h-full"></div>

              {/* Timeline Items */}
              <div className="space-y-8 sm:space-y-12">
                {/* Dec 2023 - The Foundation */}
                <div className={`flex flex-col sm:flex-row sm:items-center transition-all duration-1000 delay-300 transform ${
                  isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}>
                  <div className="w-full sm:w-1/2 sm:pr-6 text-center sm:text-right mb-4 sm:mb-0">
                    <div className="bg-blue-50 p-4 sm:p-5 rounded-2xl shadow-lg inline-block w-full sm:w-auto">
                      <h3 className="text-base sm:text-lg font-bold text-blue-800 mb-2">Dec 2023 - Foundation</h3>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        Emmanuel and Chidera laid the groundwork for Emmdra Empire, combining their passion
                        for fashion, beauty, and family values into a cohesive vision.
                      </p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-blue-600 rounded-full mx-auto sm:mx-4 relative z-10 shadow-lg"></div>
                  <div className="w-full sm:w-1/2"></div>
                </div>

                {/* Jan 2024 - Brand Identity */}
                <div className={`flex flex-col sm:flex-row sm:items-center transition-all duration-1000 delay-500 transform ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}>
                  <div className="w-full sm:w-1/2"></div>
                  <div className="w-4 h-4 bg-purple-600 rounded-full mx-auto sm:mx-4 relative z-10 shadow-lg"></div>
                  <div className="w-full sm:w-1/2 sm:pl-6 text-center sm:text-left mt-4 sm:mt-0">
                    <div className="bg-purple-50 p-4 sm:p-5 rounded-2xl shadow-lg inline-block w-full sm:w-auto">
                      <h3 className="text-base sm:text-lg font-bold text-purple-800 mb-2">Jan 2024 - Brand Launch</h3>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        Official launch of Emmdra Empire with curated fashion collections, beauty essentials,
                        and DIY content that resonates with modern families.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mar 2024 - Community Building */}
                <div className={`flex flex-col sm:flex-row sm:items-center transition-all duration-1000 delay-700 transform ${
                  isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}>
                  <div className="w-full sm:w-1/2 sm:pr-6 text-center sm:text-right mb-4 sm:mb-0">
                    <div className="bg-pink-50 p-4 sm:p-5 rounded-2xl shadow-lg inline-block w-full sm:w-auto">
                      <h3 className="text-base sm:text-lg font-bold text-pink-800 mb-2">Mar 2024 - Community Growth</h3>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        Started building our community through workshops, blog content, and social media engagement.
                        Families began discovering our unique approach to lifestyle.
                      </p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-pink-600 rounded-full mx-auto sm:mx-4 relative z-10 shadow-lg"></div>
                  <div className="w-full sm:w-1/2"></div>
                </div>

                {/* Jun 2024 - Digital Expansion */}
                <div className={`flex flex-col sm:flex-row sm:items-center transition-all duration-1000 delay-900 transform ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}>
                  <div className="w-full sm:w-1/2"></div>
                  <div className="w-4 h-4 bg-green-600 rounded-full mx-auto sm:mx-4 relative z-10 shadow-lg"></div>
                  <div className="w-full sm:w-1/2 sm:pl-6 text-center sm:text-left mt-4 sm:mt-0">
                    <div className="bg-green-50 p-4 sm:p-5 rounded-2xl shadow-lg inline-block w-full sm:w-auto">
                      <h3 className="text-base sm:text-lg font-bold text-green-800 mb-2">Jun 2024 - Online Presence</h3>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        Expanded our digital footprint with a comprehensive website featuring shop, blog,
                        and workshop bookings. Enhanced customer experience with seamless online shopping.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sep 2024 - Product Diversification */}
                <div className={`flex flex-col sm:flex-row sm:items-center transition-all duration-1000 delay-1100 transform ${
                  isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}>
                  <div className="w-full sm:w-1/2 sm:pr-6 text-center sm:text-right mb-4 sm:mb-0">
                    <div className="bg-orange-50 p-4 sm:p-5 rounded-2xl shadow-lg inline-block w-full sm:w-auto">
                      <h3 className="text-base sm:text-lg font-bold text-orange-800 mb-2">Sep 2024 - Product Expansion</h3>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        Diversified our product range with new categories including accessories, beauty products,
                        and lifestyle items. Enhanced our DIY tutorial library with step-by-step guides.
                      </p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-orange-600 rounded-full mx-auto sm:mx-4 relative z-10 shadow-lg"></div>
                  <div className="w-full sm:w-1/2"></div>
                </div>

                {/* Dec 2024 - Current & Future */}
                <div className={`flex flex-col sm:flex-row sm:items-center transition-all duration-1000 delay-1300 transform ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                }`}>
                  <div className="w-full sm:w-1/2"></div>
                  <div className="w-4 h-4 bg-yellow-600 rounded-full mx-auto sm:mx-4 relative z-10 shadow-lg"></div>
                  <div className="w-full sm:w-1/2 sm:pl-6 text-center sm:text-left mt-4 sm:mt-0">
                    <div className="bg-yellow-50 p-4 sm:p-5 rounded-2xl shadow-lg border-2 border-yellow-200 inline-block w-full sm:w-auto">
                      <h3 className="text-base sm:text-lg font-bold text-yellow-800 mb-2">Today - Growing Strong</h3>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        Emmdra Empire continues to grow as a beloved lifestyle brand. We&apos;re expanding our community,
                        creating more workshops, and developing new products that celebrate Nigerian creativity and family bonds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story - Personal Journey */}
      <section className="py-12 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-12 transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Our <span className="text-blue-600">Story</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Every love story has a beginning, and ours started with creativity, passion, and a shared dream.
              </p>
            </div>

            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}>
              {/* Story Image */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gray-100">
                  <Image
                    src="/images/EmmdraOurStory.JPG"
                    alt="Emmanuel and Chidera - Our Love Story"
                    fill
                    className="w-full h-auto object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Overlay with decorative elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                      <span className="text-sm font-semibold text-gray-800">Our Journey</span>
                    </div>
                  </div>
                </div>

                {/* Floating Quote */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl max-w-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 italic leading-relaxed">
                        &ldquo;From fashion sketches to family dreams, every creation tells our story.&rdquo;
                      </p>
                      <p className="text-xs text-gray-500 mt-2">— Emmanuel & Chidera</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Where It All Began
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Our story started in the vibrant city of Enugu, where two creative souls discovered
                    their shared passion for fashion, beauty, and family. What began as weekend crafting
                    sessions evolved into a mission to empower families to express their unique style.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Partnership</h4>
                    <p className="text-sm text-gray-600">Creative collaboration that sparks magic</p>
                  </div>

                  <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Community</h4>
                    <p className="text-sm text-gray-600">Building families through creativity</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-blue-400">
                  <p className="text-gray-700 leading-relaxed">
                    &ldquo;We don&apos;t just create products; we create experiences that bring families together.
                    Every design, every tutorial, every workshop is crafted with love and the belief that
                    creativity should be accessible to all families.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-blue-600">Mission</span> & <span className="text-purple-600">Values</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every decision we make, every product we create, and every story we share is guided by these core principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Family First */}
            <div className={`bg-white p-6 rounded-2xl shadow-lg transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Family First</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                Everything we do starts and ends with family. We create products and content that bring families together,
                strengthen bonds, and create lasting memories.
              </p>
            </div>

            {/* Creativity */}
            <div className={`bg-white p-6 rounded-2xl shadow-lg transition-all duration-1000 delay-500 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Creativity Unleashed</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                We believe everyone has a creative spark. Our DIY tutorials, styling tips, and workshops
                help people discover and express their unique creativity.
              </p>
            </div>

            {/* Quality & Authenticity */}
            <div className={`bg-white p-6 rounded-2xl shadow-lg transition-all duration-1000 delay-700 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="text-center mb-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Quality & Authenticity</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                We source the finest materials and create with genuine care. Every product tells a story
                of craftsmanship, attention to detail, and authentic Nigerian creativity.
              </p>
            </div>
          </div>

          {/* Lifestyle Philosophy */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
              Our <span className="text-blue-600">Lifestyle Philosophy</span>
            </h2>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                &ldquo;Life is too short for ordinary style. Every day is an opportunity to express who you are,
                celebrate your culture, and create something beautiful with the people you love.&rdquo;
              </p>
              <p className="text-base text-gray-600 italic">
                — Emmanuel & Chidera, Founders of Emmdra Empire
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-600 to-blue-600">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Join Our Family?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Whether you&apos;re looking for the perfect outfit, want to learn a new craft,
              or need styling advice — we&apos;re here to help you shine.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold text-base hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🛍️ Explore Our Collection
              </Link>
              <Link
                href="/blog"
                className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-6 py-3 rounded-full font-semibold text-base hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                📖 Join Our Community
              </Link>
              <Link
                href="/contact"
                className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold text-base hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                📞 Get In Touch
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-12 pt-6 border-t border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90">
                <div className="text-center">
                  <h3 className="font-semibold mb-1">📍 Location</h3>
                  <p className="text-sm">Enugu, Nigeria</p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold mb-1">📞 Phone</h3>
                  <p className="text-sm">+234 812 239 4397</p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold mb-1">✉️ Email</h3>
                  <p className="text-sm">emmdraempire@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
