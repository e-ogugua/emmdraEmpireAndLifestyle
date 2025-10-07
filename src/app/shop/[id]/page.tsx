'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

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

interface ProductDetailsPageProps {
  params: {
    id: string
  }
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true)
        setError(null)

        const productId = parseInt(params.id)

        // Fetch the main product
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single()

        if (productError) {
          if (productError.code === 'PGRST116') {
            setError('Product not found')
          } else {
            setError('Error loading product')
          }
          return
        }

        if (!productData) {
          setError('Product not found')
          return
        }

        setProduct(productData)

        // Fetch related products (excluding current product)
        const { data: relatedData, error: relatedError } = await supabase
          .from('products')
          .select('*')
          .neq('id', productId)
          .limit(3)

        if (relatedError) {
          console.error('Error fetching related products:', relatedError)
        } else {
          setRelatedProducts(relatedData || [])
        }

      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Error loading product')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProductData()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading product...</p>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {error === 'Product not found' ? 'Product Not Found' : 'Error'}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {error === 'Product not found'
              ? "The product you're looking for doesn't exist."
              : "There was an error loading the product. Please try again."
            }
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Back to Shop Link */}
        <div className="mb-6">
          <Link
            href="/shop"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Shop
          </Link>
        </div>

        {/* Product Details - Two Column Layout */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column - Product Image */}
            <div className="relative">
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="w-full h-96 lg:h-full object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Right Column - Product Info */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>

              <p className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                ₦{product.price.toLocaleString()}
              </p>

              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                {product.short_description}
              </p>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Product Features */}
              <div className="mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <svg className="w-6 h-6 mx-auto mb-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium">Premium Quality</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <svg className="w-6 h-6 mx-auto mb-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium">Fast Delivery</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <svg className="w-6 h-6 mx-auto mb-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium">Expert Support</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <svg className="w-6 h-6 mx-auto mb-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium">Satisfaction Guaranteed</p>
                  </div>
                </div>
              </div>

              {/* Enhanced CTA Buttons - Soft-Sell Approach */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                  >
                    📞 Contact to Buy
                  </Link>
                  {product.category === 'Fashion' && (
                    <Link
                      href="/contact"
                      className="flex-1 bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-pink-700 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                    >
                      💃 Book Styling Session
                    </Link>
                  )}
                  {product.category === 'Beauty' && (
                    <Link
                      href="/contact"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                    >
                      ✨ Book Beauty Consultation
                    </Link>
                  )}
                  {product.category === 'Workshops' && (
                    <Link
                      href="/contact"
                      className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                    >
                      🎨 Book Training Session
                    </Link>
                  )}
                  {(!product.category || product.category === 'Accessories' || product.category === 'Kids Fashion') && (
                    <Link
                      href="/contact"
                      className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                    >
                      📞 Get In Touch
                    </Link>
                  )}
                </div>

                <div className="text-center">
                  <Link
                    href="/shop"
                    className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-8">
              You May Also Like
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/shop/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={relatedProduct.image_url}
                      alt={relatedProduct.name}
                      fill
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-gray-900">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {relatedProduct.short_description}
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      ₦{relatedProduct.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
