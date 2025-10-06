'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import AdminLayout from '@/components/AdminLayout'
import { trackPageView } from '@/lib/analytics'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

interface AnalyticsData {
  totalViews: number
  pageViews: Array<{
    page_type: string
    count: number
  }>
  recentViews: Array<{
    id: number
    page_type: string
    page_title?: string
    viewed_at: string
  }>
  topPages: Array<{
    page_type: string
    page_title?: string
    views: number
  }>
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData>({
    totalViews: 0,
    pageViews: [],
    recentViews: [],
    topPages: []
  })
  const [timeRange, setTimeRange] = useState('30') // days

  useEffect(() => {
    const loadData = async () => {
      await fetchAnalytics()
      trackPageView({ page_type: 'about' }) // Using 'about' as closest match for analytics
    }
    loadData()
  }, [timeRange])

  const fetchAnalytics = async () => {
    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(endDate.getDate() - parseInt(timeRange))

    // Fetch page views in the time range
    const { data: viewsData, error: viewsError } = await supabase
      .from('page_views')
      .select('*')
      .gte('viewed_at', startDate.toISOString())
      .order('viewed_at', { ascending: false })

    if (viewsError) throw viewsError

    // Process data
    const totalViews = viewsData?.length || 0

    // Group by page type
    const pageViewsMap = new Map<string, number>()
    viewsData?.forEach((view: { page_type: string; page_title?: string }) => {
      const count = pageViewsMap.get(view.page_type) || 0
      pageViewsMap.set(view.page_type, count + 1)
    })

    const pageViews = Array.from(pageViewsMap.entries()).map(([page_type, count]) => ({
      page_type,
      count
    }))

    // Get recent views (last 10)
    const recentViews = viewsData?.slice(0, 10) || []

    // Get top pages
    const topPagesMap = new Map<string, number>()
    viewsData?.forEach((view: { page_type: string; page_title?: string }) => {
      const key = `${view.page_type}${view.page_title ? `-${view.page_title}` : ''}`
      const count = topPagesMap.get(key) || 0
      topPagesMap.set(key, count + 1)
    })

    const topPages = Array.from(topPagesMap.entries())
      .map(([key, views]) => {
        const [page_type, page_title] = key.split('-', 2)
        return { page_type, page_title, views }
      })
      .sort((a, b) => b.views - a.views)
      .slice(0, 10)

    setData({
      totalViews,
      pageViews,
      recentViews,
      topPages
    })
  }

  const chartData = {
    labels: data.pageViews.map(view => view.page_type.charAt(0).toUpperCase() + view.page_type.slice(1)),
    datasets: [
      {
        label: 'Page Views',
        data: data.pageViews.map(view => view.count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(14, 165, 233, 0.8)',
          'rgba(34, 197, 94, 0.8)'
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(14, 165, 233, 1)',
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
        text: `Page Views (Last ${timeRange} Days)`,
      },
    },
  }

  return (
    <AdminLayout currentPage="analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your platform performance and user engagement</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <button
              onClick={fetchAnalytics}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Page Views</p>
                <p className="text-2xl font-bold text-gray-900">{data.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pages Tracked</p>
                <p className="text-2xl font-bold text-gray-900">{data.pageViews.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Top Pages</p>
                <p className="text-2xl font-bold text-gray-900">{data.topPages.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Page Views Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Page Views by Type</h3>
            {data.pageViews.length > 0 ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                No data available for the selected time range
              </div>
            )}
          </div>

          {/* Top Pages */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Pages</h3>
            <div className="space-y-3">
              {data.topPages.length > 0 ? (
                data.topPages.map((page, index) => (
                  <div key={`${page.page_type}-${page.page_title}`} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {page.page_type.charAt(0).toUpperCase() + page.page_type.slice(1)}
                          {page.page_title && ` - ${page.page_title}`}
                        </p>
                        <p className="text-xs text-gray-500">{page.views} views</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No page view data available</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Page Views</h3>
          <div className="space-y-3">
            {data.recentViews.length > 0 ? (
              data.recentViews.map((view) => (
                <div key={view.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${
                      view.page_type === 'product' ? 'bg-blue-500' :
                      view.page_type === 'blog' ? 'bg-green-500' :
                      view.page_type === 'diy' ? 'bg-yellow-500' :
                      view.page_type === 'shop' ? 'bg-purple-500' :
                      'bg-gray-500'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {view.page_type.charAt(0).toUpperCase() + view.page_type.slice(1)}
                        {view.page_title && ` - ${view.page_title}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(view.viewed_at).toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No recent page views</p>
            )}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Insights & Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">Content Performance</h4>
              {data.pageViews.length > 0 ? (
                <div className="space-y-2">
                  {data.pageViews
                    .sort((a, b) => b.count - a.count)
                    .slice(0, 3)
                    .map(view => (
                      <p key={view.page_type} className="text-sm text-gray-600">
                        • {view.page_type.charAt(0).toUpperCase() + view.page_type.slice(1)} pages are performing well with {view.count} views
                      </p>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">No data available to generate insights</p>
              )}
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-gray-700">Action Items</h4>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">• Monitor page view trends regularly</p>
                <p className="text-sm text-gray-600">• Focus content creation on high-performing page types</p>
                <p className="text-sm text-gray-600">• Consider A/B testing for low-performing content</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
