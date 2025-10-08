import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendEmail, createEmailTemplate, createTextEmail } from '@/lib/email'

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
    const subject = `New Product Order from ${name} - Emmdra Empire`

    const orderContent = `
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

    const htmlBody = createEmailTemplate(orderContent, 'Product Order')
    const textBody = createTextEmail(orderContent, 'Product Order')

    // Send email to admin (you can configure multiple admin emails)
    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || ['emmdraempire@gmail.com']
    for (const adminEmail of adminEmails) {
      if (adminEmail.trim()) {
        const mailOptions = {
          to: adminEmail.trim(),
          subject,
          html: htmlBody,
          text: textBody,
        }

        await sendEmail(mailOptions as any)
      }
    }

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
