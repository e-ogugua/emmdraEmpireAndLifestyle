import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('📊 API: Fetching admin stats...')

    // Fetch counts for all content types
    const [productsRes, blogsRes, diyRes, workshopsRes, bookingsRes, ordersRes, consultationsRes, trainingRes, contactRes, newsletterRes] = await Promise.all([
      supabase.from('products').select('id', { count: 'exact', head: true }),
      supabase.from('blogs').select('id', { count: 'exact', head: true }),
      supabase.from('diy_tutorials').select('id', { count: 'exact', head: true }),
      supabase.from('workshops').select('id', { count: 'exact', head: true }),
      supabase.from('bookings').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('id', { count: 'exact', head: true }),
      supabase.from('consultations').select('id', { count: 'exact', head: true }),
      supabase.from('training_requests').select('id', { count: 'exact', head: true }),
      supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
      supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true })
    ])

    const stats = {
      products: productsRes.count || 0,
      blogs: blogsRes.count || 0,
      diyTutorials: diyRes.count || 0,
      workshops: workshopsRes.count || 0,
      bookings: bookingsRes.count || 0,
      orders: ordersRes.count || 0,
      consultations: consultationsRes.count || 0,
      trainingRequests: trainingRes.count || 0,
      contactMessages: contactRes.count || 0,
      newsletterSubscribers: newsletterRes.count || 0
    }

    console.log('✅ API: Stats fetched successfully:', stats)

    return NextResponse.json({
      stats,
      success: true
    })

  } catch (error) {
    console.error('❌ API: Error fetching admin stats:', error)

    // Return zero counts on error to prevent breaking the UI
    const fallbackStats = {
      products: 0,
      blogs: 0,
      diyTutorials: 0,
      workshops: 0,
      bookings: 0,
      orders: 0,
      consultations: 0,
      trainingRequests: 0,
      contactMessages: 0,
      newsletterSubscribers: 0
    }

    return NextResponse.json({
      stats: fallbackStats,
      success: false,
      error: 'Failed to fetch stats'
    })
  }
}
