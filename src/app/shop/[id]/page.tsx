'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
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
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-96 lg:h-full object-cover"
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

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors duration-300">
                  Add to Cart
                </button>
                <Link
                  href="/shop"
                  className="flex-1 bg-gray-200 text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-300 transition-colors duration-300 text-center"
                >
                  Continue Shopping
                </Link>
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
                    <img
                      src={relatedProduct.image_url}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
