'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface DashboardStats {
  products: number
  blogs: number
  diyTutorials: number
  workshops: number
  bookings: number
  orders: number
  consultations: number
  trainingRequests: number
  contactMessages: number
  recentActivity: Array<{
    id: number
    type: string
    title?: string
    name?: string
    created_at: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    products: 0,
    blogs: 0,
    diyTutorials: 0,
    workshops: 0,
    bookings: 0,
    orders: 0,
    consultations: 0,
    trainingRequests: 0,
    contactMessages: 0,
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<{ email?: string } | null>(null)

  // Check authentication and authorization
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          window.location.href = '/admin/login'
          return
        }

        // Check if user is authorized
        const allowedEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || []
        if (!allowedEmails.includes(user.email || '')) {
          setError('Access denied. You are not authorized to access this dashboard.')
          return
        }

        setUser(user)
        fetchDashboardData()
      } catch (err) {
        console.error('Auth error:', err)
        setError('Authentication failed')
      }
    }

    checkAuth()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch counts for all content types including submissions
      const [productsRes, blogsRes, diyRes, workshopsRes, bookingsRes, ordersRes, consultationsRes, trainingRes, contactRes] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('blogs').select('id', { count: 'exact', head: true }),
        supabase.from('diy_tutorials').select('id', { count: 'exact', head: true }),
        supabase.from('workshops').select('id', { count: 'exact', head: true }),
        supabase.from('bookings').select('id', { count: 'exact', head: true }),
        supabase.from('orders').select('id', { count: 'exact', head: true }),
        supabase.from('consultations').select('id', { count: 'exact', head: true }),
        supabase.from('training_requests').select('id', { count: 'exact', head: true }),
        supabase.from('contact_messages').select('id', { count: 'exact', head: true })
      ])

      // Fetch recent activity
      const recentActivityPromises = [
        supabase.from('products').select('id, name, created_at').order('created_at', { ascending: false }).limit(3),
        supabase.from('blogs').select('id, title, created_at').order('created_at', { ascending: false }).limit(3),
        supabase.from('diy_tutorials').select('id, title, created_at').order('created_at', { ascending: false }).limit(3),
        supabase.from('workshops').select('id, title, created_at').order('created_at', { ascending: false }).limit(3),
        supabase.from('bookings').select('id, name, created_at').order('created_at', { ascending: false }).limit(3)
      ]

      const [productsData, blogsData, diyData, workshopsData, bookingsData] = await Promise.all(recentActivityPromises)

      // Combine all recent activity
      const allActivity = [
        ...(productsData.data || []).map(item => ({ ...item, type: 'Product' })),
        ...(blogsData.data || []).map(item => ({ ...item, type: 'Blog' })),
        ...(diyData.data || []).map(item => ({ ...item, type: 'DIY Tutorial' })),
        ...(workshopsData.data || []).map(item => ({ ...item, type: 'Workshop' })),
        ...(bookingsData.data || []).map(item => ({ ...item, type: 'Booking' }))
      ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 10)

      setStats({
        products: productsRes.count || 0,
        blogs: blogsRes.count || 0,
        diyTutorials: diyRes.count || 0,
        workshops: workshopsRes.count || 0,
        bookings: bookingsRes.count || 0,
        orders: ordersRes.count || 0,
        consultations: consultationsRes.count || 0,
        trainingRequests: trainingRes.count || 0,
        contactMessages: contactRes.count || 0,
        recentActivity: allActivity
      })

    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const chartData = {
    labels: ['Products', 'Blogs', 'DIY Tutorials', 'Workshops', 'Bookings', 'Orders', 'Consultations', 'Training', 'Messages'],
    datasets: [
      {
        label: 'Count',
        data: [stats.products, stats.blogs, stats.diyTutorials, stats.workshops, stats.bookings, stats.orders, stats.consultations, stats.trainingRequests, stats.contactMessages],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(6, 182, 212, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(245, 101, 101, 0.8)',
          'rgba(34, 197, 94, 0.8)'
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(6, 182, 212, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(245, 101, 101, 1)',
          'rgba(34, 197, 94, 1)'
        ],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Content Overview',
      },
    },
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Emmdra Empire Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchDashboardData}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Refresh
              </button>
              <button
                onClick={() => supabase.auth.signOut()}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Products</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.products}</p>
                  </div>
                </div>
                <Link href="/admin/products" className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Manage Products →
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Blog Posts</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.blogs}</p>
                  </div>
                </div>
                <Link href="/admin/blog" className="mt-4 inline-block text-green-600 hover:text-green-800 text-sm font-medium">
                  Manage Blogs →
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 8a9 9 0 110-18 9 9 0 010 18z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">DIY Tutorials</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.diyTutorials}</p>
                  </div>
                </div>
                <Link href="/admin/diy" className="mt-4 inline-block text-yellow-600 hover:text-yellow-800 text-sm font-medium">
                  Manage DIY →
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2M8 7v10a2 2 0 002 2h4a2 2 0 002-2V7" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Workshops</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.workshops}</p>
                  </div>
                </div>
                <Link href="/admin/workshops" className="mt-4 inline-block text-purple-600 hover:text-purple-800 text-sm font-medium">
                  Manage Workshops →
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.bookings}</p>
                  </div>
                </div>
                <Link href="/admin/bookings" className="mt-4 inline-block text-red-600 hover:text-red-800 text-sm font-medium">
                  Manage Bookings →
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-cyan-100 rounded-lg">
                    <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.orders}</p>
                  </div>
                </div>
                <Link href="/admin/orders" className="mt-4 inline-block text-cyan-600 hover:text-cyan-800 text-sm font-medium">
                  Manage Orders →
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-violet-100 rounded-lg">
                    <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Consultations</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.consultations}</p>
                  </div>
                </div>
                <Link href="/admin/consultations" className="mt-4 inline-block text-violet-600 hover:text-violet-800 text-sm font-medium">
                  Manage Consultations →
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-pink-100 rounded-lg">
                    <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Training Requests</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.trainingRequests}</p>
                  </div>
                </div>
                <Link href="/admin/training-requests" className="mt-4 inline-block text-pink-600 hover:text-pink-800 text-sm font-medium">
                  Manage Training →
                </Link>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Contact Messages</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.contactMessages}</p>
                  </div>
                </div>
                <Link href="/admin/contact-messages" className="mt-4 inline-block text-green-600 hover:text-green-800 text-sm font-medium">
                  Manage Messages →
                </Link>
              </div>
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Overview</h3>
                <Bar data={chartData} options={chartOptions} />
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {stats.recentActivity.length > 0 ? (
                    stats.recentActivity.map((activity) => (
                      <div key={`${activity.type}-${activity.id}`} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-3 ${
                            activity.type === 'Product' ? 'bg-blue-500' :
                            activity.type === 'Blog' ? 'bg-green-500' :
                            activity.type === 'DIY Tutorial' ? 'bg-yellow-500' :
                            activity.type === 'Workshop' ? 'bg-purple-500' : 'bg-red-500'
                          }`}></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {activity.title || activity.name}
                            </p>
                            <p className="text-xs text-gray-500">{activity.type}</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(activity.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8">No recent activity</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/admin/products/add" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg border border-blue-200 transition-colors">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-blue-800 font-medium">Add Product</span>
                  </div>
                </Link>

                <Link href="/admin/blog/new" className="bg-green-50 hover:bg-green-100 p-4 rounded-lg border border-green-200 transition-colors">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="text-green-800 font-medium">Add Blog Post</span>
                  </div>
                </Link>

                <Link href="/admin/diy/add" className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg border border-yellow-200 transition-colors">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 8a9 9 0 110-18 9 9 0 010 18z" />
                    </svg>
                    <span className="text-yellow-800 font-medium">Add DIY Tutorial</span>
                  </div>
                </Link>

                <Link href="/admin/workshops/add" className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg border border-purple-200 transition-colors">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V7M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2M8 7v10a2 2 0 002 2h4a2 2 0 002-2V7" />
                    </svg>
                    <span className="text-purple-800 font-medium">Add Workshop</span>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
