import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, createEmailTemplate, createTextEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service_type, message, appointment_type, preferred_date, preferred_time, location } = body

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

    // Create booking-specific email content
    const subject = `New Appointment Booking from ${name} - Emmdra Empire`
    const bookingContent = `
      <div class="highlight">
        <strong>New Appointment Booking!</strong>
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

        ${appointment_type ? `
          <div class="label">Appointment Type:</div>
          <div class="value">${appointment_type}</div>
        ` : ''}

        ${preferred_date ? `
          <div class="label">Preferred Date:</div>
          <div class="value">${preferred_date}</div>
        ` : ''}

        ${preferred_time ? `
          <div class="label">Preferred Time:</div>
          <div class="value">${preferred_time}</div>
        ` : ''}

        ${location ? `
          <div class="label">Location:</div>
          <div class="value">${location}</div>
        ` : ''}

        <div class="label">Message:</div>
        <div class="value">${message}</div>
      </div>

      <p>
        <a href="mailto:${email}?subject=Regarding your appointment booking" class="button">
          Reply to Customer
        </a>
      </p>
    `

    // Create HTML and text versions
    const htmlBody = createEmailTemplate(bookingContent, 'Appointment Booking')
    const textBody = createTextEmail(bookingContent, 'Appointment Booking')

    // Send email
    const emailSent = await sendEmail({
      subject,
      bodyHtml: htmlBody,
      bodyText: textBody
    })

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send booking notification email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Appointment booking submitted successfully - we will confirm with you soon!',
      data: {
        name,
        email,
        phone,
        service_type,
        appointment_type,
        preferred_date,
        preferred_time,
        location,
        message
      }
    })

  } catch (error) {
    console.error('Booking form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
