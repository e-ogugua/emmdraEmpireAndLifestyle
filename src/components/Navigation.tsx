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
    <nav className="bg-gradient-to-r from-white via-gray-50 to-white shadow-2xl border-b border-gradient-to-r from-transparent via-blue-100 to-transparent backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 sm:h-20 md:h-24 lg:h-32">
          <Link href="/" className="flex items-center text-xl font-bold text-gray-800 hover:text-gray-900 transition-all duration-500 group relative">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mr-3 sm:mr-4 md:mr-5">
              <div className="absolute inset-0 bg-white rounded-full shadow-lg border-2 sm:border-3 md:border-4 border-white group-hover:border-blue-200 transition-all duration-300"></div>
              <Image
                src="/images/EmmdraLogo.png"
                alt="Emmdra Empire & Lifestyle"
                fill
                priority
                unoptimized={true}
                className="object-contain p-1 sm:p-2 rounded-full transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
              />
            </div>
            <div className="hidden sm:block">
              <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-800 leading-tight group-hover:from-green-600 group-hover:via-emerald-600 group-hover:to-green-800 transition-all duration-500">Emmdra</h3>
              <p className="text-lg font-semibold text-slate-600 -mt-2 group-hover:text-slate-800 transition-all duration-300">Empire & Lifestyle</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {[
              { name: 'Home', href: '/', color: 'blue' },
              { name: 'Shop', href: '/shop', color: 'blue' },
              { name: 'DIY', href: '/diy', color: 'blue' },
              { name: 'Blog', href: '/blog', color: 'blue' },
              { name: 'Workshops', href: '/workshops', color: 'blue' },
              { name: 'About', href: '/about', color: 'blue' },
              { name: 'Contact', href: '/contact', color: 'blue' },
              { name: 'Admin', href: '/admin', color: 'green' }
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  item.color === 'green'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
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
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
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
