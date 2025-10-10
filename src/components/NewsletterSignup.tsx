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
    <div className={`bg-gradient-to-br from-brand-burnt-orange via-red-500 to-pink-500 rounded-3xl p-8 sm:p-12 text-center shadow-2xl ${className}`}>
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white drop-shadow-lg">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-lg mb-8 max-w-2xl mx-auto text-white/95 drop-shadow-md">
          {description}
        </p>
      )}

      {status === 'success' ? (
        <div className="bg-green-50 text-green-800 p-4 rounded-full mb-4 max-w-md mx-auto border-2 border-green-200">
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {message}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-full text-gray-900 bg-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:border-white border-2 border-white/50 shadow-lg transition-all duration-300 hover:shadow-xl"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`bg-white text-brand-burnt-orange px-6 py-3 rounded-full font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white hover:border-brand-burnt-orange-light min-h-[48px] flex items-center justify-center gap-2 ${
              status === 'loading'
                ? 'cursor-not-allowed'
                : 'hover:bg-brand-burnt-orange-light hover:text-white'
            }`}
          >
            {status === 'loading' ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-burnt-orange"></div>
                <span>Subscribing...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Subscribe</span>
              </>
            )}
          </button>
        </form>
      )}

      {status === 'error' && message && (
        <div className="bg-red-50 text-red-800 p-4 rounded-full mt-4 max-w-md mx-auto border-2 border-red-200">
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {message}
          </div>
        </div>
      )}

      <p className="text-sm text-white/80 mt-6 drop-shadow-sm">
        Join 1,000+ subscribers. Unsubscribe anytime.
      </p>
    </div>
  )
}
