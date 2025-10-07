'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { trackPageView } from '@/lib/analytics'

interface Workshop {
  id: number
  title: string
  slug?: string
  category: string
  description: string
  schedule: {
    date: string
    time: string
    duration: string
    location: string
  } | null
  price: number
  max_participants: number | null
  current_participants: number | null
  instructor: string | null
  cover_image: string
  images: string[] | null
  status: string
  published: boolean
  featured: boolean
  created_at: string
  updated_at: string
}

const categories = [
  { id: 'all', name: 'All Workshops', count: 0 },
  { id: 'Fashion', name: 'Fashion', count: 0 },
  { id: 'Beauty', name: 'Beauty', count: 0 },
  { id: 'Crafts', name: 'Crafts', count: 0 },
  { id: 'Lifestyle', name: 'Lifestyle', count: 0 }
]

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [filteredWorkshops, setFilteredWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    // Track workshops page view
    trackPageView({
      page_type: 'blog',
      page_title: 'Workshops - Emmdra Empire'
    })
  }, [])

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true)
        setError(null)

        const { data, error: supabaseError } = await supabase
          .from('workshops')
          .select('*')
          .eq('status', 'upcoming')
          .order('schedule->date', { ascending: true, nullsFirst: false })
          .order('created_at', { ascending: false })

        if (supabaseError) {
          console.error('❌ Error fetching workshops:', supabaseError)
          setError('Failed to load workshops. Please try again later.')
          return
        }

        console.log('✅ Workshops fetched successfully:', data?.length || 0, 'workshops')
        setWorkshops(data || [])
        setFilteredWorkshops(data || [])
      } catch (err) {
        console.error('❌ Error fetching workshops:', err)
        setError('Failed to load workshops. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchWorkshops()
  }, [])

  // Filter workshops by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredWorkshops(workshops)
    } else {
      setFilteredWorkshops(workshops.filter(workshop => workshop.category === selectedCategory))
    }
  }, [selectedCategory, workshops])

  // Generate slug from title for URL
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  if (loading) {
    return (
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading workshops...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Error Loading Workshops</h1>
          <p className="text-lg text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Hero Section with Beautiful Background */}
      <section className="relative py-20 px-4 min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/workshopsAndTraning.png"
            alt="Emmdra Workshops Background - Creative Learning and Training"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Elegant overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent"></div>
          {/* Brand color accent overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-yellow-900/30 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto relative z-10">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Creative <span className="text-yellow-300">Workshops</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
              Join our hands-on workshops and masterclasses. Learn from experts,
              connect with fellow creatives, and take your skills to the next level.
            </p>
          </div>

        {/* Category Filter Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-black text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Workshop Section */}
        {filteredWorkshops.length > 0 && filteredWorkshops[0]?.featured && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">Featured Workshop</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src={filteredWorkshops[0].cover_image}
                    alt={filteredWorkshops[0].title}
                    fill
                    className="w-full h-64 md:h-full object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      filteredWorkshops[0].category === 'Fashion' ? 'bg-pink-100 text-pink-800' :
                      filteredWorkshops[0].category === 'Beauty' ? 'bg-purple-100 text-purple-800' :
                      filteredWorkshops[0].category === 'Crafts' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {filteredWorkshops[0].category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    {filteredWorkshops[0].title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {filteredWorkshops[0].description}
                  </p>

                  {/* Workshop Meta */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {filteredWorkshops[0].schedule?.date && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {new Date(filteredWorkshops[0].schedule.date).toLocaleDateString()}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      ₦{filteredWorkshops[0].price.toLocaleString()}
                    </div>
                    {filteredWorkshops[0].schedule?.duration && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {filteredWorkshops[0].schedule.duration}
                      </div>
                    )}
                    {filteredWorkshops[0].max_participants && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        {filteredWorkshops[0].max_participants} spots
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/workshops/${generateSlug(filteredWorkshops[0].title)}`}
                    className="inline-flex items-center bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
                  >
                    Register Now
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workshops Grid */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
            {selectedCategory === 'all' ? 'All Workshops' : `${categories.find(c => c.id === selectedCategory)?.name} Workshops`}
          </h2>

          {filteredWorkshops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredWorkshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="relative">
                    <Image
                      src={workshop.cover_image}
                      alt={workshop.title}
                      fill
                      className="w-full h-48 object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        workshop.category === 'Fashion' ? 'bg-pink-100 text-pink-800' :
                        workshop.category === 'Beauty' ? 'bg-purple-100 text-purple-800' :
                        workshop.category === 'Crafts' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {workshop.category}
                      </span>
                    </div>
                    {workshop.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {workshop.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {workshop.description}
                    </p>

                    {/* Workshop Meta */}
                    <div className="space-y-2 mb-4">
                      {workshop.schedule?.date && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {new Date(workshop.schedule.date).toLocaleDateString()}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        ₦{workshop.price.toLocaleString()}
                      </div>
                    </div>

                    {/* Tags - Remove since they don't exist in the database */}
                    {/* 
                    {workshop.tags && workshop.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {workshop.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    */}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {workshop.instructor && `By ${workshop.instructor}`}
                      </span>
                      <Link
                        href={`/workshops/${generateSlug(workshop.title)}`}
                        className="bg-black text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-gray-800 transition-colors duration-200"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold text-gray-800 mb-4">No Workshops Found</h3>
              <p className="text-gray-600 mb-6">Check back later for new workshops in this category.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
              >
                View All Workshops
              </button>
            </div>
          )}
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Learn & Create?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join our creative community and learn from industry experts.
            Limited spots available for each workshop!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/workshops"
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🎨 View All Workshops
            </Link>
            <Link
              href="/contact"
              className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
            >
              📞 Request Custom Workshop
            </Link>
          </div>

          <p className="text-sm opacity-75 mt-6">
            Join 200+ creative minds learning together!
          </p>
        </div>
      </div>
    </section>
    </div>
  )
}
