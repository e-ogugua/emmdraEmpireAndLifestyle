'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import AdminLayout from '@/components/AdminLayout'
import { trackPageView } from '@/lib/analytics'

const categories = [
  'Fashion',
  'Beauty',
  'Accessories',
  'Kids Fashion',
  'Home Decor',
  'Workshops'
]

interface Product {
  id: number
  name: string
  price: number
  short_description: string
  description: string
  category: string
  image_url: string
  featured: boolean
  in_stock: boolean
  created_at: string
}

export default function EditProduct({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    short_description: '',
    description: '',
    category: '',
    image_url: '',
    featured: false,
    in_stock: true
  })
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [error, setError] = useState('')
  const [imageError, setImageError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setFetchLoading(true)
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) throw error

        if (data) {
          setProduct(data)
          setFormData({
            name: data.name,
            price: data.price.toString(),
            short_description: data.short_description || '',
            description: data.description || '',
            category: data.category,
            image_url: data.image_url,
            featured: data.featured,
            in_stock: data.in_stock
          })
        }
      } catch (err: unknown) {
        console.error('Error fetching product:', err)
        setError('Product not found or failed to load.')
      } finally {
        setFetchLoading(false)
      }
    }

    fetchProduct()
    trackPageView({ page_type: 'product' })
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        featured: Boolean(formData.featured),
        in_stock: Boolean(formData.in_stock)
      }

      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', params.id)

      if (error) throw error

      router.push('/admin/products')
    } catch (err: unknown) {
      console.error('Error updating product:', err)
      setError('Failed to update product. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  if (fetchLoading) {
    return (
      <AdminLayout currentPage="products">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
        </div>
      </AdminLayout>
    )
  }

  if (error && !product) {
    return (
      <AdminLayout currentPage="products">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/admin/products')}
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout currentPage="products">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-600 mt-1">Update product information and settings</p>
          </div>
          <button
            onClick={() => router.push('/admin/products')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to Products
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Premium Leather Handbag"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₦) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="45000"
                />
              </div>

              <div>
                <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL *
                </label>
                <input
                  type="url"
                  id="image_url"
                  name="image_url"
                  required
                  value={formData.image_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="/images/Accessories.png"
                />
                {formData.image_url && !imageError && (
                  <div className="mt-2">
                    <Image
                      src={formData.image_url}
                      alt="Product preview"
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover rounded-lg border"
                      onError={() => setImageError(true)}
                      unoptimized
                    />
                  </div>
                )}
                {formData.image_url && imageError && (
                  <div className="mt-2">
                    <Image
                      src="/images/placeholder.png"
                      alt="Product preview"
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Descriptions */}
            <div className="space-y-4">
              <div>
                <label htmlFor="short_description" className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <input
                  type="text"
                  id="short_description"
                  name="short_description"
                  required
                  value={formData.short_description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Elegant genuine leather handbag"
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.short_description.length}/100 characters
                </p>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Detailed description of the product..."
                />
              </div>
            </div>

            {/* Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                  Mark as Featured (shows on homepage)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="in_stock"
                  name="in_stock"
                  checked={formData.in_stock}
                  onChange={handleChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor="in_stock" className="ml-2 block text-sm text-gray-700">
                  In Stock (available for purchase)
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/admin/products')}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating Product...' : 'Update Product'}
              </button>
            </div>
          </form>
        </div>

        {/* Product Info */}
        {product && (
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Product Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Created:</p>
                <p className="font-medium">{new Date(product.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Current Status:</p>
                <p className="font-medium">
                  {product.featured && '⭐ Featured'} {product.in_stock ? '📦 In Stock' : '❌ Out of Stock'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
