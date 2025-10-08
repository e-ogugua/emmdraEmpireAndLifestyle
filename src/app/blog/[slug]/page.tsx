'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { trackPageView } from '@/lib/analytics'
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

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // Unwrap the params Promise for Next.js 15 compatibility
  const { slug } = use(params)
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Use the unwrapped slug parameter
        if (!slug) {
          setError('Invalid blog post URL')
          return
        }

        // Fetch blog post by slug from database
        const { data: postData, error: postError } = await supabase
          .from('blogs')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single()

        if (postError) {
          console.error('Error fetching blog post:', postError)
          setError('Blog post not found')
          return
        }

        if (!postData) {
          setError('Blog post not found')
          return
        }

        setPost(postData)
        const { data: allPosts, error: allPostsError } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })

        if (allPostsError) {
          console.error('❌ Error fetching posts:', allPostsError)
          setError('Failed to load blog post.')
          return
        }

        // Find the post with matching slug
        const matchingPost = allPosts?.find(p => p.slug === slug)

        if (!matchingPost) {
          setError('Blog post not found.')
          return
        }

        setPost(matchingPost)

        // Track blog post view
        trackPageView({
          page_type: 'blog',
          page_id: matchingPost.id.toString(),
          page_title: matchingPost.title
        })

        // Fetch related posts (same category, excluding current post)
        const { data: relatedData, error: relatedError } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .eq('category', matchingPost.category)
          .neq('id', matchingPost.id)
          .limit(3)

        if (relatedError) {
          console.error('Error fetching related posts:', relatedError)
        } else {
          setRelatedPosts(relatedData || [])
        }

      } catch (err) {
        console.error('Error fetching blog post:', err)
        setError('Failed to load blog post.')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPostData()
    }
  }, [slug]) // Include slug in dependency array

  if (loading) {
    return (
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading blog post...</p>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">{error}</p>
          <Link
            href="/blog"
            className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  if (!post) {
    return null
  }

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Back to Blog Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>

        {/* Blog Post Header */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          {/* Featured Image */}
          <div className="relative w-full h-64 md:h-96 overflow-hidden">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="w-full h-full object-cover"
              priority
              sizes="100vw"
            />

            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                post.category === 'Family Life' ? 'bg-green-100 text-green-800' :
                post.category === 'Fashion Tips' ? 'bg-pink-100 text-pink-800' :
                post.category === 'DIY Projects' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {post.category}
              </span>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-8 lg:p-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 mb-8 text-gray-600">
              <span className="text-sm">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
              <span className="text-sm">•</span>
              <span className="text-sm">{post.category}</span>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Post Body */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {post.body.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Share this article</h3>
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

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-8">
              More {post.category} Stories
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="relative">
                    <Image
                      src={relatedPost.featured_image}
                      alt={relatedPost.title}
                      fill
                      className="w-full h-48 object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        relatedPost.category === 'Family Life' ? 'bg-green-100 text-green-800' :
                        relatedPost.category === 'Fashion Tips' ? 'bg-pink-100 text-pink-800' :
                        relatedPost.category === 'DIY Projects' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter Sign-up */}
        <NewsletterSignup
          title="Love Our Stories?"
          description="Get the latest fashion tips, DIY tutorials, beauty hacks, and family stories delivered to your inbox."
        />
      </div>
    </div>
  )
}
