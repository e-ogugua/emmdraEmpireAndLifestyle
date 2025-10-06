'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import AdminLayout from '@/components/AdminLayout'
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

export default function AdminDIY() {
  const [tutorials, setTutorials] = useState<DIYTutorial[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  useEffect(() => {
    fetchTutorials()
    trackPageView({ page_type: 'diy' })
  }, [])

  const fetchTutorials = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('diy_tutorials')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setTutorials(data || [])
    } catch (err) {
      console.error('Error fetching DIY tutorials:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('diy_tutorials')
        .delete()
        .eq('id', id)

      if (error) throw error

      fetchTutorials()
    } catch (err) {
      console.error('Error deleting DIY tutorial:', err)
      alert('Failed to delete DIY tutorial. Please try again.')
    }
  }

  const togglePublished = async (id: number, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('diy_tutorials')
        .update({ published: !currentStatus })
        .eq('id', id)

      if (error) throw error

      fetchTutorials()
    } catch (err) {
      console.error('Error updating DIY tutorial:', err)
      alert('Failed to update DIY tutorial. Please try again.')
    }
  }

  const toggleFeatured = async (id: number, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('diy_tutorials')
        .update({ featured: !currentFeatured })
        .eq('id', id)

      if (error) throw error

      fetchTutorials()
    } catch (err) {
      console.error('Error updating DIY tutorial:', err)
      alert('Failed to update DIY tutorial. Please try again.')
    }
  }

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const categories = ['all', ...Array.from(new Set(tutorials.map(t => t.category)))]
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced']

  return (
    <AdminLayout currentPage="diy">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">DIY Tutorials Management</h1>
            <p className="text-gray-600 mt-1">Manage your DIY tutorial content</p>
          </div>
          <Link
            href="/admin/diy/new"
            className="mt-4 sm:mt-0 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Tutorial
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-xl">🛠️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total Tutorials</p>
                <p className="text-2xl font-bold text-gray-900">{tutorials.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-xl">📖</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">{tutorials.filter(t => t.published).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-xl">⭐</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-gray-900">{tutorials.filter(t => t.featured).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-xl">🏷️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{new Set(tutorials.map(t => t.category)).size}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.filter(cat => cat !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="all">All Difficulties</option>
                {difficulties.filter(diff => diff !== 'all').map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* DIY Tutorials Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
            </div>
          ) : filteredTutorials.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tutorial
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTutorials.map((tutorial) => (
                    <tr key={tutorial.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0">
                            {tutorial.cover_image ? (
                              <Image
                                className="h-12 w-12 rounded-lg object-cover"
                                src={tutorial.cover_image}
                                alt={tutorial.title}
                                width={48}
                                height={48}
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400 text-lg">📷</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">{tutorial.title}</div>
                            <div className="text-sm text-gray-500">⏱️ {tutorial.estimated_time}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {tutorial.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tutorial.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          tutorial.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {tutorial.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => togglePublished(tutorial.id, tutorial.published)}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              tutorial.published
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {tutorial.published ? '📖 Published' : '📝 Draft'}
                          </button>
                          <button
                            onClick={() => toggleFeatured(tutorial.id, tutorial.featured)}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              tutorial.featured
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {tutorial.featured ? '⭐ Featured' : '☆ Not Featured'}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(tutorial.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            href={`/admin/diy/${tutorial.id}/edit`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(tutorial.id, tutorial.title)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all'
                  ? 'No DIY tutorials match your search criteria.'
                  : 'No DIY tutorials found. Create your first tutorial to get started.'}
              </p>
              <Link
                href="/admin/diy/new"
                className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Create First Tutorial
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
