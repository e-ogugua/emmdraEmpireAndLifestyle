import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', email)
      .single()

    if (existingSubscriber) {
      return NextResponse.json(
        { success: false, message: 'You are already subscribed to our newsletter' },
        { status: 409 }
      )
    }

    // Store newsletter subscription in database
    const { data: subscriberData, error: subscriberError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email,
        subscribed_at: new Date().toISOString(),
        status: 'active'
      })
      .select()
      .single()

    if (subscriberError) {
      console.error('❌ Error storing newsletter subscription:', subscriberError)
      return NextResponse.json(
        { success: false, message: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      )
    }

    console.log('✅ Newsletter subscription stored:', subscriberData)

    // TODO: Send welcome email to subscriber
    // const welcomeEmailSent = await sendWelcomeEmail(email)

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing! You\'ll receive our latest stories and updates.',
      data: subscriberData
    })

  } catch (error) {
    console.error('❌ Newsletter subscription error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
