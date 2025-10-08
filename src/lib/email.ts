import nodemailer from 'nodemailer'

interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

interface SendEmailParams {
  subject: string
  bodyHtml: string
  bodyText: string
}

/**
 * Sends an email using Nodemailer with configuration from environment variables
 * @param params - Email parameters (subject, bodyHtml, bodyText)
 * @returns Promise<boolean> - Success status
 */
export async function sendEmail(params: SendEmailParams): Promise<boolean> {
  try {
    // Validate required environment variables
    const smtpHost = process.env.EMAIL_SERVER?.replace('smtp://', '') || process.env.SMTP_HOST
    const smtpPort = process.env.EMAIL_PORT || process.env.SMTP_PORT
    const smtpUser = process.env.EMAIL_USER || process.env.SMTP_USER
    const smtpPass = process.env.EMAIL_PASSWORD || process.env.SMTP_PASS
    const notifyEmail = process.env.NOTIFY_EMAIL || process.env.ORDER_NOTIFICATIONS_EMAIL || process.env.EMAIL_FROM?.match(/<([^>]+)>/)?.[1] || 'emmdraempire@gmail.com'

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !notifyEmail) {
      console.error('Email notification: Missing required environment variables')
      console.error('Required: EMAIL_SERVER or SMTP_HOST, EMAIL_PORT or SMTP_PORT, EMAIL_USER or SMTP_USER, EMAIL_PASSWORD or SMTP_PASS, NOTIFY_EMAIL or ORDER_NOTIFICATIONS_EMAIL')
      return false
    }

    // Create transporter configuration
    const config: EmailConfig = {
      host: smtpHost,
      port: parseInt(smtpPort),
      secure: parseInt(smtpPort) === 465, // Use SSL for port 465
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    }

    // Create transporter
    const transporter = nodemailer.createTransport(config)

    // Email options
    const mailOptions = {
      from: `"Emmdra Empire" <${smtpUser}>`,
      to: notifyEmail,
      subject: `[Emmdra Empire] ${params.subject}`,
      text: params.bodyText,
      html: params.bodyHtml
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)

    console.log('Email notification sent successfully:', {
      messageId: info.messageId,
      to: notifyEmail,
      subject: params.subject
    })

    return true

  } catch (error) {
    console.error('Email notification failed:', error)

    // Log additional error details for debugging
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }

    return false
  }
}

/**
 * Creates HTML email template with Emmdra Empire branding
 */
export function createEmailTemplate(content: string, type: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${type} - Emmdra Empire</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                 color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        .highlight { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0; }
        .button { display: inline-block; background: #007bff; color: white; padding: 12px 24px;
                 text-decoration: none; border-radius: 5px; margin: 10px 0; }
        .button:hover { background: #0056b3; }
        .details { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .label { font-weight: bold; color: #495057; }
        .value { margin-left: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛍️ Emmdra Empire</h1>
          <p>New ${type} Notification</p>
        </div>

        <div class="content">
          ${content}
        </div>

        <div class="footer">
          <p>This notification was sent automatically by the Emmdra Empire system.</p>
          <p>For inquiries, please contact our support team.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

/**
 * Creates text-only email content for better compatibility
 */
export function createTextEmail(content: string, type: string): string {
  return `
Emmdra Empire - New ${type} Notification

${content}

---
This notification was sent automatically by the Emmdra Empire system.
For inquiries, please contact our support team.
  `.trim()
}
