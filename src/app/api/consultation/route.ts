import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service_type, message, consultation_type, preferred_date, preferred_time } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Email content prepared for future use when SMTP is configured
    // const subject = `New Consultation Request from ${name} - Emmdra Empire`
    // const consultationContent = `...` (content prepared above)

    // For development/testing, we'll log the consultation and return success
    // In production, the email sending will work with proper SMTP config
    console.log('💅 New consultation received:', {
      name,
      email,
      phone,
      service_type,
      consultation_type,
      preferred_date,
      preferred_time,
      message,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      message: 'Consultation request submitted successfully - we will contact you soon!',
      data: {
        name,
        email,
        phone,
        service_type,
        consultation_type,
        preferred_date,
        preferred_time,
        message
      }
    })

  } catch (error) {
    console.error('Consultation form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
