import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendEmail, createEmailTemplate, createTextEmail } from '@/lib/email'

export async function GET() {
  const results: {
    timestamp: string
    environment: string
    checks: {
      environment_variables?: Record<string, boolean>
      database_connection?: {
        success: boolean
        error?: string | null
        can_query?: boolean
      }
      email_functionality?: {
        success: boolean
        message?: string
        error?: string
      }
      nextauth_config?: {
        has_secret: boolean
        has_url: boolean
        secret_length: number
        url_matches_site: boolean
      }
    }
    summary?: {
      all_environment_variables_present: boolean
      database_connection_working: boolean
      email_functionality_working: boolean
      overall_healthy: boolean
    }
  } = {
    timestamp: new Date().toISOString(),
    environment: process.env.NEXT_PUBLIC_APP_ENV || 'unknown',
    checks: {}
  }

  // Check critical environment variables
  const envChecks = {
    'NEXT_PUBLIC_SUPABASE_URL': !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    'NEXT_PUBLIC_SUPABASE_ANON_KEY': !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    'DATABASE_URL': !!process.env.DATABASE_URL,
    'RESEND_API_KEY': !!process.env.RESEND_API_KEY,
    'NEXTAUTH_SECRET': !!process.env.NEXTAUTH_SECRET,
    'NEXTAUTH_URL': !!process.env.NEXTAUTH_URL,
    'NEXT_PUBLIC_SITE_URL': !!process.env.NEXT_PUBLIC_SITE_URL,
    'ADMIN_EMAILS': !!process.env.ADMIN_EMAILS,
    'NEXT_PUBLIC_ADMIN_EMAILS': !!process.env.NEXT_PUBLIC_ADMIN_EMAILS
  }

  results.checks.environment_variables = envChecks

  // Test database connection
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1)

    results.checks.database_connection = {
      success: !error,
      error: error?.message || null,
      can_query: !!data
    }
  } catch (error) {
    results.checks.database_connection = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown database error'
    }
  }

  // Test email functionality
  try {
    const testEmailSent = await sendEmail({
      subject: 'Environment Test - ' + new Date().toISOString(),
      bodyHtml: createEmailTemplate('<p>This is a test email to verify your environment configuration is working correctly.</p>', 'Environment Test'),
      bodyText: createTextEmail('This is a test email to verify your environment configuration is working correctly.', 'Environment Test')
    })

    results.checks.email_functionality = {
      success: testEmailSent,
      message: testEmailSent
        ? 'Test email sent successfully'
        : 'Failed to send test email - check RESEND_API_KEY and email configuration'
    }
  } catch (error) {
    results.checks.email_functionality = {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown email error'
    }
  }
  results.checks.nextauth_config = {
    has_secret: !!process.env.NEXTAUTH_SECRET,
    has_url: !!process.env.NEXTAUTH_URL,
    secret_length: process.env.NEXTAUTH_SECRET ? process.env.NEXTAUTH_SECRET.length : 0,
    url_matches_site: process.env.NEXTAUTH_URL === process.env.NEXT_PUBLIC_SITE_URL
  }

  // Overall status
  const allEnvVarsPresent = Object.values(envChecks).every(Boolean)
  const databaseWorking = results.checks.database_connection?.success
  const emailWorking = results.checks.email_functionality?.success

  results.summary = {
    all_environment_variables_present: allEnvVarsPresent,
    database_connection_working: databaseWorking,
    email_functionality_working: emailWorking,
    overall_healthy: allEnvVarsPresent && databaseWorking && emailWorking
  }

  return NextResponse.json(results)
}
