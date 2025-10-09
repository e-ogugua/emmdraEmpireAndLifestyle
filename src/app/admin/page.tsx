'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface AdminStats {
  products: number
  blogs: number
  diyTutorials: number
  workshops: number
  bookings: number
}

export default function AdminPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [statsLoading, setStatsLoading] = useState(true)
  const [signingOut, setSigningOut] = useState(false)
  const [stats, setStats] = useState<AdminStats>({
    products: 0,
    blogs: 0,
    diyTutorials: 0,
    workshops: 0,
    bookings: 0
  })

  // Fetch stats data
  const fetchStats = async () => {
    try {
      setStatsLoading(true)
      const response = await fetch('/api/stats')
      const data = await response.json()

      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setStatsLoading(false)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error) {
          console.error('Auth check error:', error)
          setLoading(false)
          return
        }

        if (user) {
          // Check if user is authorized (case-insensitive and trimmed)
          const allowedEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || []
          const normalizedUserEmail = user.email?.toLowerCase().trim() || ''
          const normalizedAllowedEmails = allowedEmails.map(email => email.toLowerCase().trim())

          if (normalizedAllowedEmails.includes(normalizedUserEmail)) {
            setUser(user)
            fetchStats()
          }
        }
      } catch (err) {
        console.error('Auth check error:', err)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const allowedEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || []
        const normalizedUserEmail = session.user.email?.toLowerCase().trim() || ''
        const normalizedAllowedEmails = allowedEmails.map(email => email.toLowerCase().trim())

        if (normalizedAllowedEmails.includes(normalizedUserEmail)) {
          setUser(session.user)
          fetchStats()
        } else {
          setUser(null)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    setSigningOut(true)
    
    try {
      // Show immediate feedback
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Sign out error:', error)
        // Force redirect even if there's an error
        window.location.href = '/'
        return
      }
      
      // Redirect to home page after successful sign out
      window.location.href = '/'
    } catch (error) {
      console.error('Sign out error:', error)
      setSigningOut(false)
      // Force redirect anyway
      window.location.href = '/'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-emerald-600 rounded-full flex items-center justify-center mb-6">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Admin Access Required
            </h2>

            <p className="mt-2 text-base text-gray-700 mb-8">
              You need to be logged in as an administrator to access this area.
            </p>

            <div className="mt-6">
              <Link
                href="/admin/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors shadow-sm"
              >
                Sign In to Admin
              </Link>
            </div>

            <div className="mt-4">
              <Link href="/" className="text-base text-emerald-600 hover:text-emerald-800 font-medium transition-colors">
                ← Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-700 mt-1 font-medium">Welcome back, {user.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold shadow-sm"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                disabled={signingOut}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  signingOut
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {signingOut ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                    Signing Out...
                  </span>
                ) : (
                  'Sign Out'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dashboard Card */}
          <Link href="/admin/dashboard" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow border border-gray-200 group">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Dashboard</h3>
                <p className="text-sm text-gray-600">Overview and analytics</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              View statistics, recent activity, and manage your content overview.
            </p>
          </Link>

          {/* Products Management */}
          <Link href="/admin/products" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow border border-gray-200 group">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">Products</h3>
                <p className="text-sm text-gray-600">Manage your products</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Add, edit, and manage your product catalog and inventory.
            </p>
          </Link>

          {/* Blog Management */}
          <Link href="/admin/blog" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow border border-gray-200 group">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Blog Posts</h3>
                <p className="text-sm text-gray-600">Manage blog content</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Create and manage your blog posts and articles.
            </p>
          </Link>

          {/* DIY Tutorials */}
          <Link href="/admin/diy" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow border border-gray-200 group">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-colors">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 8a9 9 0 110-18 9 9 0 010 18z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">DIY Tutorials</h3>
                <p className="text-sm text-gray-600">Manage tutorials</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Create and manage your DIY tutorial content.
            </p>
          </Link>

          {/* Workshops */}
          <Link href="/admin/workshops" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow border border-gray-200 group">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-pink-100 rounded-lg group-hover:bg-pink-200 transition-colors">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2M8 7v10a2 2 0 002 2h4a2 2 0 002-2V7" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">Workshops</h3>
                <p className="text-sm text-gray-600">Manage workshops</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Create and manage your workshop events and sessions.
            </p>
          </Link>

          {/* Workshop Registrations */}
          <Link href="/admin/workshop-registrations" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow border border-gray-200 group">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">Workshop Registrations</h3>
                <p className="text-sm text-gray-600">Manage workshop signups</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              View and manage customer workshop registrations and inquiries.
            </p>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Quick Overview</h2>
            <button
              onClick={fetchStats}
              disabled={statsLoading}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 font-medium"
            >
              {statsLoading ? 'Loading...' : 'Refresh Stats'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-200">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {statsLoading ? '...' : stats.products}
              </div>
              <p className="text-sm font-medium text-gray-700">Total Products</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {statsLoading ? '...' : stats.blogs}
              </div>
              <p className="text-sm font-medium text-gray-700">Blog Posts</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-200">
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {statsLoading ? '...' : stats.diyTutorials}
              </div>
              <p className="text-sm font-medium text-gray-700">DIY Tutorials</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {statsLoading ? '...' : stats.workshops}
              </div>
              <p className="text-sm font-medium text-gray-700">Workshops</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-200">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {statsLoading ? '...' : stats.bookings}
              </div>
              <p className="text-sm font-medium text-gray-700">Registrations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
