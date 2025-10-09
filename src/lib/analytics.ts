import { PageView } from '@/app/api/analytics/route'

// Remove unused supabase import since we're using API routes now

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

    const analyticsData = {
      ...pageView,
      session_id: sessionId,
      referrer,
      user_agent: userAgent,
      viewed_at: new Date().toISOString(),
    }

    // Use API route instead of direct Supabase call to avoid auth issues
    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(analyticsData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP ${response.status}`)
      }

      return true
    } catch (apiError) {
      // Fallback: try direct Supabase insert if API fails
      console.warn('Analytics API failed, attempting direct Supabase insert:', apiError)

      const { supabase } = await import('./supabase')
      await supabase
        .from('page_views')
        .insert(analyticsData)

      return true
    }

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
    const params = new URLSearchParams()
    if (dateRange) {
      params.append('from', dateRange.from)
      params.append('to', dateRange.to)
    }

    const response = await fetch(`/api/analytics?${params}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}`)
    }

    const { summary } = await response.json()
    return summary
  } catch (error) {
    console.error('Analytics summary fetch error:', {
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
    const params = new URLSearchParams({ type: contentType })
    if (dateRange) {
      params.append('from', dateRange.from)
      params.append('to', dateRange.to)
    }

    const response = await fetch(`/api/analytics?${params}`)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `HTTP ${response.status}`)
    }

    const { data: views } = await response.json()

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

    views.forEach((view: PageView) => {
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
      .sort((a: { total_views: number }, b: { total_views: number }) => b.total_views - a.total_views)
      .slice(0, 20) // Top 20 items

  } catch (error) {
    console.error('Content analytics fetch error:', {
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
