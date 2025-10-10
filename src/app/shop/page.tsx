'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
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
  { id: 'Beauty', name: 'Beauty Hub' },
  { id: 'Workshops', name: 'Workshops & Training' }
]

function ShopPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const { addToCart, state: cartState } = useCart()

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

        // Use API route instead of direct Supabase call for better production reliability
        const response = await fetch('/api/products')

        if (!response.ok) {
          console.warn('⚠️ API route failed, falling back to static products')
          // Fallback to static products if API fails
          const staticProducts = [
            {
              id: 1,
              name: 'Premium Leather Handbag',
              short_description: 'Elegant genuine leather handbag with multiple compartments',
              description: 'Handcrafted from premium Nigerian leather with attention to detail. Features multiple compartments and adjustable strap.',
              price: 45000,
              image_url: '/images/PremiumLeatherHandBags.png',
              category: 'Accessories',
              featured: true,
              in_stock: true
            },
            {
              id: 2,
              name: 'Natural Hair Oil',
              short_description: 'Organic hair treatment with coconut and jojoba oils',
              description: 'Organic hair oil blend for healthy, shiny hair. Contains coconut, jojoba, and argan oils.',
              price: 12000,
              image_url: '/images/NaturalHairOil.png',
              category: 'Beauty',
              featured: false,
              in_stock: true
            },
            {
              id: 3,
              name: 'Ankara Print Blouse',
              short_description: 'Traditional meets modern with contemporary cut',
              description: 'Beautiful Ankara print blouse with contemporary cut. Perfect for office or casual wear.',
              price: 15000,
              image_url: '/images/AnkaraPrintBlouses.png',
              category: 'Fashion',
              featured: false,
              in_stock: true
            },
            {
              id: 4,
              name: 'Statement Earrings',
              short_description: 'Bold and beautiful earrings that add glamour',
              description: 'Eye-catching statement earrings that add glamour to any outfit. Available in gold and silver.',
              price: 8500,
              image_url: '/images/StatementEarrings.png',
              category: 'Accessories',
              featured: false,
              in_stock: true
            }
          ]
          setProducts(staticProducts)
          setFilteredProducts(staticProducts)
          return
        }

        const data = await response.json()

        if (data.error) {
          console.error('❌ Error from API:', data.error)
          setError('Failed to load products. Please try again later.')
          return
        }

        console.log('✅ Products fetched successfully:', data.count, 'products')
        setProducts(data.products || [])
        setFilteredProducts(data.products || [])
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
            className="bg-black text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300 min-h-[48px] flex items-center justify-center"
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
            src="/images/AdultWearsAndFashion.png"
            alt="Emmdra Shop Background - Fashion and Lifestyle Collection"
            fill
            className="object-cover object-center blur-[2px] scale-105"
            priority
            sizes="100vw"
          />
          {/* Elegant overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent"></div>
          {/* Brand color accent overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-yellow-900/30 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              <span className="text-cyan-300 font-bold [text-shadow:_0_4px_8px_rgb(0_0_0_/_100%),_0_8px_16px_rgb(0_0_0_/_90%)]">Discover</span>{' '}
              <span className="text-yellow-300 font-black [text-shadow:_0_5px_10px_rgb(0_0_0_/_100%),_0_10px_20px_rgb(0_0_0_/_90%),_0_15px_30px_rgb(0_0_0_/_80%)]">
                Shop Our Collection
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed drop-shadow-md px-2">
              <span className="text-cyan-300 font-medium [text-shadow:_0_4px_8px_rgb(0_0_0_/_100%),_0_8px_16px_rgb(0_0_0_/_90%)]">
                Discover quality fashion, beauty, and lifestyle products curated for the modern family.
              </span>
            </p>
          </div>

          {/* Cart Indicator */}
          {cartState.itemCount > 0 && (
            <div className="absolute top-4 right-4 z-30">
              <Link
                href="/cart"
                className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-4 py-2 rounded-full font-semibold text-sm hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
              >
                🛒 Cart ({cartState.itemCount})
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="py-8 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold transition-all duration-300 min-h-[44px] flex items-center justify-center transform hover:scale-105 hover:-translate-y-0.5 ${
                  selectedCategory === category.id
                    ? 'bg-brand-burnt-orange text-white shadow-lg hover:bg-brand-burnt-orange-light'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 hover:shadow-md'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-square bg-gray-200 relative">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder.png';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {product.name}
                    </h3>
                    {product.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full ml-2">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.short_description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      product.in_stock
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      if (product.in_stock) {
                        addToCart({
                          id: product.id.toString(),
                          name: product.name,
                          price: product.price,
                          image_url: product.image_url,
                          quantity: 1
                        })
                        // Show success feedback
                        const button = e.target as HTMLButtonElement
                        const originalText = button.textContent
                        button.textContent = '✓ Added!'
                        button.classList.add('bg-green-600', 'hover:bg-green-700')
                        setTimeout(() => {
                          button.textContent = originalText
                          button.classList.remove('bg-green-600', 'hover:bg-green-700')
                        }, 1500)
                      }
                    }}
                    className={`w-full mt-4 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 hover:-translate-y-0.5 ${
                      product.in_stock
                        ? 'bg-brand-burnt-orange text-white hover:bg-brand-burnt-orange-light hover:scale-105 shadow-md hover:shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!product.in_stock}
                  >
                    {product.in_stock ? '🛒 Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && !loading && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default function ShopPage() {
  return <ShopPageContent />
}
