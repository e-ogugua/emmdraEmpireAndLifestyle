import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export interface PageView {
  id?: number
  page_type: 'product' | 'blog' | 'diy' | 'shop' | 'contact' | 'about' | 'home'
  page_id?: string | number
  page_title?: string
  referrer?: string
  user_agent?: string
  session_id?: string
  viewed_at: string
  metadata?: Record<string, unknown>
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const pageView: Omit<PageView, 'viewed_at' | 'session_id'> = body

    // Input validation
    if (!pageView || typeof pageView !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body - must be a non-null object' },
        { status: 400 }
      )
    }

    if (!pageView.page_type) {
      return NextResponse.json(
        { error: 'Missing required page_type field' },
        { status: 400 }
      )
    }

    // Validate page_type is one of the allowed values
    const validPageTypes = ['product', 'blog', 'diy', 'shop', 'contact', 'about', 'home']
    if (!validPageTypes.includes(pageView.page_type)) {
      return NextResponse.json(
        { error: 'Invalid page_type value', validTypes: validPageTypes },
        { status: 400 }
      )
    }

    // Generate anonymous session ID
    const sessionId = request.headers.get('x-session-id') ||
      `api-${Math.random().toString(36).substring(2, 15)}`

    // Get referrer and user agent from headers
    const referrer = request.headers.get('referer') || undefined
    const userAgent = request.headers.get('user-agent') || undefined

    const analyticsData: PageView = {
      ...pageView,
      session_id: sessionId,
      referrer,
      user_agent: userAgent,
      viewed_at: new Date().toISOString(),
    }

    // Insert into Supabase analytics table
    const { error: insertError } = await supabase
      .from('page_views')
      .insert(analyticsData)

    if (insertError) {
      console.error('Analytics insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to track page view', details: insertError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Page view tracked successfully'
    })

  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pageType = searchParams.get('type')
    const dateFrom = searchParams.get('from')
    const dateTo = searchParams.get('to')

    let query = supabase
      .from('page_views')
      .select('*')

    // Apply filters if provided
    if (pageType) {
      query = query.eq('page_type', pageType)
    }

    if (dateFrom) {
      query = query.gte('viewed_at', dateFrom)
    }

    if (dateTo) {
      query = query.lte('viewed_at', dateTo)
    }

    const { data: pageViews, error } = await query

    if (error) {
      console.error('Analytics fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch analytics', details: error.message },
        { status: 500 }
      )
    }

    if (!pageViews) {
      return NextResponse.json({ data: [] })
    }

    // Aggregate data for summary
    const summary = {
      total_views: pageViews.length,
      unique_sessions: new Set(pageViews.map(pv => pv.session_id)).size,
      page_type_breakdown: {} as Record<string, number>,
      daily_trends: {} as Record<string, number>
    }

    pageViews.forEach(pv => {
      // Page type breakdown
      summary.page_type_breakdown[pv.page_type] = (summary.page_type_breakdown[pv.page_type] || 0) + 1

      // Daily trends
      const date = new Date(pv.viewed_at).toISOString().split('T')[0]
      summary.daily_trends[date] = (summary.daily_trends[date] || 0) + 1
    })

    return NextResponse.json({
      data: pageViews,
      summary
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120', // Cache for 1 minute, stale for 2 minutes
        'CDN-Cache-Control': 'public, max-age=60',
        'Vercel-CDN-Cache-Control': 'public, max-age=60'
      }
    })

  } catch (error) {
    console.error('Analytics GET error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
