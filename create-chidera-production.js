import { createClient } from '@supabase/supabase-js'

// Use the production Supabase URL and service key
const supabaseUrl = 'https://kjfqspuygiatifebgpkd.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqZnFzcHV5Z2lhdGlmZWJncGtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTU5MzU1OSwiZXhwIjoyMDc1MTY5NTU5fQ.q5YjKT8RybtcUTAqPVpqb3Ufw4tidXJhSBa4Dq5cBx8'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createChideraAccount() {
  try {
    console.log('🔧 Creating Chidera admin account in production Supabase...')

    // First, check if the user already exists
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers()

    if (listError) {
      console.error('❌ Error listing users:', listError)
      return
    }

    const chideraExists = existingUsers.users.some(user => user.email === 'chidera@emmdraempire.com')

    if (chideraExists) {
      console.log('✅ Chidera account already exists in production Supabase')

      // Check if email is confirmed
      const existingUser = existingUsers.users.find(user => user.email === 'chidera@emmdraempire.com')
      console.log('📧 Email confirmed:', existingUser?.email_confirmed_at ? 'Yes' : 'No')

      if (!existingUser?.email_confirmed_at) {
        console.log('🔧 Confirming Chidera email...')
        const { error: confirmError } = await supabase.auth.admin.updateUserById(existingUser.id, {
          email_confirm: true
        })

        if (confirmError) {
          console.error('❌ Error confirming email:', confirmError)
        } else {
          console.log('✅ Chidera email confirmed successfully')
        }
      }

      return
    }

    // Create the admin user account
    console.log('👤 Creating new Chidera account...')
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'chidera@emmdraempire.com',
      password: 'chidera2323',
      email_confirm: true,
      user_metadata: {
        full_name: 'Chidera',
        role: 'admin'
      }
    })

    if (error) {
      console.error('❌ Error creating Chidera account:', error)
      return
    }

    console.log('✅ Successfully created Chidera admin account!')
    console.log('📧 Email: chidera@emmdraempire.com')
    console.log('🔑 Password: chidera2323')
    console.log('🆔 User ID:', data.user.id)

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

createChideraAccount()
