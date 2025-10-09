import nodemailer from 'nodemailer'

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

// Create Gmail SMTP transporter
const createTransporter = () => {
  console.log('🔧 SMTP Configuration:', {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || '587',
    user: process.env.SMTP_USER || 'emmdraempire@gmail.com',
    hasPassword: !!process.env.SMTP_PASS
  });

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || 'emmdraempire@gmail.com',
      pass: process.env.SMTP_PASS || ''
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false // For testing only, consider proper SSL in production
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
export const sendEmail = async (options: EmailOptions): Promise<{ success: boolean; error?: string; details?: any }> => {
  try {
    console.log('🔍 Starting email send process...');
    
    // Verify required environment variables
    const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      const errorMsg = `Missing required SMTP environment variables: ${missingVars.join(', ')}`;
      console.error('❌', errorMsg);
      return { 
        success: false, 
        error: errorMsg,
        details: {
          missingVariables: missingVars,
          availableVariables: Object.keys(process.env).filter(k => k.startsWith('SMTP_'))
        }
      };
    }

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
    console.log('📧 SMTP config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      hasPassword: !!process.env.SMTP_PASS
    });

    const result = await transporter.sendMail(mailOptions as nodemailer.SendMailOptions)
    console.log('✅ Email sent successfully:', result.messageId)
    return { success: true, details: { messageId: result.messageId } }
  } catch (error: any) {
    console.error('❌ Email sending failed:', {
      error: error.message,
      stack: error.stack,
      code: error.code,
      response: error.response
    });
    
    return { 
      success: false, 
      error: error.message,
      details: {
        code: error.code,
        command: error.command,
        response: error.response
      }
    };
  }
}

// Create text-only email (fallback)
export const createTextEmail = (content: string, type: string) => {
  return `New ${type} - Emmdra Empire

${content.replace(/<[^>]*>/g, '')}

---
This email was sent from your Emmdra Empire website`
}
