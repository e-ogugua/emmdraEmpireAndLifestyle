'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { trackPageView } from '@/lib/analytics'

interface Product {
  id: number
  name: string
  short_description: string
  description: string
  price: number
  image_url: string
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

        console.log('📦 Supabase response:', { dataLength: data?.length, error: supabaseError })

        if (supabaseError) {
          console.error('❌ Error fetching products:', supabaseError)
          setError('Failed to load products. Please try again later.')
          return
        }

        console.log('✅ Products fetched successfully:', data?.length || 0, 'products')
        setProducts(data || [])
      } catch (err) {
        console.error('❌ Error fetching products:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
        console.log('🔄 Loading state set to false')
      }
    }

    fetchProducts()
  }, [])

  console.log('🏪 ShopPage render - State:', { 
    loading, 
    error: error ? 'HAS ERROR' : 'NO ERROR', 
    productsCount: products.length 
  })

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
    <div className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            Shop Our Collection
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover quality fashion, beauty, and lifestyle products
          </p>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                {/* Product Image */}
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
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
                    <a
                      href={`/shop/${product.id}`}
                      className="bg-black text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors duration-200"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Products Available</h2>
            <p className="text-gray-600">Check back later for new products.</p>
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
        <div className="text-center mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Need Help Finding Something?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team is here to help you find the perfect items for your needs.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gray-800 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-700 transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
