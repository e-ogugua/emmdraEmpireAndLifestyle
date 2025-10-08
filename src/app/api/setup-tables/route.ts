import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('🔧 Setting up submission tables...')

    // Create orders table
    const { error: ordersError } = await supabase.rpc('exec_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          product_name TEXT NOT NULL,
          product_id TEXT,
          quantity TEXT NOT NULL,
          budget TEXT,
          size TEXT,
          color TEXT,
          message TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    if (ordersError) {
      console.error('Orders table error:', ordersError)
    }

    // Create consultations table
    const { error: consultationsError } = await supabase.rpc('exec_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS consultations (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          consultation_type TEXT NOT NULL,
          budget TEXT,
          preferred_date DATE,
          preferred_time TEXT,
          current_style TEXT,
          goals TEXT,
          message TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    if (consultationsError) {
      console.error('Consultations table error:', consultationsError)
    }

    // Create training_requests table
    const { error: trainingError } = await supabase.rpc('exec_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS training_requests (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          training_type TEXT NOT NULL,
          experience_level TEXT,
          availability TEXT,
          goals TEXT,
          message TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    if (trainingError) {
      console.error('Training requests table error:', trainingError)
    }

    // Create contact_messages table
    const { error: contactError } = await supabase.rpc('exec_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS contact_messages (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          subject TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    if (contactError) {
      console.error('Contact messages table error:', contactError)
    }

    console.log('✅ Tables setup completed!')

    return NextResponse.json({
      success: true,
      message: 'Database tables created successfully!'
    })

  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json(
      { error: 'Failed to create database tables' },
      { status: 500 }
    )
  }
}
