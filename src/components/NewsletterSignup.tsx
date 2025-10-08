'use client'

import { useState } from 'react'

interface NewsletterSignupProps {
  title?: string
  description?: string
  className?: string
}

export default function NewsletterSignup({
  title = "Stay Updated with Our Stories",
  description = "Get the latest fashion tips, DIY tutorials, beauty hacks, and family stories delivered to your inbox.",
  className = ""
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setStatus('error')
      setMessage('Please enter your email address')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.message)
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className={`rounded-3xl p-8 sm:p-12 text-center ${className}`}>
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto text-white/90">
          {description}
        </p>
      )}

      {status === 'success' ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-full mb-4 max-w-md mx-auto">
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {message}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-full text-gray-900 bg-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white border-2 border-white/30"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white/30"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && message && (
        <div className="bg-red-100 text-red-800 p-4 rounded-full mt-4 max-w-md mx-auto">
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {message}
          </div>
        </div>
      )}

      <p className="text-sm opacity-75 mt-4">
        Join 1,000+ subscribers. Unsubscribe anytime.
      </p>
    </div>
  )
}
