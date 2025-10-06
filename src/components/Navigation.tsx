'use client'

import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-xl border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-36">
          <Link href="/" className="flex items-center text-xl font-bold text-gray-800 hover:text-gray-900 transition-all duration-300 group">
            <img
              src="/images/EmmdraLogo.png"
              alt="Emmdra Empire & Lifestyle"
              className="w-28 h-28 object-contain rounded-xl mr-4 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <h3 className="text-3xl font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors duration-300">Emmdra</h3>
              <p className="text-base font-medium text-gray-600 -mt-1 group-hover:text-gray-700 transition-colors duration-300">Empire & Lifestyle</p>
            </div>
          </Link>

          <div className="hidden md:flex space-x-1">
            <Link href="/" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group">
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/diy" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group">
              DIY
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/workshops" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group">
              Workshops
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group border border-green-200">
              Admin
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-all duration-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
