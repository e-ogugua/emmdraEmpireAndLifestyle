import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, training_type, experience_level, availability, goals, message } = body

    // Validate required fields
    if (!name || !email || !training_type) {
      return NextResponse.json(
        { error: 'Name, email, and training type are required' },
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

    // Store training request in database
    const { data: trainingData, error: trainingError } = await supabase
      .from('training_requests')
      .insert({
        name,
        email,
        phone,
        training_type,
        experience_level,
        availability,
        goals,
        message
      })
      .select()
      .single()

    if (trainingError) {
      console.error('Database error:', trainingError)
      return NextResponse.json(
        { error: 'Failed to save training request to database' },
        { status: 500 }
      )
    }

    console.log('🎓 Training request stored in database:', trainingData)

    return NextResponse.json({
      success: true,
      message: 'Training enrollment submitted successfully - we will contact you soon!',
      data: trainingData
    })

  } catch (error) {
    console.error('Training form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
