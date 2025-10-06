'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import DIYGrid from '@/components/admin/diy/DIYGrid'
import DIYFormModal from '@/components/admin/diy/DIYFormModal'

interface DIYTutorial {
  id: number
  title: string
  category: string
  difficulty: string
  excerpt: string
  steps: string[]
  cover_image_url: string
  created_at: string
  updated_at: string
}

type ModalMode = 'add' | 'edit' | null

export default function AdminDIYPage() {
  const [tutorials, setTutorials] = useState<DIYTutorial[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [editingTutorial, setEditingTutorial] = useState<DIYTutorial | null>(null)
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
        fetchTutorials()
      } catch (err) {
        console.error('Auth error:', err)
        setError('Authentication failed')
      }
    }

    checkAuth()
  }, [])

  const fetchTutorials = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('tutorials')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTutorials(data || [])
    } catch (err) {
      console.error('Error fetching tutorials:', err)
      setError('Failed to load DIY tutorials')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTutorial = async (tutorialData: Omit<DIYTutorial, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('tutorials')
        .insert([tutorialData])
        .select()
        .single()

      if (error) throw error

      setTutorials([data, ...tutorials])
      setModalMode(null)
    } catch (err) {
      console.error('Error adding tutorial:', err)
      throw new Error('Failed to add DIY tutorial')
    }
  }

  const handleUpdateTutorial = async (tutorialData: Omit<DIYTutorial, 'id' | 'created_at' | 'updated_at'>) => {
    if (!editingTutorial) return

    try {
      const { data, error } = await supabase
        .from('tutorials')
        .update(tutorialData)
        .eq('id', editingTutorial.id)
        .select()
        .single()

      if (error) throw error

      setTutorials(tutorials.map(t => t.id === editingTutorial.id ? data : t))
      setEditingTutorial(null)
      setModalMode(null)
    } catch (err) {
      console.error('Error updating tutorial:', err)
      throw new Error('Failed to update DIY tutorial')
    }
  }

  const handleDeleteTutorial = async (tutorialId: number) => {
    if (!confirm('Are you sure you want to delete this DIY tutorial? This action cannot be undone.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('tutorials')
        .delete()
        .eq('id', tutorialId)

      if (error) throw error

      setTutorials(tutorials.filter(t => t.id !== tutorialId))
    } catch (err) {
      console.error('Error deleting tutorial:', err)
      alert('Failed to delete DIY tutorial')
    }
  }

  const startEdit = (tutorial: DIYTutorial) => {
    setEditingTutorial(tutorial)
    setModalMode('edit')
  }

  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutorial.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutorial.difficulty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutorial.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredTutorials.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTutorials = filteredTutorials.slice(startIndex, startIndex + itemsPerPage)

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
              <h1 className="text-3xl font-bold text-gray-800">DIY Tutorials Management</h1>
              <p className="text-gray-600 mt-1">Manage your DIY tutorial content</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <button
                onClick={() => supabase.auth.signOut()}
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
                placeholder="Search tutorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Stats and Actions */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{tutorials.length}</div>
                <div className="text-sm text-gray-600">Total Tutorials</div>
              </div>
              <button
                onClick={() => setModalMode('add')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Tutorial
              </button>
            </div>
          </div>
        </div>

        {/* Tutorials Grid */}
        <DIYGrid
          tutorials={paginatedTutorials}
          loading={loading}
          onEdit={startEdit}
          onDelete={handleDeleteTutorial}
          onRefresh={fetchTutorials}
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
        {!loading && filteredTutorials.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 8a9 9 0 110-18 9 9 0 010 18z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No tutorials found' : 'No DIY tutorials yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? 'Try adjusting your search terms.'
                : 'Start sharing your creativity by creating your first DIY tutorial.'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setModalMode('add')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create First Tutorial
              </button>
            )}
          </div>
        )}
      </div>

      {/* DIY Form Modal */}
      {modalMode && (
        <DIYFormModal
          mode={modalMode}
          tutorial={editingTutorial}
          onSubmit={modalMode === 'edit' ? handleUpdateTutorial : handleAddTutorial}
          onClose={() => {
            setModalMode(null)
            setEditingTutorial(null)
          }}
        />
      )}
    </div>
  )
}
