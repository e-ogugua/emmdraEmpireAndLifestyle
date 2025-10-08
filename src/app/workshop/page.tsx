'use client'

import { useState } from 'react'
import Link from 'next/link'

interface WorkshopFormData {
  name: string
  email: string
  phone: string
  workshop_name: string
  workshop_date: string
  experience_level: string
  special_requirements: string
  group_size: string
  budget: string
  message: string
}

const workshops = [
  'Fashion Styling Masterclass',
  'DIY Jewelry Making',
  'Natural Beauty Workshop',
  'Ankara Fashion Design',
  'Makeup Artistry Training',
  'Hair Styling Workshop'
]

const experienceLevels = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Professional'
]

export default function WorkshopPage() {
  const [formData, setFormData] = useState<WorkshopFormData>({
    name: '',
    email: '',
    phone: '',
    workshop_name: '',
    workshop_date: '',
    experience_level: 'Beginner',
    special_requirements: '',
    group_size: '1',
    budget: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.workshop_name) {
      newErrors.workshop_name = 'Please select a workshop'
    }

    if (!formData.workshop_date) {
      newErrors.workshop_date = 'Please select a preferred date'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/workshop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit workshop registration')
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        workshop_name: '',
        workshop_date: '',
        experience_level: 'Beginner',
        special_requirements: '',
        group_size: '1',
        budget: '',
        message: ''
      })

    } catch (error) {
      console.error('Workshop registration error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof WorkshopFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Register for Workshop
            </h1>
            <p className="text-base sm:text-lg text-gray-600 px-2">
              Join our hands-on workshops and learn from industry experts
            </p>
          </div>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-800 font-medium">Workshop registration submitted!</span>
              </div>
              <p className="text-green-700 text-sm mt-1">We&apos;ll contact you within 24 hours to confirm your registration.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-800 font-medium">Failed to submit registration</span>
              </div>
              <p className="text-red-700 text-sm mt-1">Please try again or contact us directly.</p>
            </div>
          )}

          {/* Workshop Form */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-gray-900 placeholder:text-gray-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-gray-900 placeholder:text-gray-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                  placeholder="+234 801 234 5678"
                />
              </div>

              {/* Workshop Details */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Workshop Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="workshop_name" className="block text-sm font-medium text-gray-700 mb-2">
                      Workshop *
                    </label>
                    <select
                      id="workshop_name"
                      value={formData.workshop_name}
                      onChange={(e) => handleInputChange('workshop_name', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-gray-900 placeholder:text-gray-500 ${
                        errors.workshop_name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a workshop</option>
                      {workshops.map(workshop => (
                        <option key={workshop} value={workshop}>{workshop}</option>
                      ))}
                    </select>
                    {errors.workshop_name && <p className="text-red-500 text-sm mt-1">{errors.workshop_name}</p>}
                  </div>

                  <div>
                    <label htmlFor="workshop_date" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="workshop_date"
                      value={formData.workshop_date}
                      onChange={(e) => handleInputChange('workshop_date', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-gray-900 placeholder:text-gray-500 ${
                        errors.workshop_date ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.workshop_date && <p className="text-red-500 text-sm mt-1">{errors.workshop_date}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label htmlFor="experience_level" className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <select
                      id="experience_level"
                      value={formData.experience_level}
                      onChange={(e) => handleInputChange('experience_level', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                    >
                      {experienceLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="group_size" className="block text-sm font-medium text-gray-700 mb-2">
                      Group Size
                    </label>
                    <select
                      id="group_size"
                      value={formData.group_size}
                      onChange={(e) => handleInputChange('group_size', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                    >
                      <option value="1">Just me</option>
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4 people</option>
                      <option value="5+">5+ people</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                    Budget per person (₦)
                  </label>
                  <input
                    type="text"
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                    placeholder="e.g., 25,000"
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="special_requirements" className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requirements
                  </label>
                  <textarea
                    id="special_requirements"
                    rows={3}
                    value={formData.special_requirements}
                    onChange={(e) => handleInputChange('special_requirements', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-gray-900 placeholder:text-gray-500"
                    placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none text-gray-900 placeholder:text-gray-500"
                  placeholder="Why are you interested in this workshop? Any specific learning goals?"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Registering...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Register for Workshop
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Back Button */}
          <div className="text-center mt-6">
            <Link href="/workshops" className="text-green-600 hover:text-green-800 transition-colors">
              ← Back to Workshops
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
