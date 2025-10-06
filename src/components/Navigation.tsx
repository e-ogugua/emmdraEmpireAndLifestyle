'use client'

import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-gradient-to-r from-white via-gray-50 to-white shadow-2xl border-b border-gradient-to-r from-transparent via-blue-100 to-transparent backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-40">
          <Link href="/" className="flex items-center text-xl font-bold text-gray-800 hover:text-gray-900 transition-all duration-500 group relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <img
                src="/images/EmmdraLogo.png"
                alt="Emmdra Empire & Lifestyle"
                className="relative w-32 h-32 object-contain rounded-2xl p-2 bg-white shadow-lg mr-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl"
              />
            </div>
            <div className="hidden sm:block">
              <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 leading-tight group-hover:from-purple-600 group-hover:via-blue-600 group-hover:to-purple-800 transition-all duration-500">Emmdra</h3>
              <p className="text-lg font-semibold text-gray-600 -mt-2 group-hover:text-gray-800 transition-all duration-300">Empire & Lifestyle</p>
            </div>
          </Link>

          <div className="hidden md:flex space-x-2">
            {[
              { name: 'Home', href: '/', color: 'blue' },
              { name: 'Shop', href: '/shop', color: 'blue' },
              { name: 'DIY', href: '/diy', color: 'blue' },
              { name: 'Workshops', href: '/workshops', color: 'blue' },
              { name: 'About', href: '/about', color: 'blue' },
              { name: 'Contact', href: '/contact', color: 'blue' },
              { name: 'Admin', href: '/admin', color: 'green' }
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 group overflow-hidden ${
                  link.color === 'green'
                    ? 'text-green-700 hover:text-white bg-green-50 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 border border-green-200 hover:border-green-400'
                    : 'text-gray-700 hover:text-white bg-gray-50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 border border-gray-200 hover:border-blue-400'
                }`}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">{link.name}</span>
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  link.color === 'green'
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                    : 'bg-gradient-to-r from-blue-400 to-purple-500'
                }`}></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button className="relative p-3 rounded-xl text-gray-700 hover:text-white bg-gray-100 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300 group border border-gray-200 hover:border-blue-400">
              <svg className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative gradient line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
    </nav>
  )
}
