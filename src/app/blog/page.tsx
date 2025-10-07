'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { trackPageView } from '@/lib/analytics'

interface BlogPost {
  id: number
  title: string
  slug: string
  category: string
  featured_image: string
  excerpt: string
  body: string
  tags: string[]
  published: boolean
  featured: boolean
  created_at: string
  updated_at: string
}

const categories = [
  { id: 'all', name: 'All Posts', count: 0 },
  { id: 'family-life', name: 'Family Life', count: 0 },
  { id: 'fashion-tips', name: 'Fashion Tips', count: 0 },
  { id: 'diy-projects', name: 'DIY Projects', count: 0 },
  { id: 'beauty-hacks', name: 'Beauty Hacks', count: 0 }
]

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    // Track blog page view
    trackPageView({
      page_type: 'blog',
      page_title: 'Blog - Emmdra Empire'
    })
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setError(null)

        const { data, error: supabaseError } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })

        if (supabaseError) {
          console.error('❌ Error fetching blog posts:', supabaseError)
          setError('Failed to load blog posts. Please try again later.')
          return
        }

        console.log('✅ Blog posts fetched successfully:', data?.length || 0, 'posts')
        setPosts(data || [])
        setFilteredPosts(data || [])
      } catch (err) {
        console.error('❌ Error fetching blog posts:', err)
        setError('Failed to load blog posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Generate slug from title for URL
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Filter posts by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(posts.filter(post => post.category.toLowerCase() === selectedCategory))
    }
  }, [selectedCategory, posts])

  if (loading) {
    return (
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading blog posts...</p>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Error Loading Blog</h1>
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
            src="/images/EmmdraBlog.png"
            alt="Emmdra Blog Background - Stories and Inspiration"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Elegant overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent"></div>
          {/* Brand color accent overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-pink-900/30 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto relative z-10">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
              Our <span className="text-blue-300">Stories</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed drop-shadow-md px-2">
              Discover insights, tips, and inspiration for fashion, beauty, DIY projects, and family life.
              Join our community of creatives and style enthusiasts.
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

        {/* Featured Post Section */}
        {filteredPosts.length > 0 && filteredPosts[0]?.featured && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">Featured Story</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  {filteredPosts[0].featured_image ? (
                    <Image
                      src={filteredPosts[0].featured_image}
                      alt={filteredPosts[0].title}
                      fill
                      className="w-full h-64 md:h-full object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-64 md:h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📖</div>
                        <p className="text-gray-600 text-lg font-medium">Featured Story</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      filteredPosts[0].category === 'Family Life' ? 'bg-green-100 text-green-800' :
                      filteredPosts[0].category === 'Fashion Tips' ? 'bg-pink-100 text-pink-800' :
                      filteredPosts[0].category === 'DIY Projects' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {filteredPosts[0].category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    {filteredPosts[0].title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {filteredPosts[0].excerpt}
                  </p>
                  <Link
                    href={`/blog/${generateSlug(filteredPosts[0].title)}`}
                    className="inline-flex items-center bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
                  >
                    Read Full Story
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
            {selectedCategory === 'all' ? 'Latest Stories' : `${categories.find(c => c.id === selectedCategory)?.name} Stories`}
          </h2>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="relative">
                    {post.featured_image ? (
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="w-full h-48 object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">📝</div>
                          <p className="text-gray-600 text-sm font-medium">Blog Post</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        post.category === 'Family Life' ? 'bg-green-100 text-green-800' :
                        post.category === 'Fashion Tips' ? 'bg-pink-100 text-pink-800' :
                        post.category === 'DIY Projects' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold text-gray-800 mb-4">No Stories Found</h3>
              <p className="text-gray-600 mb-6">Check back later for new stories in this category.</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
              >
                View All Stories
              </button>
            </div>
          )}
        </div>

        {/* Newsletter Sign-up Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated with Our Stories
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Get the latest fashion tips, DIY tutorials, beauty hacks, and family stories delivered to your inbox.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
              Subscribe
            </button>
          </div>

          <p className="text-sm opacity-75 mt-4">
            Join 1,000+ subscribers. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
    </div>
  )
}
