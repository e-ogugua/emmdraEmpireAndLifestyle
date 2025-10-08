'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface BlogPost {
  id: number
  title: string
  category: string
  excerpt: string
  content: string
  featured_image: string
  published_at: string
  created_at: string
  updated_at: string
}

interface BlogFormModalProps {
  mode: 'add' | 'edit'
  blog: BlogPost | null
  onSubmit: (blogData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  onClose: () => void
}

const categories = [
  'Fashion',
  'Family',
  'Beauty',
  'Lifestyle'
]

export default function BlogFormModal({ mode, blog, onSubmit, onClose }: BlogFormModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Fashion',
    excerpt: '',
    content: '',
    featured_image: '',
    published_at: new Date().toISOString().split('T')[0] // Today's date
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (blog && mode === 'edit') {
      setFormData({
        title: blog.title,
        category: blog.category,
        excerpt: blog.excerpt,
        content: blog.content,
        featured_image: blog.featured_image,
        published_at: blog.published_at.split('T')[0]
      })
      setImageError(false)
    } else {
      setFormData({
        title: '',
        category: 'Fashion',
        excerpt: '',
        content: '',
        featured_image: '',
        published_at: new Date().toISOString().split('T')[0]
      })
      setImageError(false)
    }
    setErrors({})
  }, [blog, mode])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required'
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required'
    }

    if (!formData.featured_image.trim()) {
      newErrors.featured_image = 'Cover image URL is required'
    } else if (!formData.featured_image.match(/^https?:\/\/.+/)) {
      newErrors.featured_image = 'Please enter a valid URL'
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
      const blogData = {
        title: formData.title.trim(),
        category: formData.category,
        excerpt: formData.excerpt.trim(),
        content: formData.content.trim(),
        featured_image: formData.featured_image.trim(),
        published_at: new Date(formData.published_at).toISOString()
      }

      await onSubmit(blogData)

      // Show success message
      const successMessage = mode === 'edit' ? 'Blog post updated successfully!' : 'Blog post created successfully!'
      alert(successMessage)

    } catch (error) {
      console.error('Form submission error:', error)
      const errorMessage = mode === 'edit' ? 'Failed to update blog post' : 'Failed to create blog post'
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
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {mode === 'edit' ? 'Edit Blog Post' : 'Create New Blog Post'}
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
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter blog post title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Category and Published Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="published_at" className="block text-sm font-medium text-gray-700 mb-2">
                Published Date *
              </label>
              <input
                type="date"
                id="published_at"
                value={formData.published_at}
                onChange={(e) => handleInputChange('published_at', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              rows={3}
              value={formData.excerpt}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.excerpt ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Brief description that will appear in blog listings"
            />
            {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>}
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <textarea
              id="content"
              rows={8}
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Full blog post content (supports basic HTML/markdown)"
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
          </div>

          {/* Cover Image URL */}
          <div>
            <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image URL *
            </label>
            <input
              type="url"
              id="featured_image"
              value={formData.featured_image}
              onChange={(e) => handleInputChange('featured_image', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.featured_image ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://example.com/cover-image.jpg"
            />
            {errors.featured_image && <p className="text-red-500 text-sm mt-1">{errors.featured_image}</p>}

            {/* Image Preview */}
            {formData.featured_image && !imageError && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <div className="relative">
                  <Image
                    src={formData.featured_image}
                    alt="Cover Preview"
                    width={192}
                    height={128}
                    className="w-48 h-32 object-cover rounded-lg border"
                    onError={() => setImageError(true)}
                    unoptimized
                  />
                </div>
              </div>
            )}
            {formData.featured_image && imageError && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <div className="relative">
                  <Image
                    src="/images/placeholder.png"
                    alt="Cover Preview"
                    width={192}
                    height={128}
                    className="w-48 h-32 object-cover rounded-lg border"
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
                  {mode === 'edit' ? 'Updating...' : 'Creating...'}
                </span>
              ) : (
                mode === 'edit' ? 'Update Blog Post' : 'Create Blog Post'
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
