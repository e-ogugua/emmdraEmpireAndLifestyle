import { Resend } from 'resend'

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Email template function
export const createEmailTemplate = (content: string, type: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>New ${type} - Emmdra Empire</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2563eb;">🎯 New ${type} - Emmdra Empire</h1>
        ${content}
        <hr>
        <p>This email was sent from your Emmdra Empire website</p>
      </div>
    </body>
    </html>
  `
}

// Send email function using Resend
export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY not found')
      return false
    }

    console.log('📧 Sending email via Resend to:', options.to)
    console.log('📧 Subject:', options.subject)
    console.log('📧 API Key exists:', !!process.env.RESEND_API_KEY)
    console.log('📧 API Key prefix:', process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 10) + '...' : 'undefined')

    const result = await resend.emails.send({
      from: 'no-reply@resend.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
    })

    console.log('✅ Email sent successfully:', result.data?.id)
    return true
  } catch (error) {
    console.error('❌ Email sending failed:', error)
    console.error('❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      options: options
    })
    return false
  }
}
// Create text-only email (fallback)
export const createTextEmail = (content: string, type: string) => {
  return `New ${type} - Emmdra Empire

${content.replace(/<[^>]*>/g, '')}

---
This email was sent from your Emmdra Empire website`
}
