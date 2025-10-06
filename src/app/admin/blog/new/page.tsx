'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import AdminLayout from '@/components/AdminLayout'
import { trackPageView } from '@/lib/analytics'

const categories = [
  'Fashion',
  'Beauty',
  'Lifestyle',
  'DIY'
]

export default function AddBlogPost() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    featured_image: '',
    excerpt: '',
    body: '',
    tags: '',
    published: false,
    featured: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const blogData = {
        ...formData,
        tags: tagsArray,
        published: Boolean(formData.published),
        featured: Boolean(formData.featured)
      }

      const { data, error } = await supabase
        .from('blogs')
        .insert([blogData])
        .select()

      if (error) throw error

      router.push('/admin/blog')
    } catch (err: any) {
      console.error('Error adding blog post:', err)
      setError(err.message || 'Failed to add blog post. Please try again.')
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

  return (
    <AdminLayout currentPage="blog">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Write New Blog Post</h1>
            <p className="text-gray-600 mt-1">Create engaging content for your audience</p>
          </div>
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to Blog
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Post Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="5 Essential Fashion Tips for Nigerian Weather"
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
                    <option key={category} value={category.toLowerCase()}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL *
                </label>
                <input
                  type="url"
                  id="featured_image"
                  name="featured_image"
                  required
                  value={formData.featured_image}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="/images/EmmdraFashionDesignAndAccessories.png"
                />
                {formData.featured_image && (
                  <div className="mt-2">
                    <img
                      src={formData.featured_image}
                      alt="Featured image preview"
                      className="h-32 w-48 object-cover rounded-lg border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder.png'
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="fashion, nigerian style, summer fashion"
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
                name="excerpt"
                required
                rows={3}
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Brief summary of your blog post that will appear in previews..."
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.excerpt.length}/200 characters
              </p>
            </div>

            {/* Blog Body - Rich Text Editor Placeholder */}
            <div>
              <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
                Blog Content *
              </label>
              <div className="border border-gray-300 rounded-lg p-4 min-h-[400px]">
                <div className="mb-4 border-b border-gray-200 pb-4">
                  <div className="flex space-x-2">
                    <button type="button" className="px-3 py-1 text-sm bg-gray-100 rounded">B</button>
                    <button type="button" className="px-3 py-1 text-sm bg-gray-100 rounded">I</button>
                    <button type="button" className="px-3 py-1 text-sm bg-gray-100 rounded">Link</button>
                    <button type="button" className="px-3 py-1 text-sm bg-gray-100 rounded">Image</button>
                  </div>
                </div>
                <textarea
                  id="body"
                  name="body"
                  required
                  rows={15}
                  value={formData.body}
                  onChange={handleChange}
                  className="w-full resize-none focus:outline-none"
                  placeholder="Write your blog post content here... You can use Markdown formatting."
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 Tip: Use Markdown formatting for better content structure
              </p>
            </div>

            {/* Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
                  Publish immediately (visible to public)
                </label>
              </div>

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
                  Mark as Featured (shows prominently)
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
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Publishing Post...' : 'Publish Blog Post'}
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">✍️ Writing Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">Content Structure:</h4>
              <ul className="space-y-1">
                <li>• Start with a compelling introduction</li>
                <li>• Use clear headings and subheadings</li>
                <li>• Include practical tips and actionable advice</li>
                <li>• End with a strong conclusion</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">SEO Best Practices:</h4>
              <ul className="space-y-1">
                <li>• Use relevant keywords in title and content</li>
                <li>• Write descriptive excerpts for previews</li>
                <li>• Add appropriate tags for categorization</li>
                <li>• Use high-quality featured images</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
