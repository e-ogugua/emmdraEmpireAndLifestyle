import nodemailer from 'nodemailer'

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Create Gmail SMTP transporter - handles email delivery configuration
const createTransporter = () => {
  console.log('SMTP Configuration:', {
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

// Email template function - generates consistent HTML email layouts
export const createEmailTemplate = (content: string, type: string) => {
  const isOrderConfirmation = type.toLowerCase().includes('confirmation')

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>New ${type} - Emmdra Empire - Developed by CEO (Chukwuka Emmanuel Ogugua)</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f8f9fa;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .content {
          padding: 30px;
        }
        .highlight {
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border: 2px solid #f59e0b;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          text-align: center;
        }
        .details {
          background-color: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .label {
          font-weight: bold;
          color: #374151;
          margin-top: 15px;
        }
        .value {
          color: #6b7280;
          margin-bottom: 10px;
          line-height: 1.5;
        }
        .value a {
          color: #f97316;
          text-decoration: none;
        }
        .value a:hover {
          text-decoration: underline;
        }
        ul {
          background-color: #eff6ff;
          border: 1px solid #dbeafe;
          border-radius: 6px;
          padding: 15px 20px;
          margin: 15px 0;
        }
        li {
          margin-bottom: 8px;
          color: #1e40af;
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
          margin: 10px 5px;
          transition: transform 0.2s ease;
        }
        .button:hover {
          transform: translateY(-2px);
        }
        .signature {
          background-color: #f3f4f6;
          padding: 20px;
          border-radius: 0 0 8px 8px;
          border-top: 1px solid #e5e7eb;
          margin-top: 20px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          color: #6b7280;
          font-size: 14px;
          border-top: 1px solid #e5e7eb;
        }
        @media (max-width: 600px) {
          .header, .content {
            padding: 20px;
          }
          .header h1 {
            font-size: 24px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${isOrderConfirmation ? 'Order Confirmation' : `New ${type}`} - Emmdra Empire - Developed by CEO (Chukwuka Emmanuel Ogugua)</h1>
        </div>
        <div class="content">
          ${content}
        </div>
        <div class="footer">
          <p>This email was sent from your Emmdra Empire website - Developed by CEO (Chukwuka Emmanuel Ogugua)</p>
          <p>Nigeria | Quality Products and Lifestyle</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Send email function using Gmail SMTP - handles email delivery with error handling
interface EmailResponse {
  success: boolean;
  error?: string;
  details?: {
    messageId?: string;
    code?: string;
    command?: string;
    response?: string;
    missingVariables?: string[];
    availableVariables?: string[];
  };
}

export async function sendEmail(options: EmailOptions): Promise<EmailResponse> {
  try {
    console.log('Starting email send process...');

    // Verify required environment variables - ensures SMTP configuration is complete
    const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
      const errorMsg = `Missing required SMTP environment variables: ${missingVars.join(', ')}`;
      console.error('Email configuration error:', errorMsg);
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

    console.log('Sending email via Gmail SMTP to:', options.to)
    console.log('Subject:', options.subject)
    console.log('SMTP config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      hasPassword: !!process.env.SMTP_PASS
    });

    const result = await transporter.sendMail(mailOptions as nodemailer.SendMailOptions)
    console.log('Email sent successfully:', result.messageId)
    return { success: true, details: { messageId: result.messageId } }
  } catch (error: unknown) {
    const err = error as Error & { code?: string; command?: string; response?: string };
    console.error('Email sending failed:', {
      error: err.message,
      stack: err.stack,
      code: err.code,
      response: err.response
    });

    return {
      success: false,
      error: err.message,
      details: {
        code: err.code,
        command: err.command,
        response: err.response
      }
    };
  }
}

// Create text-only email (fallback) - provides plain text alternative for email clients
export const createTextEmail = (content: string, type: string) => {
  return `New ${type} - Emmdra Empire - Developed by CEO (Chukwuka Emmanuel Ogugua)

${content.replace(/<[^>]*>/g, '')}

---
This email was sent from your Emmdra Empire website - Developed by CEO (Chukwuka Emmanuel Ogugua)`
}
