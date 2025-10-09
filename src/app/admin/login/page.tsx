'use client'

import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Authenticate with Supabase
      console.log('🔐 Attempting login for:', email)
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      console.log('🔐 Supabase auth result:', { authError })

      if (authError) {
        console.error('❌ Supabase auth failed:', authError.message)
        console.error('❌ Error details:', authError)

        // Provide more specific error messages
        if (authError.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials.')
        } else if (authError.message.includes('Email not confirmed')) {
          setError('Please confirm your email address first.')
        } else if (authError.message.includes('Too many requests')) {
          setError('Too many login attempts. Please try again later.')
        } else {
          setError(`Authentication failed: ${authError.message}`)
        }
        return
      }

      console.log('✅ Supabase auth successful')

      // Check if user is authorized (case-insensitive and trimmed)
      const allowedEmails = process.env.ADMIN_EMAILS?.split(',') || []
      const normalizedEmail = email.toLowerCase().trim()
      const normalizedAllowedEmails = allowedEmails.map(email => email.toLowerCase().trim())

      console.log('🔍 Authorization check:', {
        originalEmail: email,
        normalizedEmail: normalizedEmail,
        allowedEmails: allowedEmails,
        normalizedAllowedEmails: normalizedAllowedEmails,
        isAuthorized: normalizedAllowedEmails.includes(normalizedEmail)
      })

      if (!normalizedAllowedEmails.includes(normalizedEmail)) {
        // Sign out if not authorized
        await supabase.auth.signOut()
        setError('Access denied. You are not authorized to access the admin dashboard.')
        return
      }

      console.log('✅ User authorized, redirecting to admin...')

      // Clear any existing error and redirect to dashboard
      setError(null)

      // Use Next.js router for client-side navigation instead of window.location
      window.location.href = '/admin'

    } catch (err) {
      console.error('Login error:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>

          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access the admin dashboard
          </p>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Authorized users only
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Sign in with your authorized admin credentials
            </p>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          <div className="text-center">
            <Link href="/" className="text-sm text-blue-600 hover:text-blue-800">
              ← Back to homepage
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
