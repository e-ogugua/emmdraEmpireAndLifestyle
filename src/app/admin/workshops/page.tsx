'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import AdminLayout from '@/components/AdminLayout'
import { trackPageView } from '@/lib/analytics'

interface Workshop {
  id: number
  title: string
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

export default function AdminWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  useEffect(() => {
    fetchWorkshops()
    trackPageView({ page_type: 'diy' }) // Using 'diy' as closest match for workshops
  }, [])

  const fetchWorkshops = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('workshops')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setWorkshops(data || [])
    } catch (err) {
      console.error('Error fetching workshops:', err)
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
        .from('workshops')
        .delete()
        .eq('id', id)

      if (error) throw error

      fetchWorkshops()
    } catch (err) {
      console.error('Error deleting workshop:', err)
      alert('Failed to delete workshop. Please try again.')
    }
  }

  const toggleStatus = async (id: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'upcoming' ? 'completed' : 'upcoming'
      const { error } = await supabase
        .from('workshops')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error

      fetchWorkshops()
    } catch (err) {
      console.error('Error updating workshop:', err)
      alert('Failed to update workshop. Please try again.')
    }
  }

  const toggleFeatured = async (id: number, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('workshops')
        .update({ featured: !currentFeatured })
        .eq('id', id)

      if (error) throw error

      fetchWorkshops()
    } catch (err) {
      console.error('Error updating workshop:', err)
      alert('Failed to update workshop. Please try again.')
    }
  }

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || workshop.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || workshop.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = ['all', ...Array.from(new Set(workshops.map(w => w.category)))]
  const statuses = ['all', 'upcoming', 'completed', 'cancelled']

  return (
    <AdminLayout currentPage="workshops">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Workshops Management</h1>
            <p className="text-gray-600 mt-1">Manage your workshop and training sessions</p>
          </div>
          <Link
            href="/admin/workshops/new"
            className="mt-4 sm:mt-0 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Workshop
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-xl">🎓</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total Workshops</p>
                <p className="text-2xl font-bold text-gray-900">{workshops.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-xl">⏰</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{workshops.filter(w => w.status === 'upcoming').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-xl">⭐</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-gray-900">{workshops.filter(w => w.featured).length}</p>
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
                <p className="text-2xl font-bold text-gray-900">{new Set(workshops.map(w => w.category)).size}</p>
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
                placeholder="Search workshops..."
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
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                {statuses.filter(status => status !== 'all').map(status => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Workshops Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
            </div>
          ) : filteredWorkshops.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Workshop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
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
                  {filteredWorkshops.map((workshop) => (
                    <tr key={workshop.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0">
                            <Image
                              className="h-12 w-12 rounded-lg object-cover"
                              src={workshop.cover_image}
                              alt={workshop.title}
                              width={48}
                              height={48}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 line-clamp-1">{workshop.title}</div>
                            <div className="text-sm text-gray-500">
                              {workshop.schedule?.date ? new Date(workshop.schedule.date).toLocaleDateString() : 'No date set'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          workshop.category === 'Fashion' ? 'bg-pink-100 text-pink-800' :
                          workshop.category === 'Beauty' ? 'bg-purple-100 text-purple-800' :
                          workshop.category === 'Crafts' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {workshop.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₦{workshop.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => toggleStatus(workshop.id, workshop.status)}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              workshop.status === 'upcoming'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {workshop.status === 'upcoming' ? '⏰ Upcoming' : '✅ Completed'}
                          </button>
                          <button
                            onClick={() => toggleFeatured(workshop.id, workshop.featured)}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              workshop.featured
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {workshop.featured ? '⭐ Featured' : '☆ Not Featured'}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {workshop.schedule?.date ? new Date(workshop.schedule.date).toLocaleDateString() : 'TBD'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            href={`/admin/workshops/${workshop.id}/edit`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(workshop.id, workshop.title)}
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
                {searchTerm || selectedCategory !== 'all' || selectedStatus !== 'all'
                  ? 'No workshops match your search criteria.'
                  : 'No workshops found. Create your first workshop to get started.'}
              </p>
              <Link
                href="/admin/workshops/new"
                className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Create First Workshop
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
