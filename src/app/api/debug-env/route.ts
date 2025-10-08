import { NextResponse } from 'next/server'
import { sendEmail, createEmailTemplate, createTextEmail } from '@/lib/email'

export async function GET() {
  try {
    // Test email configuration
    const testEmailSent = await sendEmail({
      subject: 'Email Configuration Test',
      bodyHtml: createEmailTemplate('<p>This is a test email to verify SMTP configuration.</p>', 'Test'),
      bodyText: createTextEmail('This is a test email to verify SMTP configuration.', 'Test')
    })

    if (testEmailSent) {
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully to emmdraempire@gmail.com'
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to send test email - check SMTP configuration'
      })
    }
  } catch (error) {
    console.error('Email test failed:', error)
    return NextResponse.json({
      success: false,
      error: 'Email test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
