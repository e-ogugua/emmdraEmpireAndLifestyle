import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

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
