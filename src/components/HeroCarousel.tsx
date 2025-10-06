'use client'

import { useState, useEffect } from 'react'

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
    <div className={`relative w-full h-[400px] md:h-[65vh] overflow-hidden transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              loading={index === 0 ? 'eager' : 'lazy'}
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white px-4 max-w-4xl mx-auto">
                <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-1000 transform drop-shadow-2xl ${
                  index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  {slide.title}
                </h1>
                <p className={`text-lg md:text-xl lg:text-2xl mb-8 transition-all duration-1000 delay-300 transform drop-shadow-xl ${
                  index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  {slide.subtitle}
                </p>
                {slide.ctaText && slide.ctaLink && (
                  <a
                    href={slide.ctaLink}
                    className={`inline-block bg-white/90 backdrop-blur-md text-gray-900 px-8 py-4 rounded-full font-semibold text-lg border-2 border-white/50 shadow-2xl hover:bg-white hover:scale-105 transition-all duration-300 transform ${
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
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 md:w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-black/20">
        <div
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`
          }}
        />
      </div>
    </div>
  )
}
