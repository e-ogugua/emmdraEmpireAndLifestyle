import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, consultation_type, budget, preferred_date, preferred_time, current_style, goals, message } = body

    // Validate required fields
    if (!name || !email || !consultation_type) {
      return NextResponse.json(
        { error: 'Name, email, and consultation type are required' },
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

    // Store consultation in database
    const { data: consultationData, error: consultationError } = await supabase
      .from('consultations')
      .insert({
        name,
        email,
        phone,
        consultation_type,
        budget,
        preferred_date,
        preferred_time,
        current_style,
        goals,
        message
      })
      .select()
      .single()

    if (consultationError) {
      console.error('Database error:', consultationError)
      return NextResponse.json(
        { error: 'Failed to save consultation to database' },
        { status: 500 }
      )
    }

    console.log('💅 Consultation stored in database:', consultationData)

    return NextResponse.json({
      success: true,
      message: 'Consultation request submitted successfully - we will contact you soon!',
      data: consultationData
    })

  } catch (error) {
    console.error('Consultation form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
