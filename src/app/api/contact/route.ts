import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendEmail, createEmailTemplate } from '@/../lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service_type, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Derive subject from service_type if not provided
    const finalSubject = subject || service_type || 'General Inquiry'

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Store contact message in database
    const { data: contactData, error: contactError } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        phone,
        subject: finalSubject,
        message
      })
      .select()
      .single()

    if (contactError) {
      console.error('Database error:', contactError)
      return NextResponse.json(
        { error: 'Failed to save contact message to database' },
        { status: 500 }
      )
    }

    console.log('📧 Contact message stored in database:', contactData)

    // Send email notification
    const emailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Subject:</strong> ${finalSubject}</p>
      <p><strong>Message:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <p>This message was submitted through the Emmdra Empire contact form.</p>
    `;

    const emailResult = await sendEmail({
      to: process.env.ORDER_NOTIFICATIONS_EMAIL || 'emmdraempire@gmail.com',
      subject: `New Contact: ${finalSubject}`,
      html: createEmailTemplate(emailContent, 'Contact Form Submission')
    });

    console.log('📧 Email sending result:', emailResult);

    if (!emailResult.success) {
      console.error('❌ Failed to send email notification:', emailResult.error);
      // Don't fail the request if email sending fails, just log it
    }

    // Send confirmation email to the user
    const userEmailContent = `
      <h2>Thank you for contacting Emmdra Empire!</h2>
      <p>We've received your message and will get back to you as soon as possible.</p>
      <p><strong>Your message:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      <p>If you have any urgent inquiries, please don't hesitate to contact us directly at emmdraempire@gmail.com</p>
    `;

    const userEmailResult = await sendEmail({
      to: email,
      subject: `Thank you for contacting Emmdra Empire!`,
      html: createEmailTemplate(userEmailContent, 'Thank You for Contacting Us')
    });

    if (!userEmailResult.success) {
      console.error('❌ Failed to send confirmation email:', userEmailResult.error);
    }

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully - we will get back to you soon!',
      data: {
        ...contactData,
        emailNotificationSent: emailResult.success,
        confirmationEmailSent: userEmailResult.success
      }
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
