'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { trackPageView } from '@/lib/analytics'

interface DIYTutorial {
  id: number
  title: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimated_time: string
  materials: string[]
  steps: {
    title: string
    description: string
    image_url?: string
  }[]
  cover_image: string
  description: string
  tags: string[]
  published: boolean
  featured: boolean
  created_at: string
  updated_at: string
}

interface DIYTutorialPageProps {
  params: Promise<{ slug: string }>
}

export default function DIYTutorialPage({ params }: DIYTutorialPageProps) {
  const { slug } = use(params)
  const [tutorial, setTutorial] = useState<DIYTutorial | null>(null)
  const [relatedTutorials, setRelatedTutorials] = useState<DIYTutorial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTutorialData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Generate slug from title to find the tutorial
        const generateSlug = (title: string) => {
          return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
        }

        // First get all tutorials to find the one with matching slug
        const { data: allTutorials, error: allTutorialsError } = await supabase
          .from('diy_tutorials')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })

        if (allTutorialsError) {
          console.error('❌ Error fetching tutorials:', allTutorialsError)
          setError('Failed to load DIY tutorial.')
          return
        }

        // Find the tutorial with matching slug
        const matchingTutorial = allTutorials?.find(t => generateSlug(t.title) === slug)

        if (!matchingTutorial) {
          setError('DIY tutorial not found.')
          return
        }

        setTutorial(matchingTutorial)

        // Track DIY tutorial view
        trackPageView({
          page_type: 'diy',
          page_id: matchingTutorial.id.toString(),
          page_title: matchingTutorial.title
        })

        // Fetch related tutorials (same category, excluding current tutorial)
        const { data: relatedData, error: relatedError } = await supabase
          .from('diy_tutorials')
          .select('*')
          .eq('published', true)
          .eq('category', matchingTutorial.category)
          .neq('id', matchingTutorial.id)
          .limit(3)

        if (relatedError) {
          console.error('Error fetching related tutorials:', relatedError)
        } else {
          setRelatedTutorials(relatedData || [])
        }

      } catch (err) {
        console.error('Error fetching DIY tutorial:', err)
        setError('Failed to load DIY tutorial.')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchTutorialData()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading DIY tutorial...</p>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">DIY Tutorial Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">{error}</p>
          <Link
            href="/diy"
            className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
          >
            Back to DIY Tutorials
          </Link>
        </div>
      </div>
    )
  }

  if (!tutorial) {
    return null
  }

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Back to DIY Link */}
        <div className="mb-8">
          <Link
            href="/diy"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to DIY Tutorials
          </Link>
        </div>

        {/* Tutorial Header */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          {/* Featured Image */}
          <div className="relative w-full h-64 md:h-96 overflow-hidden">
            <img
              src={tutorial.cover_image}
              alt={tutorial.title}
              className="w-full h-full object-cover"
            />

            {/* Category & Difficulty Badges */}
            <div className="absolute top-6 left-6 flex gap-2">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                tutorial.category === 'Accessories' ? 'bg-blue-100 text-blue-800' :
                tutorial.category === 'Beauty' ? 'bg-purple-100 text-purple-800' :
                tutorial.category === 'Home Decor' ? 'bg-green-100 text-green-800' :
                'bg-pink-100 text-pink-800'
              }`}>
                {tutorial.category}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {tutorial.difficulty}
              </span>
            </div>
          </div>

          {/* Tutorial Content */}
          <div className="p-8 lg:p-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              {tutorial.title}
            </h1>

            <div className="flex items-center gap-4 mb-8 text-gray-600">
              <span className="text-sm">
                {new Date(tutorial.created_at).toLocaleDateString()}
              </span>
              <span className="text-sm">•</span>
              <span className="text-sm">{tutorial.category}</span>
              <span className="text-sm">•</span>
              <span className="text-sm">{tutorial.difficulty}</span>
            </div>

            {/* Tutorial Meta */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 mb-1">⏱️</div>
                  <p className="text-sm text-gray-600">Estimated Time</p>
                  <p className="font-semibold text-gray-800">{tutorial.estimated_time}</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 mb-1">📝</div>
                  <p className="text-sm text-gray-600">Steps</p>
                  <p className="font-semibold text-gray-800">{tutorial.steps?.length || 0} steps</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 mb-1">🛠️</div>
                  <p className="text-sm text-gray-600">Materials</p>
                  <p className="font-semibold text-gray-800">{tutorial.materials?.length || 0} items</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Project</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {tutorial.description}
              </p>
            </div>

            {/* Materials Needed */}
            {tutorial.materials && tutorial.materials.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Materials Needed</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tutorial.materials.map((material, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{material}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step by Step Instructions */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">Step-by-Step Instructions</h2>

              <div className="space-y-8">
                {tutorial.steps?.map((step, index) => (
                  <div key={`step-${index}`} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                        <p className="text-lg text-gray-800 leading-relaxed mb-4">
                          {step.description}
                        </p>
                        {step.image_url && (
                          <div className="mt-4">
                            <img
                              src={step.image_url}
                              alt={`Step ${index + 1}`}
                              className="w-full max-w-md rounded-lg shadow-md"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-yellow-50 rounded-xl p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Pro Tips</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Take your time with each step and read the instructions carefully.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Prepare all your materials before you start for a smoother experience.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>Don&apos;t worry if it doesn&apos;t turn out perfect - creativity is about the process!</span>
                </li>
              </ul>
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Share this tutorial</h3>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  Twitter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Tutorials Section */}
        {relatedTutorials.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-8">
              More {tutorial.category} Tutorials
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedTutorials.map((relatedTutorial) => (
                <article
                  key={relatedTutorial.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="relative">
                    <img
                      src={relatedTutorial.cover_image}
                      alt={relatedTutorial.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        relatedTutorial.category === 'Accessories' ? 'bg-blue-100 text-blue-800' :
                        relatedTutorial.category === 'Beauty' ? 'bg-purple-100 text-purple-800' :
                        relatedTutorial.category === 'Home Decor' ? 'bg-green-100 text-green-800' :
                        'bg-pink-100 text-pink-800'
                      }`}>
                        {relatedTutorial.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        relatedTutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        relatedTutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {relatedTutorial.difficulty}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                      {relatedTutorial.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {relatedTutorial.description}
                    </p>
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                      <span>⏱️ {relatedTutorial.estimated_time}</span>
                      <span>📝 {relatedTutorial.steps?.length || 0} steps</span>
                    </div>
                    <Link
                      href={`/diy/${relatedTutorial.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Start Tutorial →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Sign-up */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Love DIY Projects?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Get more creative tutorials, styling tips, and craft ideas delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
              Subscribe
            </button>
          </div>

          <p className="text-sm opacity-75 mt-4">
            Join 500+ creative families learning together!
          </p>
        </div>
      </div>
    </div>
  )
}
