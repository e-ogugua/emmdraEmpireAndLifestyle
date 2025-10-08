import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, createEmailTemplate, createTextEmail } from '@/lib/email'

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

    // Create consultation-specific email content
    const subject = `New Consultation Request from ${name} - Emmdra Empire`
    const consultationContent = `
      <div class="highlight">
        <strong>New Consultation Request!</strong>
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

        ${consultation_type ? `
          <div class="label">Consultation Type:</div>
          <div class="value">${consultation_type}</div>
        ` : ''}

        ${preferred_date ? `
          <div class="label">Preferred Date:</div>
          <div class="value">${preferred_date}</div>
        ` : ''}

        ${preferred_time ? `
          <div class="label">Preferred Time:</div>
          <div class="value">${preferred_time}</div>
        ` : ''}

        <div class="label">Message:</div>
        <div class="value">${message}</div>
      </div>

      <p>
        <a href="mailto:${email}?subject=Regarding your consultation request" class="button">
          Reply to Customer
        </a>
      </p>
    `

    // Create HTML and text versions
    const htmlBody = createEmailTemplate(consultationContent, 'Consultation Request')
    const textBody = createTextEmail(consultationContent, 'Consultation Request')

    // Send email
    const emailSent = await sendEmail({
      subject,
      bodyHtml: htmlBody,
      bodyText: textBody
    })

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send consultation notification email' },
        { status: 500 }
      )
    }

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
