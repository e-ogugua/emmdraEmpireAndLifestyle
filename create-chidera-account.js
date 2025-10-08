import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

// Use service key if available, otherwise use anon key
const supabase = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createChideraAccount() {
  try {
    console.log('🔧 Setting up Chidera admin account in Supabase...')

    if (supabaseServiceKey) {
      console.log('✅ Using service role key for admin operations')

      // First, check if the user already exists
      const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers()

      if (listError) {
        console.error('❌ Error listing users:', listError)
        return
      }

      const chideraExists = existingUsers.users.some(user => user.email === 'chidera@emmdraempire.com')

      if (chideraExists) {
        console.log('✅ Chidera account already exists in Supabase')
        return
      }

      // Create the admin user account
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

    } else {
      console.log('⚠️ No service role key found - cannot create admin accounts programmatically')
      console.log('\n💡 Manual Setup Required:')
      console.log('1. Go to your Supabase Dashboard:')
      console.log('   https://supabase.com/dashboard')
      console.log('2. Select your project')
      console.log('3. Go to: Authentication > Users')
      console.log('4. Click "Add User"')
      console.log('5. Enter these details:')
      console.log('   • Email: chidera@emmdraempire.com')
      console.log('   • Password: chidera2323')
      console.log('   • Confirm email: Yes')
      console.log('6. Click "Create User"')
      console.log('\n✅ After creating the account, Chidera should be able to log in!')
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

createChideraAccount()
