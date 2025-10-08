import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables
config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('🔧 Fixing Premium Leather Handbag image URL...')

supabase
  .from('products')
  .update({ image_url: '/images/PremiumLeatherHandbags.png' })
  .eq('name', 'Premium Leather Handbag')
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ Error updating product:', error)
    } else {
      console.log('✅ Successfully updated Premium Leather Handbag image URL')
      console.log('📦 Updated product:', data)
    }
    process.exit(error ? 1 : 0)
  })
  .catch(error => {
    console.error('❌ Unexpected error:', error)
    process.exit(1)
  })
