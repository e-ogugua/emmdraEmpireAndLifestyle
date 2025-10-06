import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hsbwnsmfrfydxwxqaxiu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzYnduc21mcmZ5ZHh3eHFheGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MTI1NDcsImV4cCI6MjA3NDk4ODU0N30.3a2ou85qrJ_f5Dj7xlthAy7NxQqO4Yn_jWymPVB2N4U'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface DatabaseEntry {
  [key: string]: unknown
}

interface AuditResult {
  table: string
  totalEntries: number
  data: DatabaseEntry[]
  missingFields: Record<string, number>
  emptyCategories: string[]
  duplicates: DatabaseEntry[]
  summary: {
    totalEntries: number
    fieldsWithMissingData: Record<string, number>
    emptyCategoriesCount: number
    duplicateEntriesCount: number
    recommendations: string[]
  }
}

async function auditTable(
  tableName: string,
  fields: string[]
): Promise<AuditResult> {
  try {
    console.log(`\n🔍 Auditing ${tableName} table...`)

    // Query the table with specified fields
    const { data, error } = await supabase
      .from(tableName)
      .select(fields.join(','))

    if (error) {
      console.error(`❌ Error querying ${tableName}:`, error.message)
      return {
        table: tableName,
        totalEntries: 0,
        data: [],
        missingFields: {},
        emptyCategories: [],
        duplicates: [],
        summary: {
          totalEntries: 0,
          fieldsWithMissingData: {},
          emptyCategoriesCount: 0,
          duplicateEntriesCount: 0,
          recommendations: [`Error accessing ${tableName} table: ${error.message}`]
        }
      }
    }

    const entries = (Array.isArray(data) ? data as unknown as DatabaseEntry[] : []) || []
    const totalEntries = entries.length

    console.log(`✅ Found ${totalEntries} entries in ${tableName}`)

    // Analyze missing fields
    const missingFields: Record<string, number> = {}
    fields.forEach(field => {
      const missingCount = entries.filter((entry: DatabaseEntry) => {
        const value = entry[field]
        return !value || value === null || value === undefined || value === ''
      }).length
      if (missingCount > 0) {
        missingFields[field] = missingCount
      }
    })

    // Analyze categories (for tables that have category fields)
    const categoryFields = ['category', 'categories']
    const emptyCategories: string[] = []

    categoryFields.forEach(catField => {
      if (fields.includes(catField)) {
        const categories = entries
          .map((entry: DatabaseEntry) => entry[catField])
          .filter((cat: unknown) => cat && cat !== null && cat !== undefined && cat !== '')

        if (categories.length === 0) {
          emptyCategories.push(catField)
        }
      }
    })

    // Check for duplicates (basic check based on name/title field)
    const nameField = fields.includes('name') ? 'name' : fields.includes('title') ? 'title' : null
    const duplicates: DatabaseEntry[] = []

    if (nameField) {
      const seen = new Set()
      entries.forEach((entry: DatabaseEntry) => {
        const value = entry[nameField] as string
        if (value && seen.has(value)) {
          duplicates.push(entry)
        } else if (value) {
          seen.add(value)
        }
      })
    }

    // Generate recommendations
    const recommendations: string[] = []

    if (totalEntries === 0) {
      recommendations.push(`⚠️  ${tableName} table is empty - needs content`)
    }

    Object.entries(missingFields).forEach(([field, count]) => {
      const percentage = ((count / totalEntries) * 100).toFixed(1)
      recommendations.push(`⚠️  ${count}/${totalEntries} (${percentage}%) entries missing ${field}`)
    })

    if (emptyCategories.length > 0) {
      recommendations.push(`⚠️  Categories are empty or missing: ${emptyCategories.join(', ')}`)
    }

    if (duplicates.length > 0) {
      recommendations.push(`⚠️  Found ${duplicates.length} potential duplicate entries`)
    }

    if (totalEntries > 0 && Object.keys(missingFields).length === 0 && emptyCategories.length === 0) {
      recommendations.push(`✅ ${tableName} data looks complete and well-structured`)
    }

    return {
      table: tableName,
      totalEntries,
      data: entries,
      missingFields,
      emptyCategories,
      duplicates,
      summary: {
        totalEntries,
        fieldsWithMissingData: missingFields,
        emptyCategoriesCount: emptyCategories.length,
        duplicateEntriesCount: duplicates.length,
        recommendations
      }
    }

  } catch (error) {
    console.error(`❌ Unexpected error auditing ${tableName}:`, error)
    return {
      table: tableName,
      totalEntries: 0,
      data: [],
      missingFields: {},
      emptyCategories: [],
      duplicates: [],
      summary: {
        totalEntries: 0,
        fieldsWithMissingData: {},
        emptyCategoriesCount: 0,
        duplicateEntriesCount: 0,
        recommendations: [`Error auditing ${tableName}: ${error}`]
      }
    }
  }
}

export async function auditDatabase(): Promise<Record<string, AuditResult>> {
  console.log('🚀 Starting Emmdra Empire Database Audit...\n')

  const auditResults: Record<string, AuditResult> = {}

  // Define tables and their key fields
  const tables = [
    {
      name: 'products',
      fields: ['id', 'name', 'price', 'short_description', 'description', 'category', 'image_url']
    },
    {
      name: 'blogs',
      fields: ['id', 'title', 'category', 'featured_image', 'body', 'tags']
    },
    {
      name: 'diy_tutorials',
      fields: ['id', 'title', 'steps', 'difficulty', 'category', 'images']
    },
    {
      name: 'workshops',
      fields: ['id', 'title', 'schedule', 'description', 'price', 'images']
    },
    {
      name: 'bookings',
      fields: ['id', 'name', 'email', 'phone', 'message', 'status']
    }
  ]

  // Audit each table
  for (const table of tables) {
    auditResults[table.name] = await auditTable(table.name, table.fields)
  }

  return auditResults
}

// Run the audit if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  auditDatabase()
    .then(() => {
      console.log('\n✅ Database audit completed successfully!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n❌ Database audit failed:', error)
      process.exit(1)
    })
}
