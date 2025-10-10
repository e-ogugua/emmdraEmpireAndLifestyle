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
      {/* Hero Section - Brand Colors with Gradient */}
      <section className="relative py-6 sm:py-8 md:py-12 lg:py-16 px-3 sm:px-4 min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] flex items-center overflow-hidden">
        {/* Brand Color Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10"></div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className={`text-center transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight drop-shadow-xl">
                Meet the <span className="text-yellow-300 drop-shadow-lg">Emmdra</span> Family
              </h1>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed mb-4 sm:mb-6 md:mb-8 drop-shadow-lg px-2 font-medium">
                A husband-and-wife duo turning passion into purpose, creativity into community,
                and family values into a lifestyle empire.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Family Portrait Section - Right Below Hero */}
      <section className="py-8 sm:py-10 md:py-12 px-3 sm:px-4 bg-white -mt-6 sm:-mt-8">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className={`transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-white/30">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
                  <div className="text-center lg:text-left">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">
                      Emmanuel & Chidera
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed font-medium max-w-2xl">
                      Creative entrepreneurs and loving parents building Emmdra Empire together
                    </p>
                    <div className="flex justify-center lg:justify-start gap-4 sm:gap-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs sm:text-sm font-medium">Husband & Wife Team</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-4 h-4 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs sm:text-sm font-medium">Family-First Values</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Emmanuel Portrait */}
                      <div className="relative group">
                        <div className="w-full h-48 sm:h-56 md:h-64 bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src="/images/EmmdraEmmanuelPotrait11.png"
                            alt="Emmanuel - Co-Founder"
                            fill
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-md">
                          <p className="text-sm sm:text-base font-bold text-gray-800">Emmanuel</p>
                          <p className="text-xs sm:text-sm text-gray-600">Creative Director</p>
                        </div>
                      </div>

                      {/* Chidera Portrait */}
                      <div className="relative group">
                        <div className="w-full h-48 sm:h-56 md:h-64 bg-gradient-to-br from-purple-200 to-pink-300 rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src="/images/emmdraChideraPotrait10.png"
                            alt="Chidera - Co-Founder"
                            fill
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full shadow-md">
                          <p className="text-sm sm:text-base font-bold text-gray-800">Chidera</p>
                          <p className="text-xs sm:text-sm text-gray-600">Style Curator</p>
                        </div>
                      </div>
                    </div>

                    {/* Heart Connection Icon */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
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
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 tracking-tight">
              Our <span className="text-blue-600">Journey</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
              From a simple dream to a thriving community, here&apos;s how Emmdra Empire came to life.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Timeline */}
            <div className="relative min-h-[800px] py-8">
              {/* Timeline Line - Subtle outline without fill */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full shadow-inner z-0 border-2 border-slate-400/30"></div>

              {/* Timeline Items */}
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Dec 2023 - The Foundation */}
                <div className={`flex flex-col sm:flex-row sm:items-center transition-all duration-1000 delay-300 transform ${
                  isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}>
                  <div className="w-full sm:w-1/2 sm:pr-3 md:sm:pr-4 lg:pr-6 text-center sm:text-right mb-3 sm:mb-0">
                    <div className="bg-blue-50 p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border border-blue-200/50 inline-block w-full sm:w-auto hover:shadow-2xl transition-all duration-300 group">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-blue-900 mb-3 sm:mb-4 group-hover:text-blue-800 transition-colors">Dec 2023 - Foundation</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg font-medium max-w-md">
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
                  <div className="w-full sm:w-1/2 sm:pl-3 md:sm:pl-4 lg:pl-6 text-center sm:text-left mt-3 sm:mt-0">
                    <div className="bg-purple-50 p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border border-purple-200/50 inline-block w-full sm:w-auto hover:shadow-2xl transition-all duration-300 group">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-purple-900 mb-3 sm:mb-4 group-hover:text-purple-800 transition-colors">Jan 2024 - Brand Launch</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg font-medium max-w-md">
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
                  <div className="w-full sm:w-1/2 sm:pr-3 md:sm:pr-4 lg:pr-6 text-center sm:text-right mb-3 sm:mb-0">
                    <div className="bg-pink-50 p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border border-pink-200/50 inline-block w-full sm:w-auto hover:shadow-2xl transition-all duration-300 group">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-pink-900 mb-3 sm:mb-4 group-hover:text-pink-800 transition-colors">Mar 2024 - Community Growth</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg font-medium max-w-md">
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
                  <div className="w-full sm:w-1/2 sm:pl-3 md:sm:pl-4 lg:pl-6 text-center sm:text-left mt-3 sm:mt-0">
                    <div className="bg-green-50 p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border border-green-200/50 inline-block w-full sm:w-auto hover:shadow-2xl transition-all duration-300 group">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-green-900 mb-3 sm:mb-4 group-hover:text-green-800 transition-colors">Jun 2024 - Online Presence</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg font-medium max-w-md">
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
                  <div className="w-full sm:w-1/2 sm:pr-3 md:sm:pr-4 lg:pr-6 text-center sm:text-right mb-3 sm:mb-0">
                    <div className="bg-orange-50 p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border border-orange-200/50 inline-block w-full sm:w-auto hover:shadow-2xl transition-all duration-300 group">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-orange-900 mb-3 sm:mb-4 group-hover:text-orange-800 transition-colors">Sep 2024 - Product Expansion</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg font-medium max-w-md">
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
                  <div className="w-full sm:w-1/2 sm:pl-3 md:sm:pl-4 lg:pl-6 text-center sm:text-left mt-3 sm:mt-0">
                    <div className="bg-yellow-50 p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl border-2 border-yellow-300 inline-block w-full sm:w-auto hover:shadow-2xl transition-all duration-300 group">
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-yellow-900 mb-3 sm:mb-4 group-hover:text-yellow-800 transition-colors">Today - Growing Strong</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg font-medium max-w-md">
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
      <section className="py-8 sm:py-12 md:py-16 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
                Our <span className="text-blue-600">Story</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
                Every love story has a beginning, and ours started with creativity, passion, and a shared dream.
              </p>
            </div>

            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center transition-all duration-1000 delay-300 transform ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}>
              {/* Story Image */}
              <div className="relative order-2 lg:order-1">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-gray-100 min-h-[350px] xs:min-h-[400px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[600px]">
                  <Image
                    src="/images/EmmdraOurStory.JPG"
                    alt="Emmanuel and Chidera - Our Love Story"
                    fill
                    className="w-full h-full object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  {/* Overlay with decorative elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <div className="bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full shadow-lg">
                      <span className="text-xs sm:text-sm font-semibold text-gray-800">Our Journey</span>
                    </div>
                  </div>
                </div>

                {/* Floating Quote */}
                <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl max-w-xs border border-gray-100">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                        &ldquo;From fashion sketches to family dreams, every creation tells our story.&rdquo;
                      </p>
                      <p className="text-xs text-gray-500 mt-1 sm:mt-2">— Emmanuel & Chidera</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Story Content */}
              <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
                <div>
                  <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                    Where It All Began
                  </h3>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                    Our story started in the vibrant city of Enugu, where two creative souls discovered
                    their shared passion for fashion, beauty, and family. What began as weekend crafting
                    sessions evolved into a mission to empower families to express their unique style.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Partnership</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Creative collaboration that sparks magic</p>
                  </div>

                  <div className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">Community</h4>
                    <p className="text-xs sm:text-sm text-gray-600">Building families through creativity</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-xl border-l-4 border-blue-400">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
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
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
              Our <span className="text-blue-600">Mission</span> & <span className="text-purple-600">Values</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed font-medium max-w-4xl mx-auto">
              Every decision we make, every product we create, and every story we share is guided by these core principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Family First */}
            <div className={`bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 transition-all duration-1000 delay-300 transform hover:shadow-3xl hover:-translate-y-2 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 tracking-tight">Family First</h3>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-center font-medium">
                Everything we do starts and ends with family. We create products and content that bring families together,
                strengthen bonds, and create lasting memories.
              </p>
            </div>

            {/* Creativity */}
            <div className={`bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 transition-all duration-1000 delay-500 transform hover:shadow-3xl hover:-translate-y-2 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 tracking-tight">Creativity Unleashed</h3>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-center font-medium">
                We believe everyone has a creative spark. Our DIY tutorials, styling tips, and workshops
                help people discover and express their unique creativity.
              </p>
            </div>

            {/* Quality & Authenticity */}
            <div className={`bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 transition-all duration-1000 delay-700 transform hover:shadow-3xl hover:-translate-y-2 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 tracking-tight">Quality & Authenticity</h3>
              </div>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-center font-medium">
                We source the finest materials and create with genuine care. Every product tells a story
                of craftsmanship, attention to detail, and authentic Nigerian creativity.
              </p>
            </div>
          </div>

          {/* Lifestyle Philosophy */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-3xl border border-white/60 hover:shadow-4xl transition-all duration-300">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-6 sm:mb-8 tracking-tight">
              Our <span className="text-blue-600">Lifestyle Philosophy</span>
            </h2>
            <div className="max-w-5xl mx-auto text-center">
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-4 sm:mb-6 font-medium italic">
                &ldquo;Life is too short for ordinary style. Every day is an opportunity to express who you are,
                celebrate your culture, and create something beautiful with the people you love.&rdquo;
              </p>
              <p className="text-base sm:text-lg text-gray-600 font-bold">
                — Emmanuel & Chidera, Founders of Emmdra Empire
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 bg-gradient-to-br from-purple-700 via-blue-700 to-indigo-800 relative overflow-hidden">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 sm:w-40 sm:h-40 bg-white/3 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-32 sm:h-32 bg-white/2 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className={`transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 leading-tight drop-shadow-2xl tracking-tight">
                Ready to Join Our Family?
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-xl font-medium">
                Whether you&apos;re looking for the perfect outfit, want to learn a new craft,
                or need styling advice — we&apos;re here to help you shine and express your unique creativity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center mb-8 sm:mb-12 lg:mb-16">
                <Link
                  href="/shop"
                  className="group bg-white text-purple-700 px-8 sm:px-10 md:px-12 lg:px-14 py-4 sm:py-5 md:py-6 lg:py-7 rounded-full font-bold text-lg sm:text-xl md:text-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-3xl hover:shadow-4xl border-2 border-white/20 min-h-[56px] flex items-center justify-center"
                >
                  <span className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                    🛍️ Explore Our Collection
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/blog"
                  className="group bg-white/15 backdrop-blur-sm text-white border-2 border-white/40 px-8 sm:px-10 md:px-12 lg:px-14 py-4 sm:py-5 md:py-6 lg:py-7 rounded-full font-bold text-lg sm:text-xl md:text-2xl hover:bg-white hover:text-purple-700 transition-all duration-300 shadow-2xl hover:shadow-3xl min-h-[56px] flex items-center justify-center"
                >
                  <span className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                    📖 Join Our Community
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="group bg-white text-purple-700 px-8 sm:px-10 md:px-12 lg:px-14 py-4 sm:py-5 md:py-6 lg:py-7 rounded-full font-bold text-lg sm:text-xl md:text-2xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-3xl hover:shadow-4xl border-2 border-white/20 min-h-[56px] flex items-center justify-center"
                >
                  <span className="flex items-center gap-3 sm:gap-4 lg:gap-5">
                    📞 Get In Touch
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-8 sm:mt-10 lg:mt-12 pt-4 sm:pt-6 border-t border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-white/90">
                <div className="text-center">
                  <h3 className="font-semibold mb-1 text-base sm:text-lg">📍 Location</h3>
                  <p className="text-sm sm:text-base">Enugu, Nigeria</p>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold mb-1 text-base sm:text-lg">📞 Phone</h3>
                  <p className="text-sm sm:text-base">+234 812 239 4397</p>
                </div>
                <div className="text-center sm:col-span-2 lg:col-span-1">
                  <h3 className="font-semibold mb-1 text-base sm:text-lg">✉️ Email</h3>
                  <p className="text-sm sm:text-base">emmdraempire@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
