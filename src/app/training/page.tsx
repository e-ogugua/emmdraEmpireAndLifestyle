'use client'

import { useState } from 'react'
import Link from 'next/link'

interface TrainingFormData {
  name: string
  email: string
  phone: string
  training_program: string
  training_date: string
  experience_level: string
  goals: string
  duration_preference: string
  budget: string
  location_preference: string
  message: string
}

const trainingPrograms = [
  'Makeup Artistry Training',
  'Hair Styling Professional Course',
  'Fashion Design Fundamentals',
  'Beauty Therapy Certification',
  'Advanced Styling Techniques',
  'Business of Beauty'
]

const experienceLevels = [
  'Complete Beginner',
  'Some Experience',
  'Intermediate',
  'Advanced',
  'Professional'
]

const durationOptions = [
  '1-2 weeks intensive',
  '1 month part-time',
  '2-3 months comprehensive',
  '6 months advanced',
  'Custom duration'
]

export default function TrainingPage() {
  const [formData, setFormData] = useState<TrainingFormData>({
    name: '',
    email: '',
    phone: '',
    training_program: '',
    training_date: '',
    experience_level: 'Complete Beginner',
    goals: '',
    duration_preference: '1 month part-time',
    budget: '',
    location_preference: 'In-person',
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

    if (!formData.training_program) {
      newErrors.training_program = 'Please select a training program'
    }

    if (!formData.training_date) {
      newErrors.training_date = 'Please select a preferred start date'
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
      const response = await fetch('/api/training', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit training enrollment')
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        training_program: '',
        training_date: '',
        experience_level: 'Complete Beginner',
        goals: '',
        duration_preference: '1 month part-time',
        budget: '',
        location_preference: 'In-person',
        message: ''
      })

    } catch (error) {
      console.error('Training enrollment error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof TrainingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Enroll in Training
            </h1>
            <p className="text-lg text-gray-600">
              Start your professional journey with our comprehensive training programs
            </p>
          </div>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-800 font-medium">Training enrollment submitted!</span>
              </div>
              <p className="text-green-700 text-sm mt-1">We&apos;ll contact you within 24 hours to discuss your training options.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-800 font-medium">Failed to submit enrollment</span>
              </div>
              <p className="text-red-700 text-sm mt-1">Please try again or contact us directly.</p>
            </div>
          )}

          {/* Training Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder:text-gray-500 ${
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder:text-gray-500 ${
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Training Details */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Training Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="training_program" className="block text-sm font-medium text-gray-700 mb-2">
                      Training Program *
                    </label>
                    <select
                      id="training_program"
                      value={formData.training_program}
                      onChange={(e) => handleInputChange('training_program', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder:text-gray-500 ${
                        errors.training_program ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select a training program</option>
                      {trainingPrograms.map(program => (
                        <option key={program} value={program}>{program}</option>
                      ))}
                    </select>
                    {errors.training_program && <p className="text-red-500 text-sm mt-1">{errors.training_program}</p>}
                  </div>

                  <div>
                    <label htmlFor="training_date" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Start Date *
                    </label>
                    <input
                      type="date"
                      id="training_date"
                      value={formData.training_date}
                      onChange={(e) => handleInputChange('training_date', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder:text-gray-500 ${
                        errors.training_date ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.training_date && <p className="text-red-500 text-sm mt-1">{errors.training_date}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label htmlFor="experience_level" className="block text-sm font-medium text-gray-700 mb-2">
                      Current Experience Level
                    </label>
                    <select
                      id="experience_level"
                      value={formData.experience_level}
                      onChange={(e) => handleInputChange('experience_level', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                    >
                      {experienceLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="duration_preference" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Duration
                    </label>
                    <select
                      id="duration_preference"
                      value={formData.duration_preference}
                      onChange={(e) => handleInputChange('duration_preference', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                    >
                      {durationOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range (₦)
                    </label>
                    <input
                      type="text"
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                      placeholder="e.g., 100,000 - 200,000"
                    />
                  </div>

                  <div>
                    <label htmlFor="location_preference" className="block text-sm font-medium text-gray-700 mb-2">
                      Location Preference
                    </label>
                    <select
                      id="location_preference"
                      value={formData.location_preference}
                      onChange={(e) => handleInputChange('location_preference', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-500"
                    >
                      <option value="In-person">In-person</option>
                      <option value="Online">Online</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Goals and Message */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Goals</h3>

                <div>
                  <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-2">
                    What do you want to achieve with this training?
                  </label>
                  <textarea
                    id="goals"
                    rows={3}
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder:text-gray-500"
                    placeholder="Describe your career goals, what you want to learn, and how this training fits into your plans..."
                  />
                </div>

                <div className="mt-4">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder:text-gray-500"
                    placeholder="Any questions about the training, scheduling preferences, or special requirements..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting Enrollment...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Enroll in Training
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Back Button */}
          <div className="text-center mt-6">
            <Link href="/workshops" className="text-blue-600 hover:text-blue-800 transition-colors">
              ← Back to Training Programs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
