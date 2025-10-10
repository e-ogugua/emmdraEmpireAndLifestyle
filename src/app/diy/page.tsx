'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { trackPageView } from '@/lib/analytics'

interface DIYTutorial {
  id: number
  title: string
  slug?: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimated_time: string
  materials?: string[]
  steps?: {
    title: string
    description: string
    image_url?: string
  }[]
  cover_image: string
  images?: string[]
  description?: string
  tags?: string[]
  published: boolean
  featured: boolean
  created_at: string
  updated_at: string
}

const categories = [
  { id: 'all', name: 'All Tutorials', count: 0 },
  { id: 'Accessories', name: 'Accessories', count: 0 },
  { id: 'Beauty', name: 'Beauty', count: 0 },
  { id: 'Home Decor', name: 'Home Decor', count: 0 },
  { id: 'Fashion', name: 'Fashion', count: 0 }
]

const difficulties = [
  { id: 'all', name: 'All Levels' },
  { id: 'Beginner', name: 'Beginner' },
  { id: 'Intermediate', name: 'Intermediate' },
  { id: 'Advanced', name: 'Advanced' }
]

export default function DIYPage() {
  const [tutorials, setTutorials] = useState<DIYTutorial[]>([])
  const [filteredTutorials, setFilteredTutorials] = useState<DIYTutorial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')

  useEffect(() => {
    // Track DIY page view
    trackPageView({
      page_type: 'diy',
      page_title: 'DIY Tutorials - Emmdra Empire'
    })
  }, [])

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        setLoading(true)
        setError(null)

        const { data, error: supabaseError } = await supabase
          .from('diy_tutorials')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })

        if (supabaseError) {
          console.error('❌ Error fetching DIY tutorials:', supabaseError)
          setError('Failed to load DIY tutorials. Please try again later.')
          return
        }

        console.log('✅ DIY tutorials fetched successfully:', data?.length || 0, 'tutorials')
        setTutorials(data || [])
        setFilteredTutorials(data || [])
      } catch (err) {
        console.error('❌ Error fetching DIY tutorials:', err)
        setError('Failed to load DIY tutorials. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchTutorials()
  }, [])

  // Filter tutorials by category and difficulty
  useEffect(() => {
    let filtered = tutorials

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tutorial => tutorial.category === selectedCategory)
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(tutorial => tutorial.difficulty === selectedDifficulty)
    }

    setFilteredTutorials(filtered)
  }, [selectedCategory, selectedDifficulty, tutorials])

  // Generate slug from title for URL
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  if (loading) {
    return (
      <div className="py-8 sm:py-10 md:py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading DIY tutorials...</p>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Error Loading DIY Tutorials</h1>
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
      <section className="relative py-12 sm:py-16 md:py-20 px-4 min-h-[50vh] sm:min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          {/* Clean overlay for perfect text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
          {/* Subtle brand accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/15 via-transparent to-teal-900/10"></div>
        </div>

        <div className="container mx-auto relative z-10">
          {/* Page Header */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-4 sm:mb-6">
              <span className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold shadow-lg">
                📖 Creative DIY Projects
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 text-white leading-tight">
              <span className="bg-gradient-to-r from-brand-burnt-orange via-red-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                DIY Tutorials
              </span>
            </h1>

            <div className="space-y-4 sm:space-y-6">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed drop-shadow-lg">
                Unleash your creativity with step-by-step DIY projects
              </p>

              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-100 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
                From beginner crafts to advanced techniques — find your next creative adventure
              </p>
            </div>
          </div>

        {/* Filter Controls */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Category Filter */}
              <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">Filter by Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-3 sm:px-4 py-2 sm:px-5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm sm:text-base transition-all duration-200 min-h-[40px] sm:min-h-[44px] ${
                        selectedCategory === category.id
                          ? 'bg-black text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">Filter by Difficulty</h3>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty.id}
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                      className={`px-3 sm:px-4 py-2 sm:px-5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm sm:text-base transition-all duration-200 min-h-[40px] sm:min-h-[44px] ${
                        selectedDifficulty === difficulty.id
                          ? 'bg-green-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300 border border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {difficulty.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-300 text-center">
              <p className="text-gray-700 font-semibold text-sm sm:text-base leading-relaxed">
                Showing <span className="font-bold text-brand-burnt-orange">{filteredTutorials.length}</span> of <span className="font-bold text-brand-dark-teal">{tutorials.length}</span> DIY tutorials
                {selectedCategory !== 'all' && (
                  <span className="block sm:inline mt-1 sm:mt-0 sm:ml-2">
                    in <span className="font-bold text-purple-600">{categories.find(c => c.id === selectedCategory)?.name}</span>
                  </span>
                )}
                {selectedDifficulty !== 'all' && (
                  <span className="block sm:inline mt-1 sm:mt-0 sm:ml-2">
                    at <span className="font-bold text-green-600">{difficulties.find(d => d.id === selectedDifficulty)?.name}</span> level
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Featured Tutorial Section */}
        {filteredTutorials.length > 0 && filteredTutorials[0]?.featured && (
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 text-center mb-4 sm:mb-6 drop-shadow-sm">Featured Tutorial</h2>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden border border-white/20">
              <div className="md:flex">
                <div className="md:w-1/2">
                  {filteredTutorials[0].cover_image ? (
                    <Image
                      src={filteredTutorials[0].cover_image}
                      alt={filteredTutorials[0].title}
                      width={600}
                      height={300}
                      className="w-full h-48 sm:h-56 md:h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 sm:h-56 md:h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl sm:text-5xl mb-2 sm:mb-4">🎨</div>
                        <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium">Featured DIY Tutorial</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                      filteredTutorials[0].category === 'Accessories' ? 'bg-blue-100 text-blue-800' :
                      filteredTutorials[0].category === 'Beauty' ? 'bg-purple-100 text-purple-800' :
                      filteredTutorials[0].category === 'Home Decor' ? 'bg-green-100 text-green-800' :
                      'bg-pink-100 text-pink-800'
                    }`}>
                      {filteredTutorials[0].category}
                    </span>
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                      filteredTutorials[0].difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      filteredTutorials[0].difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {filteredTutorials[0].difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 leading-tight">
                    {filteredTutorials[0].title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                    {filteredTutorials[0].description}
                  </p>
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1">
                      <span>⏱️</span>
                      <span>{filteredTutorials[0].estimated_time}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span>📝</span>
                      <span>{filteredTutorials[0].steps?.length || 0} steps</span>
                    </span>
                  </div>
                  <Link
                    href={`/diy/${generateSlug(filteredTutorials[0].title)}`}
                    className="inline-flex items-center justify-center bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300 min-h-[44px] gap-2"
                  >
                    <span>Start Tutorial</span>
                    <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tutorials Grid */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 text-center mb-4 sm:mb-6 md:mb-8 drop-shadow-sm leading-tight">
            {selectedCategory === 'all' && selectedDifficulty === 'all'
              ? 'All DIY Tutorials'
              : `DIY Tutorials${selectedCategory !== 'all' ? ` - ${categories.find(c => c.id === selectedCategory)?.name}` : ''}${selectedDifficulty !== 'all' ? ` (${difficulties.find(d => d.id === selectedDifficulty)?.name})` : ''}`}
          </h2>

          {filteredTutorials.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {filteredTutorials.map((tutorial) => (
                <div
                  key={tutorial.id}
                  className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg sm:shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl sm:hover:shadow-2xl border border-white/20"
                >
                  <div className="relative">
                    {tutorial.cover_image ? (
                      <Image
                        src={tutorial.cover_image}
                        alt={tutorial.title}
                        width={400}
                        height={160}
                        className="w-full h-32 sm:h-40 md:h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-32 sm:h-40 md:h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-t-xl">
                        <div className="text-center">
                          <div className="text-3xl sm:text-4xl mb-2">🎨</div>
                          <p className="text-gray-600 text-xs sm:text-sm font-medium">DIY Tutorial</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1 sm:gap-2">
                      <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold ${
                        tutorial.category === 'Accessories' ? 'bg-blue-100 text-blue-800' :
                        tutorial.category === 'Beauty' ? 'bg-purple-100 text-purple-800' :
                        tutorial.category === 'Home Decor' ? 'bg-green-100 text-green-800' :
                        'bg-pink-100 text-pink-800'
                      }`}>
                        {tutorial.category}
                      </span>
                      <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold ${
                        tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {tutorial.difficulty}
                      </span>
                    </div>
                    {tutorial.featured && (
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-5 md:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
                      {tutorial.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-3 sm:mb-4 line-clamp-2 font-medium">
                      {tutorial.description}
                    </p>

                    {/* Tutorial Meta */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600 font-medium">
                      <span>⏱️ {tutorial.estimated_time}</span>
                      <span>📝 {tutorial.steps?.length || 0} steps</span>
                    </div>

                    {/* Materials Preview */}
                    {tutorial.materials && tutorial.materials.length > 0 && (
                      <div className="mb-3 sm:mb-4">
                        <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Materials needed:</p>
                        <div className="flex flex-wrap gap-1">
                          {tutorial.materials.slice(0, 2).map((material, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                            >
                              {material}
                            </span>
                          ))}
                          {tutorial.materials.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                              +{tutorial.materials.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(tutorial.created_at).toLocaleDateString()}
                      </span>
                      <Link
                        href={`/diy/${generateSlug(tutorial.title)}`}
                        className="bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium text-xs sm:text-sm hover:bg-gray-800 transition-colors duration-200 min-h-[36px] sm:min-h-[40px] flex items-center justify-center"
                      >
                        Start Tutorial →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-4">No Tutorials Found</h3>
              <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6 font-medium">Try adjusting your filters or check back later for new tutorials.</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedDifficulty('all')
                  }}
                  className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300 min-h-[40px] flex items-center justify-center"
                >
                  View All Tutorials
                </button>
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-brand-burnt-orange to-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold hover:from-red-500 hover:to-brand-burnt-orange transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-brand-burnt-orange/50 min-h-[40px] flex items-center justify-center"
                >
                  Request a Tutorial
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-6 sm:p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Ready to Get Creative?
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-95 max-w-2xl mx-auto font-medium">
            Start your next DIY project today! Our step-by-step tutorials make it easy for beginners and challenging for experts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link
              href="/diy"
              className="group relative bg-gradient-to-r from-brand-burnt-orange via-red-500 to-pink-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 border-2 border-brand-burnt-orange/70 hover:border-orange-400 min-h-[56px] flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10">🎨 Browse All Tutorials</span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="group relative bg-gradient-to-r from-brand-vibrant-green via-teal-500 to-cyan-500 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 border-2 border-brand-vibrant-green/70 hover:border-green-400 min-h-[56px] flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <svg className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="relative z-10">📞 Request Custom Tutorial</span>
            </Link>
          </div>

          <p className="text-base sm:text-lg opacity-90 mt-4 sm:mt-6 font-medium">
            Join 500+ creative families learning together!
          </p>
        </div>
      </div>
    </section>
    </div>
  )
}
