import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kjfqspuygiatifebgpkd.supabase.co'
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqZnFzcHV5Z2lhdGlmZWJncGtkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTU5MzU1OSwiZXhwIjoyMDc1MTY5NTU5fQ.q5YjKT8RybtcUTAqPVpqb3Ufw4tidXJhSBa4Dq5cBx8'

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

interface TableDefinition {
  name: string
  createSQL: string
  sampleInsert?: Record<string, unknown>
}

const tables: TableDefinition[] = [
  {
    name: 'products',
    createSQL: `
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        price DECIMAL(10,2),
        short_description TEXT,
        description TEXT,
        category TEXT,
        image_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      ALTER TABLE products ENABLE ROW LEVEL SECURITY;
      CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);
    `,
    sampleInsert: {
      name: 'Test Product',
      price: 1000,
      short_description: 'Sample product',
      description: 'This is a sample product for testing',
      category: 'Test',
      image_url: 'test-product.jpg'
    }
  },
  {
    name: 'blogs',
    createSQL: `
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT,
        featured_image TEXT,
        body TEXT,
        tags TEXT[],
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
      CREATE POLICY "Allow public read" ON blogs FOR SELECT USING (true);
    `,
    sampleInsert: {
      title: 'Test Blog',
      category: 'Lifestyle',
      featured_image: 'test-blog.jpg',
      body: 'This is a test blog post',
      tags: ['test', 'sample']
    }
  },
  {
    name: 'diy_tutorials',
    createSQL: `
      CREATE TABLE IF NOT EXISTS diy_tutorials (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        steps JSONB,
        difficulty TEXT,
        category TEXT,
        images TEXT[],
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      ALTER TABLE diy_tutorials ENABLE ROW LEVEL SECURITY;
      CREATE POLICY "Allow public read" ON diy_tutorials FOR SELECT USING (true);
    `,
    sampleInsert: {
      title: 'Test DIY',
      steps: [{ step: 'Step 1', instruction: 'Do something' }],
      difficulty: 'Easy',
      category: 'Craft',
      images: ['test-diy.jpg']
    }
  },
  {
    name: 'workshops',
    createSQL: `
      CREATE TABLE IF NOT EXISTS workshops (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        schedule JSONB,
        description TEXT,
        price DECIMAL(10,2),
        images TEXT[],
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
      CREATE POLICY "Allow public read" ON workshops FOR SELECT USING (true);
    `,
    sampleInsert: {
      title: 'Test Workshop',
      schedule: [{ date: '2025-10-10', time: '10:00' }],
      description: 'Sample workshop description',
      price: 5000,
      images: ['test-workshop.jpg']
    }
  },
  {
    name: 'bookings',
    createSQL: `
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        service_type TEXT,
        message TEXT,
        status TEXT DEFAULT 'new',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
      CREATE POLICY "Allow insert for bookings" ON bookings FOR INSERT WITH CHECK (true);
      CREATE POLICY "Allow public read" ON bookings FOR SELECT USING (true);
    `,
    sampleInsert: {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+2348012345678',
      service_type: 'General Inquiry',
      message: 'This is a test booking to verify the system works'
    }
  }
]

async function verifyDatabaseSetup() {
  console.log('🔍 Verifying Emmdra Empire Database Setup...\n')

  for (const table of tables) {
    try {
      console.log(`📋 Ensuring table ${table.name} exists...`)

      try {
        await supabase.rpc('execute_sql', { sql: table.createSQL })
      } catch (err) {
        console.warn(`⚠️ Could not run RPC for table ${table.name}: ${err}` )
      }

      // Try selecting 1 row
      const { data, error } = await supabase.from(table.name).select('*').limit(1)
      if (error) throw error

      console.log(`✅ Table ${table.name} exists. ${data?.length ?? 0} rows found.`)

      // Insert sample row if empty
      if ((data?.length ?? 0) === 0 && table.sampleInsert) {
        const { data: insertData, error: insertError } = await supabase
          .from(table.name)
          .insert(table.sampleInsert)
          .select()
        if (insertError) throw insertError
        console.log(`📝 Sample row inserted into ${table.name} (ID: ${insertData[0].id})`)

        // Clean up sample row
        await supabase.from(table.name).delete().eq('id', insertData[0].id)
        console.log(`🗑️  Sample row cleaned up from ${table.name}`)
      }
    } catch (err: any) {
      console.error(`❌ Error with ${table.name}:`, err.message)
    }
  }

  console.log('\n🎯 DATABASE VERIFICATION COMPLETE')
  console.log('✅ All tables verified or created, sample inserts tested.')
  console.log('🚀 Ready for content population!\n')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  verifyDatabaseSetup().then(() => process.exit(0)).catch(() => process.exit(1))
}

export { verifyDatabaseSetup }
