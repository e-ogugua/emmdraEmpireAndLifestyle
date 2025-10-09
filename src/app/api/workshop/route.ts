import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, createEmailTemplate, createTextEmail } from '@/../lib/email'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      workshop_name,
      workshop_date,
      experience_level,
      special_requirements,
      group_size,
      budget,
      message
    } = body

    // Validate required fields
    if (!name || !email || !workshop_name) {
      return NextResponse.json(
        { error: 'Name, email, and workshop name are required' },
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

    // Save to database first
    const { data: registrationData, error: dbError } = await supabase
      .from('workshop_registrations')
      .insert([
        {
          name,
          email,
          phone,
          workshop_name,
          workshop_date,
          experience_level,
          special_requirements,
          group_size,
          budget,
          message
        }
      ])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save workshop registration' },
        { status: 500 }
      )
    }

    console.log('💅 Workshop registration stored in database:', registrationData)

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

        <div class="label">Workshop Interest:</div>
        <div class="value">${workshop_name}</div>

        ${workshop_date ? `
          <div class="label">Preferred Date:</div>
          <div class="value">${workshop_date}</div>
        ` : ''}

        ${experience_level ? `
          <div class="label">Experience Level:</div>
          <div class="value">${experience_level}</div>
        ` : ''}

        ${group_size ? `
          <div class="label">Group Size:</div>
          <div class="value">${group_size}</div>
        ` : ''}

        ${budget ? `
          <div class="label">Budget:</div>
          <div class="value">₦${budget}</div>
        ` : ''}

        ${special_requirements ? `
          <div class="label">Special Requirements:</div>
          <div class="value">${special_requirements}</div>
        ` : ''}

        ${message ? `
          <div class="label">Message:</div>
          <div class="value">${message}</div>
        ` : ''}
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
    const emailResult = await sendEmail({
      to: process.env.ORDER_NOTIFICATIONS_EMAIL || 'emmdraempire@gmail.com',
      subject,
      html: htmlBody,
      text: textBody
    })

    if (!emailResult.success) {
      console.warn('Email notification failed, but registration was saved to database')
    }

    return NextResponse.json({
      success: true,
      message: 'Workshop registration submitted successfully - we will contact you soon!',
      data: registrationData
    })

  } catch (error) {
    console.error('Workshop form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
