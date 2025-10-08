import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendEmail, createEmailTemplate, createTextEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, consultation_type, budget, preferred_date, preferred_time, current_style, goals, message } = body

    // Validate required fields
    if (!name || !email || !consultation_type) {
      return NextResponse.json(
        { error: 'Name, email, and consultation type are required' },
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

    // Store consultation in database
    const { data: consultationData, error: consultationError } = await supabase
      .from('consultations')
      .insert({
        name,
        email,
        phone,
        consultation_type,
        budget,
        preferred_date,
        preferred_time,
        current_style,
        goals,
        message
      })
      .select()
      .single()

    if (consultationError) {
      console.error('Database error:', consultationError)
      return NextResponse.json(
        { error: 'Failed to save consultation to database' },
        { status: 500 }
      )
    }

    console.log('💅 Consultation stored in database:', consultationData)

    // Send email notification to admin
    const subject = `New Consultation Request from ${name} - Emmdra Empire`

    const consultationContent = `
      <div class="highlight">
        <strong>New Consultation Request Received!</strong>
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

        <div class="label">Consultation Type:</div>
        <div class="value">${consultation_type}</div>

        ${budget ? `
          <div class="label">Budget:</div>
          <div class="value">₦${budget}</div>
        ` : ''}

        ${preferred_date ? `
          <div class="label">Preferred Date:</div>
          <div class="value">${new Date(preferred_date).toLocaleDateString()}</div>
        ` : ''}

        ${preferred_time ? `
          <div class="label">Preferred Time:</div>
          <div class="value">${preferred_time}</div>
        ` : ''}

        ${current_style ? `
          <div class="label">Current Style:</div>
          <div class="value">${current_style}</div>
        ` : ''}

        ${goals ? `
          <div class="label">Goals:</div>
          <div class="value">${goals}</div>
        ` : ''}

        ${message ? `
          <div class="label">Additional Message:</div>
          <div class="value">${message}</div>
        ` : ''}
      </div>

      <p>
        <a href="mailto:${email}?subject=Regarding your consultation request" class="button">
          Reply to Customer
        </a>
      </p>
    `

    const htmlBody = createEmailTemplate(consultationContent, 'Consultation Request')
    const textBody = createTextEmail(consultationContent, 'Consultation Request')

    // Send email to admin (you can configure multiple admin emails)
    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || ['emmdraempire@gmail.com']

    for (const adminEmail of adminEmails) {
      if (adminEmail.trim()) {
        await sendEmail({
          to: adminEmail.trim(),
          subject,
          html: htmlBody,
          text: textBody
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Consultation request submitted successfully - we will contact you soon!',
      data: consultationData
    })

  } catch (error) {
    console.error('Consultation form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
