import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, createEmailTemplate, createTextEmail } from '@/lib/email'

interface NotificationData {
  type: 'booking' | 'order' | 'contact'
  data: Record<string, unknown>
}

export async function POST(request: NextRequest) {
  try {
    const body: NotificationData = await request.json()

    if (!body.type || !body.data) {
      return NextResponse.json(
        { error: 'Missing required fields: type and data' },
        { status: 400 }
      )
    }

    const { type, data } = body

    // Validate required data based on type
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Missing required data: name and email are required' },
        { status: 400 }
      )
    }

    // Create email content based on notification type
    let subject = ''
    let content = ''
    let emailData: { [key: string]: unknown } = {}

    switch (type) {
      case 'booking':
        subject = `New Booking from ${data.name}`
        content = createBookingEmailContent(data)
        emailData = { ...data, type: 'Booking Inquiry' }
        break

      case 'order':
        subject = `New Order from ${data.name}`
        content = createOrderEmailContent(data)
        emailData = { ...data, type: 'Order' }
        break

      case 'contact':
        subject = `New Contact Form Submission from ${data.name}`
        content = createContactEmailContent(data)
        emailData = { ...data, type: 'Contact Form' }
        break

      default:
        return NextResponse.json(
          { error: 'Invalid notification type. Must be booking, order, or contact' },
          { status: 400 }
        )
    }

    // Create HTML and text versions
    const htmlBody = createEmailTemplate(content, emailData.type as string)
    const textBody = createTextEmail(content, emailData.type as string)

    // Send email
    const emailSent = await sendEmail({
      subject,
      bodyHtml: htmlBody,
      bodyText: textBody
    })

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send notification email' },
        { status: 500 }
      )
    }

    // Log success
    console.log(`Notification email sent successfully for ${type}:`, {
      id: data.id,
      name: data.name,
      email: data.email,
      type: emailData.type,
      recipient: process.env.NOTIFY_EMAIL || process.env.EMAIL_FROM?.match(/<([^>]+)>/)?.[1] || 'emmdraempire@gmail.com'
    })

    return NextResponse.json({
      success: true,
      message: 'Notification email sent successfully',
      data: {
        type,
        recipient: process.env.NOTIFY_EMAIL,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Notification API error:', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Email content creators for different notification types

function createBookingEmailContent(data: Record<string, unknown>): string {
  return `
    <div class="highlight">
      <strong>New Booking Received!</strong>
    </div>

    <div class="details">
      <div class="label">Customer Name:</div>
      <div class="value">${data.name}</div>

      <div class="label">Email:</div>
      <div class="value">
        <a href="mailto:${data.email}">${data.email}</a>
      </div>

      ${data.phone ? `
        <div class="label">Phone:</div>
        <div class="value">
          <a href="tel:${data.phone}">${data.phone}</a>
        </div>
      ` : ''}

      <div class="label">Service Type:</div>
      <div class="value">${data.service_type || 'Not specified'}</div>

      <div class="label">Message:</div>
      <div class="value">${data.message || 'No message provided'}</div>
    </div>

    <p>
      <a href="mailto:${data.email}?subject=Regarding your booking inquiry" class="button">
        Reply to Customer
      </a>
    </p>
  `
}

function createOrderEmailContent(data: NotificationData['data']): string {
  return `
    <div class="highlight">
      <strong>New Order Received!</strong>
    </div>

    <div class="details">
      <div class="label">Customer Name:</div>
      <div class="value">${data.name}</div>

      <div class="label">Email:</div>
      <div class="value">
        <a href="mailto:${data.email}">${data.email}</a>
      </div>

      ${data.phone ? `
        <div class="label">Phone:</div>
        <div class="value">
          <a href="tel:${data.phone}">${data.phone}</a>
        </div>
      ` : ''}

      ${data.amount ? `
        <div class="label">Order Amount:</div>
        <div class="value">₦${data.amount.toLocaleString()}</div>
      ` : ''}

      ${data.items && (data.items as string[]).length > 0 ? `
        <div class="label">Items:</div>
        <div class="value">
          <ul>
            ${(data.items as string[]).map((item: string) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${data.message ? `
        <div class="label">Additional Notes:</div>
        <div class="value">${data.message}</div>
      ` : ''}
    </div>

    <p>
      <a href="mailto:${data.email}?subject=Regarding your order" class="button">
        Reply to Customer
      </a>
    </p>
  `
}

function createContactEmailContent(data: NotificationData['data']): string {
  return `
    <div class="highlight">
      <strong>New Contact Form Submission!</strong>
    </div>

    <div class="details">
      <div class="label">Name:</div>
      <div class="value">${data.name}</div>

      <div class="label">Email:</div>
      <div class="value">
        <a href="mailto:${data.email}">${data.email}</a>
      </div>

      ${data.phone ? `
        <div class="label">Phone:</div>
        <div class="value">
          <a href="tel:${data.phone}">${data.phone}</a>
        </div>
      ` : ''}

      <div class="label">Message:</div>
      <div class="value">${data.message || 'No message provided'}</div>
    </div>

    <p>
      <a href="mailto:${data.email}?subject=Regarding your inquiry" class="button">
        Reply to Customer
      </a>
    </p>
  `
}
