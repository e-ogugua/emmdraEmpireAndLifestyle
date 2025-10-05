'use client'

import { useState, useEffect } from 'react'

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

interface ProductFormModalProps {
  mode: 'add' | 'edit'
  product: Product | null
  onSubmit: (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  onClose: () => void
}

export default function ProductFormModal({ mode, product, onSubmit, onClose }: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    short_description: '',
    description: '',
    price: '',
    image_url: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (product && mode === 'edit') {
      setFormData({
        name: product.name,
        short_description: product.short_description,
        description: product.description,
        price: product.price.toString(),
        image_url: product.image_url
      })
    } else {
      setFormData({
        name: '',
        short_description: '',
        description: '',
        price: '',
        image_url: ''
      })
    }
    setErrors({})
  }, [product, mode])

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

      // Show success message
      const successMessage = mode === 'edit' ? 'Product updated successfully!' : 'Product added successfully!'
      alert(successMessage)

    } catch (error) {
      console.error('Form submission error:', error)
      const errorMessage = mode === 'edit' ? 'Failed to update product' : 'Failed to add product'
      alert(errorMessage)
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {mode === 'edit' ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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

            {/* Image Preview */}
            {formData.image_url && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <div className="relative">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder.png'
                    }}
                  />
                </div>
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
                  {mode === 'edit' ? 'Updating...' : 'Adding...'}
                </span>
              ) : (
                mode === 'edit' ? 'Update Product' : 'Add Product'
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
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
