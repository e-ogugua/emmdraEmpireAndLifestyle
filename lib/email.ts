import nodemailer from 'nodemailer'

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

// Create Gmail SMTP transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'emmdraempire@gmail.com',
    },
    tls: {
      ciphers: 'SSLv3'
    }
  })
}

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
    </body>
    </html>
  `
}

// Send email function using Gmail SMTP
export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.SMTP_USER || 'emmdraempire@gmail.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''),
    }

    console.log('📧 Sending email via Gmail SMTP to:', options.to)
    console.log('📧 Subject:', options.subject)
    console.log('📧 SMTP config exists:', !!process.env.SMTP_HOST)

    const result = await transporter.sendMail(mailOptions as nodemailer.SendMailOptions)
    console.log('✅ Email sent successfully:', result.messageId)
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
This email was sent from your Emmdra Empire website`
}
