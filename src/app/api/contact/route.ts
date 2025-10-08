import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service_type, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Derive subject from service_type if not provided
    const finalSubject = subject || service_type || 'General Inquiry'

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Store contact message in database
    const { data: contactData, error: contactError } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        phone,
        subject: finalSubject,
        message
      })
      .select()
      .single()

    if (contactError) {
      console.error('Database error:', contactError)
      return NextResponse.json(
        { error: 'Failed to save contact message to database' },
        { status: 500 }
      )
    }

    console.log('📧 Contact message stored in database:', contactData)

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully - we will get back to you soon!',
      data: contactData
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
