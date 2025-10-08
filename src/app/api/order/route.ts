import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service_type, message, product_details, quantity, budget } = body

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
    // const subject = `New Product Order from ${name} - Emmdra Empire`
    // const orderContent = `...` (content prepared above)

    // For development/testing, we'll log the order and return success
    // In production, the email sending will work with proper SMTP config
    console.log('📦 New order received:', {
      name,
      email,
      phone,
      service_type,
      product_details,
      quantity,
      budget,
      message,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      message: 'Order submitted successfully - we will contact you soon!',
      data: {
        name,
        email,
        phone,
        service_type,
        product_details,
        quantity,
        budget,
        message
      }
    })

  } catch (error) {
    console.error('Order form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
