'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  short_description: string
  description: string
  price: number
  image_url: string
  created_at: string
  updated_at: string
}

interface ProductFormProps {
  product: Product | null
  onSubmit: (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  onCancel: () => void
  isEditing: boolean
}

export default function ProductForm({ product, onSubmit, onCancel, isEditing }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    short_description: '',
    description: '',
    price: '',
    image_url: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        short_description: product.short_description,
        description: product.description,
        price: product.price.toString(),
        image_url: product.image_url
      })
      setImageError(false)
    } else {
      setFormData({
        name: '',
        short_description: '',
        description: '',
        price: '',
        image_url: ''
      })
      setImageError(false)
    }
    setErrors({})
  }, [product])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required'
    }

    if (!formData.short_description.trim()) {
      newErrors.short_description = 'Short description is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required'
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Please enter a valid price'
    }

    if (!formData.image_url.trim()) {
      newErrors.image_url = 'Image URL is required'
    } else if (!formData.image_url.match(/^https?:\/\/.+/)) {
      newErrors.image_url = 'Please enter a valid URL'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setSubmitting(true)

    try {
      const productData = {
        name: formData.name.trim(),
        short_description: formData.short_description.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        image_url: formData.image_url.trim()
      }

      await onSubmit(productData)
    } catch (error) {
      console.error('Form submission error:', error)
      setErrors({ submit: 'Failed to save product. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
          <p className="text-gray-600">
            {isEditing ? 'Update the product information below.' : 'Fill in the details to add a new product.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Short Description */}
          <div>
            <label htmlFor="short_description" className="block text-sm font-medium text-gray-700 mb-2">
              Short Description *
            </label>
            <input
              type="text"
              id="short_description"
              value={formData.short_description}
              onChange={(e) => handleInputChange('short_description', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.short_description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Brief description (shown in product cards)"
            />
            {errors.short_description && <p className="text-red-500 text-sm mt-1">{errors.short_description}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Detailed product description"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
              Price (₦) *
            </label>
            <input
              type="number"
              id="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleInputChange('price', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          {/* Image URL */}
          <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
              Image URL *
            </label>
            <input
              type="url"
              id="image_url"
              value={formData.image_url}
              onChange={(e) => handleInputChange('image_url', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.image_url ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image_url && <p className="text-red-500 text-sm mt-1">{errors.image_url}</p>}
            {formData.image_url && !imageError && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <Image
                  src={formData.image_url}
                  alt="Preview"
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded-lg border"
                  onError={() => setImageError(true)}
                  unoptimized
                />
              </div>
            )}
            {formData.image_url && imageError && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <Image
                  src="/images/placeholder.png"
                  alt="Preview"
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isEditing ? 'Updating...' : 'Adding...'}
                </span>
              ) : (
                isEditing ? 'Update Product' : 'Add Product'
              )}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
