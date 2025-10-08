import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, createEmailTemplate, createTextEmail } from '@/lib/email'

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

    // Create order-specific email content
    const subject = `New Product Order from ${name} - Emmdra Empire`
    const orderContent = `
      <div class="highlight">
        <strong>New Product Order Received!</strong>
      </div>

      <div class="details">
        <div class="label">Customer Name:</div>
        <div class="value">${name}</div>

        <div class="label">Email:</div>
        <div class="value">
          <a href="mailto:${email}">${email}</a>
        </div>

        ${phone ? `
          <div class="label">Phone:</div>
          <div class="value">
            <a href="tel:${phone}">${phone}</a>
          </div>
        ` : ''}

        ${product_details ? `
          <div class="label">Product Details:</div>
          <div class="value">${product_details}</div>
        ` : ''}

        ${quantity ? `
          <div class="label">Quantity:</div>
          <div class="value">${quantity}</div>
        ` : ''}

        ${budget ? `
          <div class="label">Budget:</div>
          <div class="value">₦${budget.toLocaleString()}</div>
        ` : ''}

        <div class="label">Message:</div>
        <div class="value">${message}</div>
      </div>

      <p>
        <a href="mailto:${email}?subject=Regarding your order inquiry" class="button">
          Reply to Customer
        </a>
      </p>
    `

    // Create HTML and text versions
    const htmlBody = createEmailTemplate(orderContent, 'Product Order')
    const textBody = createTextEmail(orderContent, 'Product Order')

    // Send email
    const emailSent = await sendEmail({
      subject,
      bodyHtml: htmlBody,
      bodyText: textBody
    })

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send order notification email' },
        { status: 500 }
      )
    }

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
