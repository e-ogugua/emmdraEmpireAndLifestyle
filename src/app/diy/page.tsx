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
      <section className="relative py-12 sm:py-16 md:py-20 px-4 min-h-[40vh] sm:min-h-[50vh] md:min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/DIYAnkaraToteBag.png"
            alt="Emmdra DIY Background - Creative Crafts and Projects"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Enhanced overlay for better card readability - More prominent */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/20"></div>
          {/* Brand color accent overlay - More visible */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-teal-900/15 to-blue-900/10 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto relative z-10">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
              DIY <span className="text-green-300">Tutorials</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-md px-2">
              Unleash your creativity with our step-by-step DIY projects.
              From beginner-friendly crafts to advanced techniques, find your next creative adventure.
            </p>
          </div>

        {/* Filter Controls */}
        <div className="mb-12">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Category Filter */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 sm:px-5 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-200 min-h-[44px] ${
                        selectedCategory === category.id
                          ? 'bg-black text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Difficulty</h3>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty.id}
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                      className={`px-4 py-2 sm:px-5 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-200 min-h-[44px] ${
                        selectedDifficulty === difficulty.id
                          ? 'bg-green-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {difficulty.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                Showing {filteredTutorials.length} of {tutorials.length} DIY tutorials
                {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
                {selectedDifficulty !== 'all' && ` at ${difficulties.find(d => d.id === selectedDifficulty)?.name} level`}
              </p>
            </div>
          </div>
        </div>

        {/* Featured Tutorial Section */}
        {filteredTutorials.length > 0 && filteredTutorials[0]?.featured && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">Featured Tutorial</h2>
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              <div className="md:flex">
                <div className="md:w-1/2">
                  {filteredTutorials[0].cover_image ? (
                    <Image
                      src={filteredTutorials[0].cover_image}
                      alt={filteredTutorials[0].title}
                      width={600}
                      height={400}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-64 md:h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">🎨</div>
                        <p className="text-gray-600 text-lg font-medium">Featured DIY Tutorial</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      filteredTutorials[0].category === 'Accessories' ? 'bg-blue-100 text-blue-800' :
                      filteredTutorials[0].category === 'Beauty' ? 'bg-purple-100 text-purple-800' :
                      filteredTutorials[0].category === 'Home Decor' ? 'bg-green-100 text-green-800' :
                      'bg-pink-100 text-pink-800'
                    }`}>
                      {filteredTutorials[0].category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      filteredTutorials[0].difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                      filteredTutorials[0].difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {filteredTutorials[0].difficulty}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    {filteredTutorials[0].title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {filteredTutorials[0].description}
                  </p>
                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                    <span>⏱️ {filteredTutorials[0].estimated_time}</span>
                    <span>📝 {filteredTutorials[0].steps?.length || 0} steps</span>
                  </div>
                  <Link
                    href={`/diy/${generateSlug(filteredTutorials[0].title)}`}
                    className="inline-flex items-center bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
                  >
                    Start Tutorial
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tutorials Grid */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
            {selectedCategory === 'all' && selectedDifficulty === 'all'
              ? 'All DIY Tutorials'
              : `DIY Tutorials${selectedCategory !== 'all' ? ` - ${categories.find(c => c.id === selectedCategory)?.name}` : ''}${selectedDifficulty !== 'all' ? ` (${difficulties.find(d => d.id === selectedDifficulty)?.name})` : ''}`}
          </h2>

          {filteredTutorials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTutorials.map((tutorial) => (
                <div
                  key={tutorial.id}
                  className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-white/20"
                >
                  <div className="relative">
                    {tutorial.cover_image ? (
                      <Image
                        src={tutorial.cover_image}
                        alt={tutorial.title}
                        width={400}
                        height={192}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-t-xl">
                        <div className="text-center">
                          <div className="text-4xl mb-2">🎨</div>
                          <p className="text-gray-600 text-sm font-medium">DIY Tutorial</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        tutorial.category === 'Accessories' ? 'bg-blue-100 text-blue-800' :
                        tutorial.category === 'Beauty' ? 'bg-purple-100 text-purple-800' :
                        tutorial.category === 'Home Decor' ? 'bg-green-100 text-green-800' :
                        'bg-pink-100 text-pink-800'
                      }`}>
                        {tutorial.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {tutorial.difficulty}
                      </span>
                    </div>
                    {tutorial.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-white">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {tutorial.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {tutorial.description}
                    </p>

                    {/* Tutorial Meta */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <span>⏱️ {tutorial.estimated_time}</span>
                      <span>📝 {tutorial.steps?.length || 0} steps</span>
                    </div>

                    {/* Materials Preview */}
                    {tutorial.materials && tutorial.materials.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Materials needed:</p>
                        <div className="flex flex-wrap gap-1">
                          {tutorial.materials.slice(0, 3).map((material, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                            >
                              {material}
                            </span>
                          ))}
                          {tutorial.materials.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                              +{tutorial.materials.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(tutorial.created_at).toLocaleDateString()}
                      </span>
                      <Link
                        href={`/diy/${generateSlug(tutorial.title)}`}
                        className="bg-black text-white px-4 py-2 sm:px-5 sm:py-3 rounded-full font-medium text-sm sm:text-base hover:bg-gray-800 transition-colors duration-200 min-h-[44px] flex items-center justify-center"
                      >
                        Start Tutorial →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold text-gray-800 mb-4">No Tutorials Found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or check back later for new tutorials.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedDifficulty('all')
                  }}
                  className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
                >
                  View All Tutorials
                </button>
                <Link
                  href="/contact"
                  className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-300"
                >
                  Request a Tutorial
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Get Creative?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Start your next DIY project today! Our step-by-step tutorials make it easy for beginners and challenging for experts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/diy"
              className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🎨 Browse All Tutorials
            </Link>
            <Link
              href="/contact"
              className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-600 transition-all duration-300"
            >
              📞 Request Custom Tutorial
            </Link>
          </div>

          <p className="text-sm opacity-75 mt-6">
            Join 500+ creative families learning together!
          </p>
        </div>
      </div>
    </section>
    </div>
  )
}
