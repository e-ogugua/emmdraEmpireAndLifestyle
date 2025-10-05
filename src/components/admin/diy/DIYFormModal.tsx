'use client'

import { useState, useEffect } from 'react'

interface DIYTutorial {
  id: number
  title: string
  category: string
  difficulty: string
  excerpt: string
  steps: string[]
  cover_image_url: string
  created_at: string
  updated_at: string
}

interface DIYFormModalProps {
  mode: 'add' | 'edit'
  tutorial: DIYTutorial | null
  onSubmit: (tutorialData: Omit<DIYTutorial, 'id' | 'created_at' | 'updated_at'>) => Promise<void>
  onClose: () => void
}

const categories = [
  'Fashion',
  'Household',
  'Beauty',
  'Craft',
  'Home Decor',
  'Cooking',
  'Gardening'
]

const difficulties = [
  'Easy',
  'Medium',
  'Hard'
]

export default function DIYFormModal({ mode, tutorial, onSubmit, onClose }: DIYFormModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Fashion',
    difficulty: 'Easy',
    excerpt: '',
    steps: [''],
    cover_image_url: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (tutorial && mode === 'edit') {
      setFormData({
        title: tutorial.title,
        category: tutorial.category,
        difficulty: tutorial.difficulty,
        excerpt: tutorial.excerpt,
        steps: tutorial.steps.length > 0 ? tutorial.steps : [''],
        cover_image_url: tutorial.cover_image_url
      })
    } else {
      setFormData({
        title: '',
        category: 'Fashion',
        difficulty: 'Easy',
        excerpt: '',
        steps: [''],
        cover_image_url: ''
      })
    }
    setErrors({})
  }, [tutorial, mode])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required'
    }

    if (formData.steps.filter(step => step.trim()).length === 0) {
      newErrors.steps = 'At least one step is required'
    }

    if (!formData.cover_image_url.trim()) {
      newErrors.cover_image_url = 'Cover image URL is required'
    } else if (!formData.cover_image_url.match(/^https?:\/\/.+/)) {
      newErrors.cover_image_url = 'Please enter a valid URL'
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
      const tutorialData = {
        title: formData.title.trim(),
        category: formData.category,
        difficulty: formData.difficulty,
        excerpt: formData.excerpt.trim(),
        steps: formData.steps.filter(step => step.trim()),
        cover_image_url: formData.cover_image_url.trim()
      }

      await onSubmit(tutorialData)

      // Show success message
      const successMessage = mode === 'edit' ? 'DIY tutorial updated successfully!' : 'DIY tutorial created successfully!'
      alert(successMessage)

    } catch (error) {
      console.error('Form submission error:', error)
      const errorMessage = mode === 'edit' ? 'Failed to update DIY tutorial' : 'Failed to create DIY tutorial'
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

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...formData.steps]
    newSteps[index] = value
    setFormData(prev => ({ ...prev, steps: newSteps }))
  }

  const addStep = () => {
    setFormData(prev => ({ ...prev, steps: [...prev.steps, ''] }))
  }

  const removeStep = (index: number) => {
    if (formData.steps.length > 1) {
      const newSteps = formData.steps.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, steps: newSteps }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {mode === 'edit' ? 'Edit DIY Tutorial' : 'Create New DIY Tutorial'}
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
              Tutorial Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter tutorial title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Category and Difficulty */}
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
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty *
              </label>
              <select
                id="difficulty"
                value={formData.difficulty}
                onChange={(e) => handleInputChange('difficulty', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
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
              placeholder="Brief description that will appear in tutorial listings"
            />
            {errors.excerpt && <p className="text-red-500 text-sm mt-1">{errors.excerpt}</p>}
          </div>

          {/* Steps */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tutorial Steps *
            </label>
            {formData.steps.map((step, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </div>
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`Step ${index + 1} description`}
                />
                {formData.steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="px-3 py-3 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addStep}
              className="mt-2 text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Step
            </button>
            {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
          </div>

          {/* Cover Image URL */}
          <div>
            <label htmlFor="cover_image_url" className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image URL *
            </label>
            <input
              type="url"
              id="cover_image_url"
              value={formData.cover_image_url}
              onChange={(e) => handleInputChange('cover_image_url', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.cover_image_url ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://example.com/cover-image.jpg"
            />
            {errors.cover_image_url && <p className="text-red-500 text-sm mt-1">{errors.cover_image_url}</p>}

            {/* Image Preview */}
            {formData.cover_image_url && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <div className="relative">
                  <img
                    src={formData.cover_image_url}
                    alt="Cover Preview"
                    className="w-48 h-32 object-cover rounded-lg border"
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
                  {mode === 'edit' ? 'Updating...' : 'Creating...'}
                </span>
              ) : (
                mode === 'edit' ? 'Update Tutorial' : 'Create Tutorial'
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
