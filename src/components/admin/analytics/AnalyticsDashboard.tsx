'use client'

import { useState, useEffect, useCallback } from 'react'
import { getAnalyticsSummary, getContentAnalytics } from '@/lib/analytics'

interface AnalyticsSummary {
  total_views: number
  unique_sessions: number
  page_type_breakdown: Record<string, number>
  top_content: Record<string, { views: number; title?: string }>
  daily_trends: Record<string, number>
  referrer_breakdown: Record<string, number>
}

interface ContentAnalytics {
  id: string | number
  title?: string
  total_views: number
  unique_viewers: number
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null)
  const [contentAnalytics, setContentAnalytics] = useState<{
    products: ContentAnalytics[]
    blogs: ContentAnalytics[]
    diy: ContentAnalytics[]
  }>({
    products: [],
    blogs: [],
    diy: []
  })
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState<{ from: string; to: string } | undefined>()
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'blogs' | 'diy'>('overview')

  const loadAnalytics = useCallback(async () => {
    setLoading(true)
    try {
      const [summaryData, productsData, blogsData, diyData] = await Promise.all([
        getAnalyticsSummary(dateRange),
        getContentAnalytics('product', dateRange),
        getContentAnalytics('blog', dateRange),
        getContentAnalytics('diy', dateRange)
      ])

      setAnalytics(summaryData)
      setContentAnalytics({
        products: productsData || [],
        blogs: blogsData || [],
        diy: diyData || []
      })
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setLoading(false)
    }
  }, [dateRange])

  useEffect(() => {
    loadAnalytics()
  }, [dateRange, loadAnalytics])

  const handleDateRangeChange = (range: '7d' | '30d' | '90d' | 'all') => {
    const now = new Date()
    let from: string

    switch (range) {
      case '7d':
        from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
        break
      case '30d':
        from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()
        break
      case '90d':
        from = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString()
        break
      default:
        from = new Date(2024, 0, 1).toISOString() // Default to start of 2024
    }

    setDateRange({ from, to: now.toISOString() })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Date Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Track page views and user engagement</p>
        </div>

        <div className="flex gap-2">
          {[
            { label: '7 Days', value: '7d' },
            { label: '30 Days', value: '30d' },
            { label: '90 Days', value: '90d' },
            { label: 'All Time', value: 'all' }
          ].map((range) => (
            <button
              key={range.value}
              onClick={() => handleDateRangeChange(range.value as '7d' | '30d' | '90d' | 'all')}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                (!dateRange && range.value === 'all') || (dateRange && range.value !== 'all')
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'products', label: 'Products', icon: '🛍️' },
            { id: 'blogs', label: 'Blog Posts', icon: '📝' },
            { id: 'diy', label: 'DIY Tutorials', icon: '🔨' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'products' | 'blogs' | 'diy')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Key Metrics */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.total_views.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.unique_sessions.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Views/Day</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Object.keys(analytics.daily_trends).length > 0
                    ? Math.round(analytics.total_views / Object.keys(analytics.daily_trends).length)
                    : 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                <p className="text-2xl font-bold text-gray-900">~65%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Tabs */}
      {(activeTab === 'products' || activeTab === 'blogs' || activeTab === 'diy') && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {activeTab === 'products' && 'Top Viewed Products'}
              {activeTab === 'blogs' && 'Top Viewed Blog Posts'}
              {activeTab === 'diy' && 'Top Viewed DIY Tutorials'}
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unique Visitors
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Engagement
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(activeTab === 'products' ? contentAnalytics.products :
                  activeTab === 'blogs' ? contentAnalytics.blogs :
                  contentAnalytics.diy).slice(0, 10).map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold ${
                            index === 0 ? 'bg-yellow-500' :
                            index === 1 ? 'bg-gray-400' :
                            index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                          }`}>
                            {index + 1}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.title || `Item ${item.id}`}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {item.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.total_views}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.unique_viewers}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`text-sm font-medium ${
                          (item.total_views / item.unique_viewers) > 1.5 ? 'text-green-600' : 'text-gray-600'
                        }`}>
                          {item.unique_viewers > 0 ? Math.round((item.total_views / item.unique_viewers) * 100) / 100 : 0}x
                        </div>
                        <div className="ml-2 text-xs text-gray-500">
                          avg sessions
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Page Type Breakdown */}
      {activeTab === 'overview' && analytics && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Page Type Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Page Views by Type</h3>
            <div className="space-y-3">
              {Object.entries(analytics.page_type_breakdown)
                .sort(([,a], [,b]) => b - a)
                .map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      type === 'home' ? 'bg-blue-500' :
                      type === 'shop' ? 'bg-green-500' :
                      type === 'product' ? 'bg-purple-500' :
                      type === 'blog' ? 'bg-orange-500' :
                      type === 'diy' ? 'bg-red-500' : 'bg-gray-500'
                    }`} />
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {type === 'home' ? 'Homepage' : type}
                    </span>
                  </div>
                  <span className="text-sm text-gray-900 font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Referrers */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
            <div className="space-y-3">
              {Object.entries(analytics.referrer_breakdown)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([referrer, count]) => (
                <div key={referrer} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    {referrer === 'Direct' ? 'Direct Traffic' : referrer}
                  </span>
                  <span className="text-sm text-gray-900 font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* No Data Message */}
      {analytics && analytics.total_views === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No analytics data yet</h3>
          <p className="mt-1 text-sm text-gray-500">Analytics will appear once visitors start browsing your site.</p>
        </div>
      )}
    </div>
  )
}
