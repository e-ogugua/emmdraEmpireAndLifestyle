import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, createEmailTemplate, createTextEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service_type, message, workshop_name, workshop_date, experience_level } = body

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

    // Create workshop-specific email content
    const subject = `New Workshop Registration from ${name} - Emmdra Empire`
    const workshopContent = `
      <div class="highlight">
        <strong>New Workshop Registration!</strong>
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

        ${workshop_name ? `
          <div class="label">Workshop Interest:</div>
          <div class="value">${workshop_name}</div>
        ` : ''}

        ${workshop_date ? `
          <div class="label">Preferred Date:</div>
          <div class="value">${workshop_date}</div>
        ` : ''}

        ${experience_level ? `
          <div class="label">Experience Level:</div>
          <div class="value">${experience_level}</div>
        ` : ''}

        <div class="label">Message:</div>
        <div class="value">${message}</div>
      </div>

      <p>
        <a href="mailto:${email}?subject=Regarding your workshop registration" class="button">
          Reply to Customer
        </a>
      </p>
    `

    // Create HTML and text versions
    const htmlBody = createEmailTemplate(workshopContent, 'Workshop Registration')
    const textBody = createTextEmail(workshopContent, 'Workshop Registration')

    // Send email
    const emailSent = await sendEmail({
      subject,
      bodyHtml: htmlBody,
      bodyText: textBody
    })

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send workshop notification email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Workshop registration submitted successfully - we will contact you soon!',
      data: {
        name,
        email,
        phone,
        service_type,
        workshop_name,
        workshop_date,
        experience_level,
        message
      }
    })

  } catch (error) {
    console.error('Workshop form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
