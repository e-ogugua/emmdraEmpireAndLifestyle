import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendEmail, createEmailTemplate, createTextEmail } from '@/../lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, product_name, product_id, quantity, budget, size, color, message } = body

    // Validate required fields
    if (!name || !email || !product_name || !quantity) {
      return NextResponse.json(
        { error: 'Name, email, product name, and quantity are required' },
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

    // Store order in database
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        name,
        email,
        phone,
        product_name,
        product_id,
        quantity,
        budget,
        size,
        color,
        message
      })
      .select()
      .single()

    if (orderError) {
      console.error('Database error:', orderError)
      return NextResponse.json(
        { error: 'Failed to save order to database' },
        { status: 500 }
      )
    }

    console.log('📦 Order stored in database:', orderData)

    // Send email notification to admin
    const adminSubject = `New Product Order from ${name} - Emmdra Empire`

    const adminContent = `
      <div class="highlight">
        <strong>New Product Order Received!</strong>
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

        <div class="label">Product Name:</div>
        <div class="value">${product_name}</div>

        ${product_id ? `
          <div class="label">Product ID:</div>
          <div class="value">${product_id}</div>
        ` : ''}

        <div class="label">Quantity:</div>
        <div class="value">${quantity}</div>

        ${budget ? `
          <div class="label">Budget:</div>
          <div class="value">₦${budget}</div>
        ` : ''}

        ${size ? `
          <div class="label">Size:</div>
          <div class="value">${size}</div>
        ` : ''}

        ${color ? `
          <div class="label">Color:</div>
          <div class="value">${color}</div>
        ` : ''}

        ${message ? `
          <div class="label">Additional Message:</div>
          <div class="value">${message}</div>
        ` : ''}
      </div>

      <p>
        <a href="mailto:${email}?subject=Regarding your order for ${product_name}" class="button">
          Reply to Customer
        </a>
      </p>
    `

    const adminHtmlBody = createEmailTemplate(adminContent, 'Product Order')
    const adminTextBody = createTextEmail(adminContent, 'Product Order')

    // Send email to admin (you can configure multiple admin emails)
    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [process.env.NOTIFY_EMAIL || process.env.ORDER_NOTIFICATIONS_EMAIL || 'emmdraempire@gmail.com']
    for (const adminEmail of adminEmails) {
      if (adminEmail.trim()) {
        const emailOptions = {
          to: adminEmail.trim(),
          subject: adminSubject,
          html: adminHtmlBody,
          text: adminTextBody,
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await sendEmail(emailOptions as any)
      }
    }

    // Send confirmation email to customer
    const customerSubject = `Order Confirmation - Emmdra Empire`

    const customerContent = `
      <div class="highlight">
        <strong>Thank you for your order, ${name}!</strong>
      </div>

      <div class="details">
        <p>We've received your order and will contact you soon with payment details and delivery information.</p>

        <div class="label">Order Summary:</div>
        <div class="value">
          <strong>Product:</strong> ${product_name}<br>
          <strong>Quantity:</strong> ${quantity}<br>
          ${budget ? `<strong>Total:</strong> ₦${budget}<br>` : ''}
        </div>

        ${message ? `
          <div class="label">Order Details:</div>
          <div class="value">${message}</div>
        ` : ''}

        <p><strong>What happens next?</strong></p>
        <ul>
          <li>We'll review your order and contact you within 24 hours</li>
          <li>You'll receive payment details and delivery options</li>
          <li>Your order will be processed once payment is confirmed</li>
        </ul>

        <p>If you have any questions, please don't hesitate to contact us:</p>
        <p>
          📧 Email: emmdraempire@gmail.com<br>
          📞 Phone: Available after we contact you
        </p>
      </div>

      <p class="signature">
        Best regards,<br>
        The Emmdra Empire Team
      </p>
    `

    const customerHtmlBody = createEmailTemplate(customerContent, 'Order Confirmation')
    const customerTextBody = createTextEmail(customerContent, 'Order Confirmation')

    // Send confirmation email to customer
    const customerEmailOptions = {
      to: email,
      subject: customerSubject,
      html: customerHtmlBody,
      text: customerTextBody,
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await sendEmail(customerEmailOptions as any)

    console.log('✅ Emails sent successfully to admin and customer')

    return NextResponse.json({
      success: true,
      message: 'Order submitted successfully - we will contact you soon!',
      data: orderData
    })

  } catch (error) {
    console.error('Order form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
