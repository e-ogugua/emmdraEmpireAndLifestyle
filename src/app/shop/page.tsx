'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { trackPageView } from '@/lib/analytics'

interface Product {
  id: number
  name: string
  short_description: string
  description: string
  price: number
  image_url: string
  category?: string
  featured?: boolean
  in_stock?: boolean
  created_at?: string
  updated_at?: string
}

const categories = [
  { id: 'All', name: 'All Products' },
  { id: 'Fashion', name: 'Adult Wears' },
  { id: 'Kids Fashion', name: 'Kiddies Wears' },
  { id: 'Accessories', name: 'Accessories' },
  { id: 'Beauty', name: 'Beauty Hub' },
  { id: 'Workshops', name: 'Workshops & Training' }
]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  useEffect(() => {
    // Track shop page view
    trackPageView({
      page_type: 'shop',
      page_title: 'Shop - Emmdra Empire'
    })
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('🛒 Starting to fetch products...')
        setLoading(true)
        setError(null)

        const { data, error: supabaseError } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true })

        if (supabaseError) {
          console.error('❌ Error fetching products:', supabaseError)
          setError('Failed to load products. Please try again later.')
          return
        }

        console.log('✅ Products fetched successfully:', data?.length || 0, 'products')
        setProducts(data || [])
        setFilteredProducts(data || [])
      } catch (err) {
        console.error('❌ Error fetching products:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter products by category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory))
    }
  }, [selectedCategory, products])

  if (loading) {
    return (
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Error Loading Products</h1>
          <p className="text-lg text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Hero Section with Beautiful Background */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/PremiumLeatherHandbags.png"
            alt="Emmdra Shop Background - Premium Fashion Collection"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Elegant overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent"></div>
          {/* Brand color accent overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-blue-900/30 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto relative z-10">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Shop Our Collection
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-md px-2">
              Discover quality fashion, beauty, and lifestyle products curated for the modern family.
            </p>
          </div>

        {/* Category Filter Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                {/* Product Image */}
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={400}
                    height={256}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />

                  {/* Category Badge */}
                  {product.category && (
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        product.category === 'Fashion' ? 'bg-pink-500 text-white' :
                        product.category === 'Beauty' ? 'bg-purple-500 text-white' :
                        product.category === 'Accessories' ? 'bg-blue-500 text-white' :
                        product.category === 'Kids Fashion' ? 'bg-orange-500 text-white' :
                        'bg-gray-500 text-white'
                      }`}>
                        {product.category}
                      </span>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {product.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Stock Status */}
                  {!product.in_stock && (
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {product.short_description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-800">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <Link
                      href={`/shop/${product.id}`}
                      className="bg-black text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Products in This Category</h2>
            <p className="text-gray-600 mb-6">Try selecting a different category or check back later for new products.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
            >
              View All Products
            </button>
          </div>
        )}

        {/* Pagination Placeholder */}
        <div className="flex items-center justify-center space-x-2 mt-12">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200">
            Previous
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors duration-200">
            1
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200">
            2
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200">
            Next
          </button>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-white rounded-3xl p-12 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Need Help Finding Something?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team is here to help you find the perfect items for your needs. Whether it&apos;s styling advice, product recommendations, or custom orders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              📞 Contact Us
            </Link>
            <Link
              href="/about"
              className="border-2 border-gray-800 text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 hover:text-white transition-all duration-300"
            >
              👨‍👩‍👧‍👦 Learn About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
