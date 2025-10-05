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
    title: 'Welcome to Emmdra Empire',
    subtitle: 'Discover amazing products and experiences',
    ctaText: 'Shop Now',
    ctaLink: '/shop'
  },
  {
    id: 2,
    image: '/images/heroslide2image.jpg',
    title: 'DIY Projects & Crafts',
    subtitle: 'Unleash your creativity with our tutorials',
    ctaText: 'Explore DIY',
    ctaLink: '/diy'
  },
  {
    id: 3,
    image: '/images/heroSlide3Image.png',
    title: 'Fashion & Accessories',
    subtitle: 'Style that speaks to your soul',
    ctaText: 'View Collection',
    ctaLink: '/shop'
  }
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      zIndex: 1
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
            }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />

            {/* Carousel Navigation Only - No Text Overlay */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              &#8249;
            </button>

            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              &#8250;
            </button>

            {/* Dot Indicators */}
            <div style={{
              position: 'absolute',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '12px',
              zIndex: 10
            }}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
