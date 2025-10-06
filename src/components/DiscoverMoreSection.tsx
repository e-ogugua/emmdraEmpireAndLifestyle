import Link from 'next/link'

interface DiscoverCard {
  id: string
  title: string
  subtitle: string
  image: string
  link: string
  category: string
  featured?: boolean
}

const discoverCards: DiscoverCard[] = [
  {
    id: 'fashion-shop',
    title: 'Fashion Collection',
    subtitle: 'Discover trendy outfits and accessories for every occasion',
    image: '/images/EmmdraFashionShowcase.jpg',
    link: '/shop',
    category: 'Fashion',
    featured: true
  },
  {
    id: 'beauty-hub',
    title: 'Beauty & Wellness',
    subtitle: 'Premium skincare, haircare, and beauty essentials',
    image: '/images/EmmdraBeautyAndWellness.jpg',
    link: '/shop',
    category: 'Beauty',
    featured: true
  },
  {
    id: 'diy-tutorials',
    title: 'DIY Projects',
    subtitle: 'Step-by-step tutorials for creative crafts and home decor',
    image: '/images/EmmdraDIYCrafts.jpg',
    link: '/diy',
    category: 'DIY',
    featured: true
  },
  {
    id: 'lifestyle-blog',
    title: 'Lifestyle Stories',
    subtitle: 'Tips, trends, and inspiring stories from our community',
    image: '/images/EmmdraLifestyleStories.jpg',
    link: '/blog',
    category: 'Lifestyle',
    featured: true
  }
]

export default function DiscoverMoreSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Explore <span className="text-blue-600">Emmdra Empire</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From fashion that makes you shine to DIY projects that inspire creativity,
            discover everything that makes life more beautiful.
          </p>
        </div>

        {/* Featured Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {discoverCards.map((card) => (
            <Link
              key={card.id}
              href={card.link}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white"
            >
              {/* Card Image Container */}
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    card.category === 'Fashion' ? 'bg-pink-500 text-white' :
                    card.category === 'Beauty' ? 'bg-purple-500 text-white' :
                    card.category === 'DIY' ? 'bg-green-500 text-white' :
                    'bg-blue-500 text-white'
                  }`}>
                    {card.category}
                  </span>
                </div>

                {/* Featured Badge */}
                {card.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white">
                      Featured
                    </span>
                  </div>
                )}

                {/* Card Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-2 drop-shadow-lg">
                    {card.title}
                  </h3>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed drop-shadow">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              {/* Hover Effect Indicator */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white transition-all duration-300 rounded-2xl" />
            </Link>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="text-center bg-white rounded-3xl p-12 shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you are looking for the perfect outfit, beauty secrets, creative inspiration, or lifestyle tips — we have got you covered.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              📞 Get In Touch
            </Link>
            <Link
              href="/about"
              className="border-2 border-gray-800 text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 hover:text-white transition-all duration-300"
            >
              👨‍👩‍👧‍👦 Meet Our Family
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-6">Trusted by families across Nigeria</p>
            <div className="flex justify-center items-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">Expert Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
