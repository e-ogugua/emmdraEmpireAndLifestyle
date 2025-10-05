export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/images/EmmdraLogo.png"
                alt="Emmdra Empire & Lifestyle Logo"
                className="w-16 h-16 object-contain rounded-lg"
              />
              <h3 className="text-xl font-bold text-white">Emmdra Empire & Lifestyle</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Your one-stop destination for fashion, creativity, and lifestyle.
              Discover amazing products and unleash your creative potential with us.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Shop', href: '/shop' },
                { name: 'DIY Projects', href: '/diy' },
                { name: 'Blog', href: '/blog' },
                { name: 'About', href: '/about' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-sm">info@emmdraempire.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Newsletter Signup Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
            <p className="text-sm">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} Emmdra Empire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
