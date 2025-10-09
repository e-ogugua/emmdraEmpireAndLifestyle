import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendEmail, createEmailTemplate, createTextEmail } from '@/../lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, training_type, experience_level, availability, goals, message } = body

    // Validate required fields
    if (!name || !email || !training_type) {
      return NextResponse.json(
        { error: 'Name, email, and training type are required' },
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

    // Store training request in database
    const { data: trainingData, error: trainingError } = await supabase
      .from('training_requests')
      .insert({
        name,
        email,
        phone,
        training_type,
        experience_level,
        availability,
        goals,
        message
      })
      .select()
      .single()

    if (trainingError) {
      console.error('Database error:', trainingError)
      return NextResponse.json(
        { error: 'Failed to save training request to database' },
        { status: 500 }
      )
    }

    console.log('🎓 Training request stored in database:', trainingData)

    // Send email notification to admin
    const subject = `New Training Request from ${name} - Emmdra Empire`

    const trainingContent = `
      <div class="highlight">
        <strong>New Training Enrollment Request!</strong>
      </div>

      <div class="details">
        <div class="label">Student Name:</div>
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

        <div class="label">Training Type:</div>
        <div class="value">${training_type}</div>

        ${experience_level ? `
          <div class="label">Experience Level:</div>
          <div class="value">${experience_level}</div>
        ` : ''}

        ${availability ? `
          <div class="label">Availability:</div>
          <div class="value">${availability}</div>
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
        <a href="mailto:${email}?subject=Regarding your training enrollment" class="button">
          Reply to Student
        </a>
      </p>
    `

    const htmlBody = createEmailTemplate(trainingContent, 'Training Request')
    const textBody = createTextEmail(trainingContent, 'Training Request')

    // Send email to admin (you can configure multiple admin emails)
    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [process.env.NOTIFY_EMAIL || process.env.ORDER_NOTIFICATIONS_EMAIL || 'emmdraempire@gmail.com']
    for (const adminEmail of adminEmails) {
      if (adminEmail.trim()) {
        const emailOptions = {
          to: adminEmail.trim(),
          subject,
          html: htmlBody,
          text: textBody,
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await sendEmail(emailOptions as any)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Training enrollment submitted successfully - we will contact you soon!',
      data: trainingData
    })

  } catch (error) {
    console.error('Training form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
