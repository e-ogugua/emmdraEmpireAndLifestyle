'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/cart-context'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { state: cartState } = useCart()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xl border-b border-brand-burnt-orange/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center min-h-[64px] sm:h-20">
          <Link href="/" className="flex items-center text-xl font-bold text-gray-800 hover:text-gray-900 transition-all duration-300 group relative overflow-hidden">
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 mr-2 sm:mr-4">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 to-amber-200/20 rounded-full shadow-2xl border-2 border-yellow-400/60 group-hover:border-amber-400/80 transition-all duration-300"
                   style={{
                     boxShadow: '0 0 20px rgba(251, 191, 36, 0.3), 0 0 40px rgba(245, 158, 11, 0.2), inset 0 0 20px rgba(251, 191, 36, 0.1)'
                   }}></div>
              <Image
                src="/images/EmmdraLogo.png"
                alt="Emmdra Empire & Lifestyle"
                fill
                priority
                unoptimized={true}
                className="object-contain p-1 sm:p-2 rounded-full group-hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, 96px"
              />
            </div>
            <div className="block sm:block">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-burnt-orange via-brand-vibrant-green to-brand-dark-teal leading-tight drop-shadow-sm group-hover:from-orange-500 group-hover:via-orange-400 group-hover:to-pink-500 transition-all duration-300">Emmdra</h3>
              <p className="text-sm sm:text-base font-medium text-gray-600 -mt-1">Empire & Lifestyle</p>
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
                className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 hover:text-white rounded-lg transition-all duration-300 border border-transparent hover:border-orange-400 min-h-[44px] flex items-center shadow-sm hover:shadow-lg transform hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden group hover:bg-gradient-to-r hover:from-orange-500 hover:via-orange-400 hover:to-pink-500"
              >
                {item.name}
              </Link>
            ))}

            {/* Cart Indicator - Desktop */}
            <Link
              href="/cart"
              className="ml-2 relative bg-gradient-to-r from-brand-burnt-orange to-red-500 text-white px-3 py-2 rounded-lg font-semibold text-sm hover:from-red-500 hover:to-brand-burnt-orange transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-brand-burnt-orange/50 hover:border-red-400/50 min-h-[44px] flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5h13M12 18a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {cartState.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                  {cartState.itemCount > 99 ? '99+' : cartState.itemCount}
                </span>
              )}
              <span className="hidden lg:inline">Cart</span>
            </Link>

            {/* Admin Button - Different Style */}
            <Link
              href="/admin"
              className="ml-4 bg-gradient-to-r from-brand-dark-teal to-brand-vibrant-green text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-brand-vibrant-green hover:to-brand-dark-teal transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-brand-dark-teal/50 hover:border-brand-vibrant-green/50 min-h-[44px] flex items-center"
            >
              Admin
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Cart Indicator - Mobile */}
            <Link
              href="/cart"
              className="relative bg-gradient-to-r from-brand-burnt-orange to-red-500 text-white p-2 rounded-lg font-semibold hover:from-red-500 hover:to-brand-burnt-orange transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-brand-burnt-orange/50 hover:border-red-400/50 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5h13M12 18a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {cartState.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartState.itemCount > 9 ? '9+' : cartState.itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-brand-burnt-orange hover:bg-brand-burnt-orange/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-burnt-orange/50 min-h-[44px] min-w-[44px] transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
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
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-brand-burnt-orange/20 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
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
                className="block px-3 py-3 sm:py-4 rounded-lg text-base font-medium transition-all duration-300 min-h-[48px] flex items-center transform hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden group text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:via-orange-400 hover:to-pink-500 border border-transparent hover:border-orange-400"
                onClick={closeMobileMenu}
              >
                {item.name}
              </Link>
            ))}

            {/* Cart Link - Mobile */}
            <Link
              href="/cart"
              className="block px-3 py-3 sm:py-4 rounded-lg text-base font-medium transition-all duration-300 min-h-[48px] flex items-center transform hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden group bg-gradient-to-r from-brand-burnt-orange to-red-500 text-white hover:from-red-500 hover:to-brand-burnt-orange border-2 border-brand-burnt-orange/50 hover:border-red-400/50 shadow-lg"
              onClick={closeMobileMenu}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5h13M12 18a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              Cart ({cartState.itemCount})
            </Link>

            {/* Admin Button - Mobile */}
            <Link
              href="/admin"
              className="block px-3 py-3 sm:py-4 rounded-lg text-base font-medium transition-all duration-300 min-h-[48px] flex items-center transform hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden group bg-gradient-to-r from-brand-dark-teal to-brand-vibrant-green text-white hover:from-brand-vibrant-green hover:to-brand-dark-teal shadow-lg border-2 border-brand-dark-teal/50 hover:border-brand-vibrant-green/50"
              onClick={closeMobileMenu}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
