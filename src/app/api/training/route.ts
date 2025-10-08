import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, createEmailTemplate, createTextEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service_type, message, training_program, training_date, experience_level, goals } = body

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

    // Create training-specific email content
    const subject = `New Training Enrollment from ${name} - Emmdra Empire`
    const trainingContent = `
      <div class="highlight">
        <strong>New Training Enrollment!</strong>
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

        ${training_program ? `
          <div class="label">Training Program:</div>
          <div class="value">${training_program}</div>
        ` : ''}

        ${training_date ? `
          <div class="label">Preferred Start Date:</div>
          <div class="value">${training_date}</div>
        ` : ''}

        ${experience_level ? `
          <div class="label">Current Experience:</div>
          <div class="value">${experience_level}</div>
        ` : ''}

        ${goals ? `
          <div class="label">Training Goals:</div>
          <div class="value">${goals}</div>
        ` : ''}

        <div class="label">Message:</div>
        <div class="value">${message}</div>
      </div>

      <p>
        <a href="mailto:${email}?subject=Regarding your training enrollment" class="button">
          Reply to Customer
        </a>
      </p>
    `

    // Create HTML and text versions
    const htmlBody = createEmailTemplate(trainingContent, 'Training Enrollment')
    const textBody = createTextEmail(trainingContent, 'Training Enrollment')

    // Send email
    const emailSent = await sendEmail({
      subject,
      bodyHtml: htmlBody,
      bodyText: textBody
    })

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send training notification email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Training enrollment submitted successfully - we will contact you soon!',
      data: {
        name,
        email,
        phone,
        service_type,
        training_program,
        training_date,
        experience_level,
        goals,
        message
      }
    })

  } catch (error) {
    console.error('Training form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
