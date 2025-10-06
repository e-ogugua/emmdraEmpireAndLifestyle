import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kjfqspuygiatifebgpkd.supabase.co'
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqZnFzcHV5Z2lhdGlmZWJncGtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTU5MzU1OSwiZXhwIjoyMDc1MTY5NTU5fQ.q5YjKT8RybtcUTAqPVpqb3Ufw4tidXJhSBa4Dq5cBx8'

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

async function debugDatabase() {
  console.log('🔍 DEBUGGING: Checking actual database content...\n')

  try {
    // Check products table
    console.log('📦 PRODUCTS TABLE:')
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(5)

    if (productsError) {
      console.error('❌ Products query error:', productsError.message)
    } else {
      console.log(`✅ Found ${products?.length || 0} products`)
      if (products && products.length > 0) {
        console.log('Sample product:', products[0])
        console.log('Available product IDs:', products.map(p => p.id))
      }
    }

    // Check if product ID 1 exists specifically
    console.log('\n🔍 CHECKING PRODUCT ID 1:')
    const { data: product1, error: product1Error } = await supabase
      .from('products')
      .select('*')
      .eq('id', 1)
      .single()

    if (product1Error) {
      console.error('❌ Product ID 1 not found:', product1Error.message)
    } else {
      console.log('✅ Product ID 1 exists:', product1)
    }

    // Check blogs table
    console.log('\n📝 BLOGS TABLE:')
    const { data: blogs, error: blogsError } = await supabase
      .from('blogs')
      .select('*')
      .limit(3)

    if (blogsError) {
      console.error('❌ Blogs query error:', blogsError.message)
    } else {
      console.log(`✅ Found ${blogs?.length || 0} blog posts`)
    }

    // Check other tables
    console.log('\n🔧 DIY TUTORIALS TABLE:')
    const { data: diy, error: diyError } = await supabase
      .from('diy_tutorials')
      .select('*')
      .limit(2)

    if (diyError) {
      console.error('❌ DIY tutorials query error:', diyError.message)
    } else {
      console.log(`✅ Found ${diy?.length || 0} DIY tutorials`)
    }

    console.log('\n🎓 WORKSHOPS TABLE:')
    const { data: workshops, error: workshopsError } = await supabase
      .from('workshops')
      .select('*')
      .limit(2)

    if (workshopsError) {
      console.error('❌ Workshops query error:', workshopsError.message)
    } else {
      console.log(`✅ Found ${workshops?.length || 0} workshops`)
    }

    console.log('\n📞 BOOKINGS TABLE:')
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('*')
      .limit(2)

    if (bookingsError) {
      console.error('❌ Bookings query error:', bookingsError.message)
    } else {
      console.log(`✅ Found ${bookings?.length || 0} bookings`)
    }

    console.log('\n🎯 DEBUGGING COMPLETE')
    console.log('Check the results above to see what data actually exists in your database.')

  } catch (error) {
    console.error('❌ Database connection error:', error)
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  debugDatabase().catch(console.error)
}

export { debugDatabase }
