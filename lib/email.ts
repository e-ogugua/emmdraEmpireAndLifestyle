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
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New ${type} - Emmdra Empire</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8f9fa;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        }
        .content {
          background: white;
          padding: 30px;
          border-radius: 0 0 10px 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .highlight {
          background: #e3f2fd;
          padding: 15px;
          border-left: 4px solid #2196f3;
          margin: 20px 0;
          border-radius: 4px;
        }
        .details {
          margin: 20px 0;
        }
        .label {
          font-weight: bold;
          color: #555;
          margin-top: 10px;
        }
        .value {
          margin-bottom: 5px;
          padding: 8px;
          background: #f8f9fa;
          border-radius: 4px;
        }
        .button {
          display: inline-block;
          background: #2196f3;
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          margin: 20px 0;
          font-weight: bold;
        }
        .button:hover {
          background: #1976d2;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎯 Emmdra Empire</h1>
        <p>New ${type} Received</p>
      </div>

      <div class="content">
        ${content}
      </div>

      <div class="footer">
        <p>This email was sent from your Emmdra Empire website</p>
        <p>© 2024 Emmdra Empire. All rights reserved.</p>
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

    const result = await resend.emails.send({
      from: 'Emmdra Empire <onboarding@resend.com>',
      to: [options.to],
      subject: options.subject,
      html: options.html,
      text: options.text,
    })

    console.log('✅ Email sent successfully:', result.data?.id)
    return true
  } catch (error) {
    console.error('❌ Email sending failed:', error)
    return false
  }
}

// Create text-only email (fallback)
export const createTextEmail = (content: string, type: string) => {
  return `New ${type} - Emmdra Empire

${content.replace(/<[^>]*>/g, '')}

---
This email was sent from your Emmdra Empire website
© 2024 Emmdra Empire. All rights reserved.
`
}
