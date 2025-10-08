import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service_type, message } = body

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

    // For now, we'll store in a simple format or use localStorage/sessionStorage
    // In a real application, you would create a contact_submissions table
    console.log('📧 Contact form submission:', {
      name,
      email,
      phone,
      service_type,
      message,
      timestamp: new Date().toISOString()
    })

    // You can implement email sending here using a service like Resend, SendGrid, etc.
    // For now, we'll just log the submission and return success

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully - we will get back to you soon!',
      data: {
        name,
        email,
        phone,
        service_type,
        message
      }
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
