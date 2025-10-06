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
  metadata?: Record<string, unknown>
}

/**
 * Track a pageview with anonymous analytics data
 */
export async function trackPageView(pageView: Omit<PageView, 'viewed_at' | 'session_id'>) {
  // Input validation
  if (!pageView || typeof pageView !== 'object') {
    console.error('Analytics tracking error: Invalid pageView parameter - must be a non-null object', {
      received: pageView,
      type: typeof pageView
    })
    return false
  }

  if (!pageView.page_type) {
    console.error('Analytics tracking error: Missing required page_type field', {
      received: pageView
    })
    return false
  }

  // Validate page_type is one of the allowed values
  const validPageTypes = ['product', 'blog', 'diy', 'shop', 'contact', 'about', 'home']
  if (!validPageTypes.includes(pageView.page_type)) {
    console.error('Analytics tracking error: Invalid page_type value', {
      received: pageView.page_type,
      validTypes: validPageTypes
    })
    return false
  }

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

    // Insert into Supabase analytics table with comprehensive error handling
    try {
      await supabase
        .from('page_views')
        .insert(analyticsData)
    } catch (insertError) {
      // Catch network errors, connection issues, or other unexpected errors during insert
      console.error('Analytics tracking insert operation failed:', {
        error: insertError instanceof Error ? {
          message: insertError.message,
          stack: insertError.stack,
          name: insertError.name
        } : insertError,
        attemptedData: {
          page_type: pageView.page_type,
          page_id: pageView.page_id,
          hasReferrer: !!referrer,
          hasUserAgent: !!userAgent,
          sessionId: sessionId.substring(0, 8) + '...',
          dataSize: JSON.stringify(analyticsData).length
        },
        originalPageView: {
          ...pageView,
          // Sanitize for logging (remove any potentially sensitive data)
          page_title: pageView.page_title,
          page_id: pageView.page_id,
          page_type: pageView.page_type
        },
        timestamp: new Date().toISOString(),
        context: 'Supabase insert operation'
      })
      return false
    }

    return true
  } catch (error) {
    // Catch any unexpected errors during the entire tracking process
    console.error('Analytics tracking unexpected error:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error,
      pageView: pageView,
      timestamp: new Date().toISOString(),
      context: 'trackPageView outer catch'
    })
    return false
  }
}
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
      console.error('Analytics fetch error:', {
        error: {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          fullError: error
        },
        attemptedQuery: {
          table: 'page_views',
          dateRange: dateRange,
          hasDateRange: !!dateRange
        },
        timestamp: new Date().toISOString()
      })
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
    console.error('Analytics summary unexpected error:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error,
      parameters: {
        dateRange: dateRange,
        hasDateRange: !!dateRange
      },
      timestamp: new Date().toISOString()
    })
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

    if (error) {
      console.error('Content analytics fetch error:', {
        error: {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          fullError: error
        },
        attemptedQuery: {
          table: 'page_views',
          contentType: contentType,
          dateRange: dateRange,
          hasDateRange: !!dateRange
        },
        timestamp: new Date().toISOString()
      })
      return null
    }

    if (!views) return null

    // Group by content ID and calculate metrics
    const contentStats: Record<string, {
      id: string | number
      title?: string
      total_views: number
      unique_viewers: number
      avg_time_on_page?: number
      [key: string]: string | number | boolean | undefined // Index signature for dynamic session tracking
    }> = {}

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
    console.error('Content analytics unexpected error:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error,
      parameters: {
        contentType: contentType,
        dateRange: dateRange,
        hasDateRange: !!dateRange
      },
      timestamp: new Date().toISOString()
    })
    return null
  }
}
