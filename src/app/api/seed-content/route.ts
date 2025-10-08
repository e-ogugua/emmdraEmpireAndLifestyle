import { NextRequest, NextResponse } from 'next/server'
import { seedDIYTutorials } from '@/../lib/seed-diy'
import { seedBlogPosts } from '@/../lib/seed-blogs'

export async function GET(request: NextRequest) {
  try {
    // Check if this is a development environment or if seeding is explicitly requested
    const { searchParams } = new URL(request.url)
    const seedType = searchParams.get('type')

    // Only allow seeding in development or with explicit request
    if (process.env.NODE_ENV !== 'development' && !seedType) {
      return NextResponse.json(
        { error: 'Seeding only allowed in development environment' },
        { status: 403 }
      )
    }

    const results = []

    if (seedType === 'diy' || !seedType) {
      const diyResult = await seedDIYTutorials()
      results.push({ type: 'diy', ...diyResult })
    }

    if (seedType === 'blogs' || !seedType) {
      const blogResult = await seedBlogPosts()
      results.push({ type: 'blogs', ...blogResult })
    }

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${results.length} content types`,
      results
    })

  } catch (error) {
    console.error('❌ Error seeding content:', error)
    return NextResponse.json(
      { error: 'Failed to seed content', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
