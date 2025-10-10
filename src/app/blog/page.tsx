'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import NewsletterSignup from '@/components/NewsletterSignup'

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
  { id: 'all', name: 'All Posts' },
  { id: 'family-life', name: 'Family Life' },
  { id: 'fashion-tips', name: 'Fashion Tips' },
  { id: 'diy-projects', name: 'DIY Projects' },
  { id: 'beauty-hacks', name: 'Beauty Hacks' }
]

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching posts:', error)
          return
        }

        setPosts(data || [])
        setFilteredPosts(data || [])
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredPosts(posts)
    } else {
      // Map category IDs to actual category names in the database
      const categoryMap: { [key: string]: string } = {
        'family-life': 'Family Life',
        'fashion-tips': 'Fashion Tips',
        'diy-projects': 'DIY Projects',
        'beauty-hacks': 'Beauty Hacks'
      }

      const targetCategory = categoryMap[selectedCategory]
      setFilteredPosts(posts.filter(post => post.category === targetCategory))
    }
  }, [selectedCategory, posts])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with PROMINENT EmmdraBlog Image */}
      <section className="relative py-20 sm:py-24 px-4 min-h-[65vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/EmmdraBlog.png"
            alt="Emmdra Empire Blog Background"
            fill
            className="object-cover object-center scale-105 blur-[1px]"
            priority
          />
          {/* Enhanced overlay for maximum text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/55"></div>
          {/* Additional blur overlay for extra text clarity */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/8 via-transparent to-purple-900/8 backdrop-blur-[1px]"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-4">
              <span className="inline-block bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border-2 border-white/50 shadow-lg [text-shadow:_0_2px_4px_rgb(0_0_0_/_80%)]">
                📖 Stories & Inspiration
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
              Discover <span className="text-yellow-300 font-black [text-shadow:_0_5px_10px_rgb(0_0_0_/_100%),_0_10px_20px_rgb(0_0_0_/_90%),_0_15px_30px_rgb(0_0_0_/_80%)]">Amazing Stories</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/95 mb-10 leading-relaxed drop-shadow-xl max-w-3xl mx-auto [text-shadow:_0_4px_8px_rgb(0_0_0_/_100%),_0_8px_16px_rgb(0_0_0_/_90%)]">
              Your source for fashion, beauty, DIY inspiration, and family lifestyle tips.
            </p>

            <div className="flex flex-wrap justify-center gap-3 text-base">
              <span className="flex items-center gap-2 bg-white/25 backdrop-blur-md text-white px-4 py-2 rounded-full border-2 border-white/60 hover:bg-white/35 transition-all duration-300 shadow-lg [text-shadow:_0_2px_4px_rgb(0_0_0_/_80%)]">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-lg"></span>
                <span className="font-medium">Fashion & Style</span>
              </span>
              <span className="flex items-center gap-2 bg-white/25 backdrop-blur-md text-white px-4 py-2 rounded-full border-2 border-white/60 hover:bg-white/35 transition-all duration-300 shadow-lg [text-shadow:_0_2px_4px_rgb(0_0_0_/_80%)]">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-lg"></span>
                <span className="font-medium">DIY & Crafts</span>
              </span>
              <span className="flex items-center gap-2 bg-white/25 backdrop-blur-md text-white px-4 py-2 rounded-full border-2 border-white/60 hover:bg-white/35 transition-all duration-300 shadow-lg [text-shadow:_0_2px_4px_rgb(0_0_0_/_80%)]">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg"></span>
                <span className="font-medium">Family Life</span>
              </span>
              <span className="flex items-center gap-2 bg-white/25 backdrop-blur-md text-white px-4 py-2 rounded-full border-2 border-white/60 hover:bg-white/35 transition-all duration-300 shadow-lg [text-shadow:_0_2px_4px_rgb(0_0_0_/_80%)]">
                <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse shadow-lg"></span>
                <span className="font-medium">Beauty Hacks</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          {/* Detailed Description Section */}
          <div className="mb-16 text-center max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 md:p-12 rounded-3xl border border-blue-100">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                Discover Stories That Inspire & Transform
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                From <span className="font-semibold text-blue-600">fashion tips that transform your wardrobe</span> to{' '}
                <span className="font-semibold text-purple-600">DIY projects that bring creativity to life</span>,{' '}
                explore our collection of <span className="font-semibold text-green-600">inspiring stories</span> and{' '}
                <span className="font-semibold text-pink-600">practical guides</span> designed to enrich your lifestyle.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center justify-center gap-2 text-blue-600">
                  <span className="text-xl">👗</span>
                  <span className="font-medium">Style Tips</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-purple-600">
                  <span className="text-xl">🔨</span>
                  <span className="font-medium">DIY Projects</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <span className="text-xl">👨‍👩‍👧‍👦</span>
                  <span className="font-medium">Family Life</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-pink-600">
                  <span className="text-xl">✨</span>
                  <span className="font-medium">Beauty Hacks</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-12 bg-gray-50 p-6 rounded-2xl">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-black text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-xl border-4 border-gray-300 hover:border-gray-400 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="relative">
                    {post.featured_image ? (
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold text-base hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-blue-500 hover:border-blue-400 min-h-[48px] [text-shadow:_0_2px_4px_rgb(0_0_0_/_80%)]"
                    >
                      <svg className="w-5 h-5 drop-shadow-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12l7-7 7 7" />
                      </svg>
                      <span className="font-bold">Discover This Story</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold text-gray-800 mb-4">No Posts Found</h3>
              <p className="text-gray-600">Check back later for new stories.</p>
            </div>
          )}
        </div>
      </div>

      <NewsletterSignup />
    </div>
  )
}
