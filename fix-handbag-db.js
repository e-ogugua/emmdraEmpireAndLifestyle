import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables')
  console.log('Available env vars:', {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set'
  })
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function fixPremiumHandbagImage() {
  try {
    console.log('🔧 Fixing Premium Leather Handbag image URL in database...')
    console.log('Using Supabase URL:', supabaseUrl)

    // First, check current state
    const { data: currentProduct, error: fetchError } = await supabase
      .from('products')
      .select('id, name, image_url')
      .eq('name', 'Premium Leather Handbag')
      .single()

    if (fetchError) {
      console.error('❌ Error fetching current product:', fetchError)
      return
    }

    console.log('📦 Current product:', currentProduct)

    if (currentProduct.image_url === '/images/PremiumLeatherHandbags.png') {
      console.log('✅ Image URL is already correct')
      return
    }

    // Update the image URL
    const { data: updatedProduct, error: updateError } = await supabase
      .from('products')
      .update({ image_url: '/images/PremiumLeatherHandbags.png' })
      .eq('name', 'Premium Leather Handbag')
      .select('id, name, image_url')
      .single()

    if (updateError) {
      console.error('❌ Error updating product:', updateError)
      return
    }

    console.log('✅ Successfully updated Premium Leather Handbag image URL')
    console.log('📦 Updated product:', updatedProduct)

    // Verify the change
    const { data: verifyProduct, error: verifyError } = await supabase
      .from('products')
      .select('id, name, image_url')
      .eq('name', 'Premium Leather Handbag')
      .single()

    if (verifyError) {
      console.error('❌ Error verifying update:', verifyError)
      return
    }

    console.log('✅ Verification - Updated product:', verifyProduct)

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

fixPremiumHandbagImage()
