'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import BlogGrid from '@/components/admin/blogs/BlogGrid'
import BlogFormModal from '@/components/admin/blogs/BlogFormModal'

interface BlogPost {
  id: number
  title: string
  category: string
  excerpt: string
  content: string
  featured_image: string
  published_at: string
  created_at: string
  updated_at: string
}

type ModalMode = 'add' | 'edit' | null

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)

  // Check authentication and authorization
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          window.location.href = '/admin/login'
          return
        }

        // Check if user is authorized (Emmanuel or Chidera)
        const allowedEmails = ['emmanuel@example.com', 'chidera@example.com']
        if (!allowedEmails.includes(user.email || '')) {
          setError('Access denied. You are not authorized to access this dashboard.')
          return
        }

        setUser(user)
        fetchBlogs()
      } catch (err) {
        console.error('Auth error:', err)
        setError('Authentication failed')
      }
    }

    checkAuth()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setBlogs(data || [])
    } catch (err) {
      console.error('Error fetching blogs:', err)
      setError('Failed to load blog posts')
    } finally {
      setLoading(false)
    }
  }

  const handleAddBlog = async (blogData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .insert([blogData])
        .select()
        .single()

      if (error) throw error

      setBlogs([data, ...blogs])
      setModalMode(null)
    } catch (err) {
      console.error('Error adding blog:', err)
      throw new Error('Failed to add blog post')
    }
  }

  const handleUpdateBlog = async (blogData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    if (!editingBlog) return

    try {
      const { data, error } = await supabase
        .from('blogs')
        .update(blogData)
        .eq('id', editingBlog.id)
        .select()
        .single()

      if (error) throw error

      setBlogs(blogs.map(b => b.id === editingBlog.id ? data : b))
      setEditingBlog(null)
      setModalMode(null)
    } catch (err) {
      console.error('Error updating blog:', err)
      throw new Error('Failed to update blog post')
    }
  }

  const handleDeleteBlog = async (blogId: number) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', blogId)

      if (error) throw error

      setBlogs(blogs.filter(b => b.id !== blogId))
    } catch (err) {
      console.error('Error deleting blog:', err)
      alert('Failed to delete blog post')
    }
  }

  const startEdit = (blog: BlogPost) => {
    setEditingBlog(blog)
    setModalMode('edit')
  }

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage)

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
              <p className="text-gray-600 mt-1">Manage your blog content</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <button
                onClick={async () => {
                  try {
                    await supabase.auth.signOut()
                    window.location.href = '/admin/login'
                  } catch (error) {
                    console.error('Sign out error:', error)
                    alert('Error signing out. Please try again.')
                  }
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Stats and Actions */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{blogs.length}</div>
                <div className="text-sm text-gray-600">Total Posts</div>
              </div>
              <button
                onClick={() => setModalMode('add')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Blog Post
              </button>
            </div>
          </div>
        </div>

        {/* Blogs Grid */}
        <BlogGrid
          blogs={paginatedBlogs}
          loading={loading}
          onEdit={startEdit}
          onDelete={handleDeleteBlog}
          onRefresh={fetchBlogs}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No blog posts found' : 'No blog posts yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? 'Try adjusting your search terms.'
                : 'Start sharing your story by creating your first blog post.'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setModalMode('add')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Write First Post
              </button>
            )}
          </div>
        )}
      </div>

      {/* Blog Form Modal */}
      {modalMode && (
        <BlogFormModal
          mode={modalMode}
          blog={editingBlog}
          onSubmit={modalMode === 'edit' ? handleUpdateBlog : handleAddBlog}
          onClose={() => {
            setModalMode(null)
            setEditingBlog(null)
          }}
        />
      )}
    </div>
  )
}
