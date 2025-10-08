import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

// Create transporter using SMTP configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER || 'emmdraempire@gmail.com', // Your Gmail address
      pass: process.env.EMAIL_PASS || 'your-app-password', // Your Gmail app password
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

// Send email function
export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'emmdraempire@gmail.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''),
    }

    console.log('📧 Sending email to:', options.to)
    console.log('📧 Subject:', options.subject)

    const result = await transporter.sendMail(mailOptions as nodemailer.SendMailOptions & { to: string })
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
This email was sent from your Emmdra Empire website
© 2024 Emmdra Empire. All rights reserved.
`
}
