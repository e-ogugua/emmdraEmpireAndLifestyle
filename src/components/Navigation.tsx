'use client'

import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-36">
          <Link href="/" className="flex items-center text-xl font-bold text-gray-800 hover:text-gray-900 transition-colors">
            <img
              src="/images/EmmdraLogo.png"
              alt="Emmdra Empire & Lifestyle"
              className="w-28 h-28 object-contain rounded-lg mr-4"
            />
            <div>
              <h3 className="text-3xl font-bold text-gray-800 leading-tight">Emmdra</h3>
              <p className="text-base font-medium text-gray-600 -mt-1">Empire & Lifestyle</p>
            </div>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/shop" className="text-gray-600 hover:text-gray-900">
              Shop
            </Link>
            <Link href="/diy" className="text-gray-600 hover:text-gray-900">
              DIY
            </Link>
            <Link href="/workshops" className="text-gray-600 hover:text-gray-900">
              Workshops
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
            <Link href="/admin" className="text-gray-600 hover:text-gray-900">
              Admin
            </Link>
          </div>

          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
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
