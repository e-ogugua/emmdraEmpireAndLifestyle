'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center min-h-[64px] sm:h-20">
          <Link href="/" className="flex items-center text-xl font-bold text-gray-800 hover:text-gray-900 transition-all duration-300">
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 mr-2 sm:mr-4">
              <div className="absolute inset-0 bg-white rounded-full shadow-md border border-gray-200"></div>
              <Image
                src="/images/EmmdraLogo.png"
                alt="Emmdra Empire & Lifestyle"
                fill
                priority
                unoptimized={true}
                className="object-contain p-1 sm:p-2 rounded-full"
                sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, 96px"
              />
            </div>
            <div className="hidden sm:block">
              <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600 leading-tight">Emmdra</h3>
              <p className="text-xs sm:text-sm font-medium text-gray-600 -mt-1">Empire & Lifestyle</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { name: 'Home', href: '/' },
              { name: 'Shop', href: '/shop' },
              { name: 'DIY', href: '/diy' },
              { name: 'Blog', href: '/blog' },
              { name: 'Workshops', href: '/workshops' },
              { name: 'About', href: '/about' },
              { name: 'Contact', href: '/contact' }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200 border border-transparent hover:border-emerald-100 min-h-[44px] flex items-center"
              >
                {item.name}
              </Link>
            ))}

            {/* Admin Button - Different Style */}
            <Link
              href="/admin"
              className="ml-3 sm:ml-4 px-4 sm:px-6 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-sm font-medium rounded-lg hover:from-emerald-700 hover:to-green-700 transition-all duration-200 shadow-sm hover:shadow-md min-h-[44px] flex items-center"
            >
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 min-h-[44px] min-w-[44px]"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {[
              { name: 'Home', href: '/' },
              { name: 'Shop', href: '/shop' },
              { name: 'DIY', href: '/diy' },
              { name: 'Blog', href: '/blog' },
              { name: 'Workshops', href: '/workshops' },
              { name: 'About', href: '/about' },
              { name: 'Contact', href: '/contact' },
              { name: 'Admin', href: '/admin' }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-3 sm:py-4 rounded-lg text-base font-medium transition-colors duration-200 min-h-[48px] flex items-center ${item.name === 'Admin'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
                onClick={closeMobileMenu}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
