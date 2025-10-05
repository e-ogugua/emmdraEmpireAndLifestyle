import { supabase } from './supabase'

export interface PageView {
  id?: number
  page_type: 'product' | 'blog' | 'diy' | 'shop' | 'contact' | 'about' | 'home'
  page_id?: string | number // ID of the specific content (product_id, blog_id, etc.)
  page_title?: string
  referrer?: string
  user_agent?: string
  ip_address?: string
  session_id?: string
  viewed_at: string
  metadata?: Record<string, any>
}

/**
 * Track a pageview with anonymous analytics data
 */
export async function trackPageView(pageView: Omit<PageView, 'viewed_at' | 'session_id'>) {
  try {
    // Generate anonymous session ID (client-side only)
    const sessionId = typeof window !== 'undefined'
      ? sessionStorage.getItem('emmdra_session_id') ||
        (() => {
          const id = Math.random().toString(36).substring(2, 15)
          sessionStorage.setItem('emmdra_session_id', id)
          return id
        })()
      : 'server-side'

    // Get referrer and user agent (client-side only)
    const referrer = typeof window !== 'undefined' ? document.referrer : undefined
    const userAgent = typeof window !== 'undefined' ? navigator.userAgent : undefined

    const analyticsData: PageView = {
      ...pageView,
      session_id: sessionId,
      referrer,
      user_agent: userAgent,
      viewed_at: new Date().toISOString(),
      // Note: IP address would need to be collected server-side for privacy
    }

    // Insert into Supabase analytics table
    const { error } = await supabase
      .from('page_views')
      .insert(analyticsData)

    if (error) {
      console.error('Analytics tracking error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Analytics tracking failed:', error)
    return false
  }
}

/**
 * Get analytics summary for admin dashboard
 */
export async function getAnalyticsSummary(dateRange?: { from: string; to: string }) {
  try {
    let query = supabase
      .from('page_views')
      .select('*')

    // Apply date range filter if provided
    if (dateRange) {
      query = query
        .gte('viewed_at', dateRange.from)
        .lte('viewed_at', dateRange.to)
    }

    const { data: pageViews, error } = await query

    if (error) {
      console.error('Analytics fetch error:', error)
      return null
    }

    if (!pageViews) return null

    // Aggregate data by page type and content
    const summary = {
      total_views: pageViews.length,
      unique_sessions: new Set(pageViews.map(pv => pv.session_id)).size,
      page_type_breakdown: {} as Record<string, number>,
      top_content: {} as Record<string, { views: number; title?: string }>,
      daily_trends: {} as Record<string, number>,
      referrer_breakdown: {} as Record<string, number>
    }

    pageViews.forEach(pv => {
      // Page type breakdown
      summary.page_type_breakdown[pv.page_type] = (summary.page_type_breakdown[pv.page_type] || 0) + 1

      // Top content (by page_id)
      const contentKey = `${pv.page_type}_${pv.page_id || 'unknown'}`
      if (!summary.top_content[contentKey]) {
        summary.top_content[contentKey] = { views: 0, title: pv.page_title }
      }
      summary.top_content[contentKey].views++

      // Daily trends
      const date = new Date(pv.viewed_at).toISOString().split('T')[0]
      summary.daily_trends[date] = (summary.daily_trends[date] || 0) + 1

      // Referrer breakdown
      const referrer = pv.referrer || 'Direct'
      summary.referrer_breakdown[referrer] = (summary.referrer_breakdown[referrer] || 0) + 1
    })

    // Sort top content by views
    summary.top_content = Object.fromEntries(
      Object.entries(summary.top_content)
        .sort(([,a], [,b]) => b.views - a.views)
        .slice(0, 10) // Top 10 content items
    )

    return summary
  } catch (error) {
    console.error('Analytics summary error:', error)
    return null
  }
}

/**
 * Get detailed analytics for specific content type
 */
export async function getContentAnalytics(
  contentType: 'product' | 'blog' | 'diy',
  dateRange?: { from: string; to: string }
) {
  try {
    let query = supabase
      .from('page_views')
      .select('*')
      .eq('page_type', contentType)

    if (dateRange) {
      query = query
        .gte('viewed_at', dateRange.from)
        .lte('viewed_at', dateRange.to)
    }

    const { data: views, error } = await query

    if (error || !views) return null

    // Group by content ID and calculate metrics
    const contentStats = {} as Record<string, {
      id: string | number
      title?: string
      total_views: number
      unique_viewers: number
      avg_time_on_page?: number
    }>

    views.forEach(view => {
      const contentId = view.page_id?.toString() || 'unknown'

      if (!contentStats[contentId]) {
        contentStats[contentId] = {
          id: view.page_id || 'unknown',
          title: view.page_title,
          total_views: 0,
          unique_viewers: 0,
        }
      }

      contentStats[contentId].total_views++

      // Track unique viewers (by session)
      const sessionKey = `${contentId}_${view.session_id}`
      if (!contentStats[contentId][sessionKey]) {
        contentStats[contentId].unique_viewers++
        contentStats[contentId][sessionKey] = true
      }
    })

    // Convert to array and sort by total views
    return Object.values(contentStats)
      .sort((a, b) => b.total_views - a.total_views)
      .slice(0, 20) // Top 20 items

  } catch (error) {
    console.error('Content analytics error:', error)
    return null
  }
}
