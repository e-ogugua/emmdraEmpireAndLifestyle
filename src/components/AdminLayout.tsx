'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

// Authorized admin emails - fallback to environment variable or empty array (no hardcoded fallback)
const getAuthorizedEmails = () => {
  const envEmails = process.env.ADMIN_EMAILS?.split(',') || []
  return envEmails.length > 0 ? envEmails : []
}

const AUTHORIZED_ADMIN_EMAILS = getAuthorizedEmails()

interface AdminLayoutProps {
  children: React.ReactNode
  currentPage?: string
}

export default function AdminLayout({ children, currentPage = 'dashboard' }: AdminLayoutProps) {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const checkAuth = useCallback(async () => {
    try {
      console.log('🔍 AdminLayout: Checking authentication...')
      const { data: { session } } = await supabase.auth.getSession()

      console.log('🔍 AdminLayout: Session check result:', {
        hasSession: !!session,
        userEmail: session?.user?.email,
        authorizedEmails: AUTHORIZED_ADMIN_EMAILS
      })

      if (session && AUTHORIZED_ADMIN_EMAILS.includes(session.user.email || '')) {
        console.log('✅ AdminLayout: User authorized, setting user...')
        setUser(session.user)
      } else {
        console.log('❌ AdminLayout: No valid session or unauthorized email, redirecting to login')
        router.push('/admin/login')
      }
    } catch (err) {
      console.error('❌ AdminLayout: Auth check error:', err)
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊', current: currentPage === 'dashboard' },
    { name: 'Products', href: '/admin/products', icon: '🛍️', current: currentPage === 'products' },
    { name: 'Blog Posts', href: '/admin/blog', icon: '📝', current: currentPage === 'blog' },
    { name: 'DIY Tutorials', href: '/admin/diy', icon: '🔨', current: currentPage === 'diy' },
    { name: 'Workshops', href: '/admin/workshops', icon: '🎓', current: currentPage === 'workshops' },
    { name: 'Bookings', href: '/admin/bookings', icon: '📞', current: currentPage === 'bookings' },
    { name: 'Analytics', href: '/admin/analytics', icon: '📈', current: currentPage === 'analytics' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex h-0 flex-1 flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">E</span>
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">Emmdra Admin</span>
              </div>
              <nav className="mt-8 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200">
          <div className="flex flex-1 flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="p-2 bg-gray-50 rounded-lg mr-4">
                <div className="relative w-16 h-16">
                  <Image
                    src="/images/EmmdraLogo.png"
                    alt="Emmdra Empire Logo"
                    fill
                    unoptimized={true}
                    className="object-contain"
                    sizes="64px"
                  />
                </div>
              </div>
              <span className="text-2xl font-black text-gray-900 tracking-tight">Emmdra Admin</span>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user.email}</p>
                <button
                  onClick={handleLogout}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar for mobile */}
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
              <div className="flex items-center gap-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-700">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-700">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
