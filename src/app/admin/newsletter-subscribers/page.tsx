'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface NewsletterSubscriber {
  id: string
  email: string
  subscribed_at: string
  status: string
  created_at: string
}

export default function NewsletterSubscribersPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(20)

  const fetchSubscribers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false })

      if (error) {
        console.error('Error fetching subscribers:', error)
        return
      }

      setSubscribers(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedSubscribers = filteredSubscribers.slice(startIndex, startIndex + itemsPerPage)

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) {
        console.error('Error updating subscriber status:', error)
        return
      }

      // Update local state
      setSubscribers(prev => prev.map(sub =>
        sub.id === id ? { ...sub, status: newStatus } : sub
      ))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Error deleting subscriber:', error)
        return
      }

      // Update local state
      setSubscribers(prev => prev.filter(sub => sub.id !== id))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscribers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Newsletter Subscribers
              </h1>
              <p className="text-gray-700 mt-1 font-medium">Manage your email subscriber list</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-medium shadow-lg min-h-[44px] flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Admin
              </Link>
              <button
                onClick={fetchSubscribers}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 font-medium shadow-lg min-h-[44px] flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-200 hover:border-indigo-200 transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
              {subscribers.length}
            </div>
            <p className="text-sm font-medium text-gray-700">Total Subscribers</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-200 hover:border-green-200 transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">
              {subscribers.filter(s => s.status === 'active').length}
            </div>
            <p className="text-sm font-medium text-gray-700">Active Subscribers</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-200 hover:border-red-200 transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-3xl sm:text-4xl font-bold text-red-600 mb-2">
              {subscribers.filter(s => s.status === 'unsubscribed').length}
            </div>
            <p className="text-sm font-medium text-gray-700">Unsubscribed</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-md"
              />
            </div>
            <div className="w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 bg-white text-gray-900 shadow-sm hover:shadow-md"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="unsubscribed">Unsubscribed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                    Subscribed Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-indigo-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-indigo-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={subscriber.status}
                        onChange={(e) => handleStatusChange(subscriber.id, e.target.value)}
                        className={`text-sm rounded-full px-3 py-1 font-medium transition-all duration-200 ${
                          subscriber.status === 'active'
                            ? 'bg-green-100 text-green-800 border-2 border-green-200 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 border-2 border-red-200 hover:bg-red-200'
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="unsubscribed">Unsubscribed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(subscriber.subscribed_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(subscriber.id)}
                        className="text-red-600 hover:text-red-900 font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-all duration-200 border-2 border-transparent hover:border-red-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginatedSubscribers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-indigo-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No subscribers found.</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-h-[44px]"
              >
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    const distance = Math.abs(page - currentPage)
                    return distance === 0 || distance === 1 || page === 1 || page === totalPages
                  })
                  .map((page, index, array) => {
                    if (index > 0 && page - array[index - 1] > 1) {
                      return [
                        <span key={`ellipsis-${page}`} className="px-2 text-gray-500">...</span>,
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 min-h-[44px] ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                              : 'text-gray-500 bg-white border-2 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ]
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 min-h-[44px] ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                            : 'text-gray-500 bg-white border-2 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-h-[44px]"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
