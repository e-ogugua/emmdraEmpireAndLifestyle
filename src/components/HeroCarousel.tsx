'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Slide {
  id: number
  image: string
  title: string
  subtitle: string
  ctaText?: string
  ctaLink?: string
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/images/heroSlide1image.png',
    title: 'Welcome to Emmdra',
    subtitle: 'Your gateway to fashion, beauty, and lifestyle excellence',
    ctaText: 'Explore Our World',
    ctaLink: '/about'
  },
  {
    id: 2,
    image: '/images/emmdraTravel12.png',
    title: 'Style That Speaks',
    subtitle: 'Express yourself with fashion that tells your unique story',
    ctaText: 'Shop Fashion',
    ctaLink: '/shop'
  },
  {
    id: 3,
    image: '/images/beautyAndWellness.png',
    title: 'Beauty & Wellness',
    subtitle: 'Discover the secrets to radiant beauty and inner wellness',
    ctaText: 'Beauty Collection',
    ctaLink: '/shop'
  },
  {
    id: 4,
    image: '/images/Slide2DiyProjectsAndCrafts.png',
    title: 'Create & Inspire',
    subtitle: 'Unleash your creativity with our DIY projects and crafts',
    ctaText: 'Start Creating',
    ctaLink: '/diy'
  },
  {
    id: 5,
    image: '/images/EmmdraTourAndTravel.png',
    title: 'Stories That Inspire',
    subtitle: 'Journey through inspiring stories and lifestyle adventures',
    ctaText: 'Read Stories',
    ctaLink: '/blog'
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Auto-slide functionality with pause on hover
  useEffect(() => {
    setIsLoaded(true)

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className={`relative w-full h-[320px] sm:h-[380px] md:h-[450px] lg:h-[500px] xl:h-[65vh] overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              priority={index === 0}
              sizes="100vw"
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white px-4 max-w-4xl mx-auto">
                <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 transition-all duration-1000 transform ${
                  index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  <span className="text-white font-bold [text-shadow:_0_4px_8px_rgb(0_0_0_/_95%),_0_8px_16px_rgb(0_0_0_/_85%),_0_12px_24px_rgb(0_0_0_/_75%)]">
                    {slide.title}
                  </span>
                </h1>
                <p className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 sm:mb-6 md:mb-8 transition-all duration-1000 delay-300 transform ${
                  index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  <span className="text-white font-medium [text-shadow:_0_3px_6px_rgb(0_0_0_/_95%),_0_6px_12px_rgb(0_0_0_/_85%),_0_9px_18px_rgb(0_0_0_/_75%)]">
                    {slide.subtitle}
                  </span>
                </p>
                {slide.ctaText && slide.ctaLink && (
                  <a
                    href={slide.ctaLink}
                    className={`inline-block bg-white/95 backdrop-blur-md text-gray-900 px-4 py-2 sm:px-6 sm:py-3 md:px-10 md:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg border-2 border-white/80 shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 transform min-h-[44px] ${
                      index === currentSlide ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
                    }`}
                    style={{ transitionDelay: '600ms' }}
                  >
                    {slide.ctaText}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-1 sm:left-2 md:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 group touch-manipulation shadow-lg"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform duration-200 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-1 sm:right-2 md:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 group touch-manipulation shadow-lg"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform duration-200 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full touch-manipulation shadow-md ${
              index === currentSlide
                ? 'w-5 sm:w-6 md:w-8 lg:w-12 h-3 bg-white shadow-lg'
                : 'w-3 h-3 bg-white/70 hover:bg-white/90 shadow-sm'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-black/40 shadow-sm">
        <div
          className="h-full bg-white transition-all duration-100 ease-linear shadow-sm"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`
          }}
        />
      </div>
    </div>
  )
}
