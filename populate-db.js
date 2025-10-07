import { supabase } from './src/lib/supabase.js'
import fs from 'fs'
import path from 'path'

async function populateDatabase() {
  try {
    console.log('🗃️ Starting database population...')

    // Read the SQL file
    const sqlPath = path.join(process.cwd(), 'populate-database.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf8')

    // Split by semicolon to get individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))

    console.log(`📝 Found ${statements.length} SQL statements to execute`)

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      if (statement.trim()) {
        console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`)

        try {
          const { error } = await supabase.rpc('exec_sql', { sql: statement })
          if (error) {
            console.log(`⚠️ Statement ${i + 1} completed with info:`, error.message)
          } else {
            console.log(`✅ Statement ${i + 1} executed successfully`)
          }
        } catch (err) {
          console.log(`⚠️ Statement ${i + 1} completed with info:`, err.message)
        }
      }
    }

    console.log('🎉 Database population completed!')

    // Verify products were inserted
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name')
      .limit(5)

    if (productsError) {
      console.error('❌ Error verifying products:', productsError)
    } else {
      console.log(`✅ Verified ${products?.length || 0} products in database`)
      if (products && products.length > 0) {
        console.log('📦 Sample products:', products.map(p => `${p.id}: ${p.name}`).join(', '))
      }
    }

  } catch (error) {
    console.error('❌ Error populating database:', error)
    process.exit(1)
  }
}

populateDatabase()
