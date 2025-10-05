'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import BookingsGrid from '@/components/admin/bookings/BookingsGrid'
import BookingDetailsModal from '@/components/admin/bookings/BookingDetailsModal'

interface Booking {
  id: number
  name: string
  email: string
  phone?: string
  service_type: string
  message: string
  status: 'new' | 'seen' | 'replied'
  date_submitted: string
  created_at: string
  updated_at: string
}

type ModalMode = 'details' | null

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

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
        fetchBookings()
      } catch (err) {
        console.error('Auth error:', err)
        setError('Authentication failed')
      }
    }

    checkAuth()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setBookings(data || [])
    } catch (err) {
      console.error('Error fetching bookings:', err)
      setError('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId: number, newStatus: 'seen' | 'replied') => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId)
        .select()
        .single()

      if (error) throw error

      setBookings(bookings.map(b => b.id === bookingId ? data : b))
    } catch (err) {
      console.error('Error updating booking status:', err)
      alert('Failed to update booking status')
    }
  }

  const handleDeleteBooking = async (bookingId: number) => {
    if (!confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId)

      if (error) throw error

      setBookings(bookings.filter(b => b.id !== bookingId))
    } catch (err) {
      console.error('Error deleting booking:', err)
      alert('Failed to delete booking')
    }
  }

  const viewBookingDetails = (booking: Booking) => {
    setSelectedBooking(booking)
    setModalMode('details')
  }

  // Filter bookings based on search and status
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage)

  // Calculate stats
  const stats = {
    total: bookings.length,
    new: bookings.filter(b => b.status === 'new').length,
    seen: bookings.filter(b => b.status === 'seen').length,
    replied: bookings.filter(b => b.status === 'replied').length
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
          </a>
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
              <h1 className="text-3xl font-bold text-gray-800">Bookings Management</h1>
              <p className="text-gray-600 mt-1">Manage customer inquiries and bookings</p>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.total}</div>
            <div className="text-gray-600">Total Bookings</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">{stats.new}</div>
            <div className="text-gray-600">New</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.seen}</div>
            <div className="text-gray-600">Seen</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.replied}</div>
            <div className="text-gray-600">Replied</div>
          </div>
        </div>

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
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              {['all', 'new', 'seen', 'replied'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    statusFilter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchBookings}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        {/* Bookings Grid */}
        <BookingsGrid
          bookings={paginatedBookings}
          loading={loading}
          onViewDetails={viewBookingDetails}
          onUpdateStatus={updateBookingStatus}
          onDelete={handleDeleteBooking}
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
        {!loading && filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || statusFilter !== 'all' ? 'No bookings found' : 'No bookings yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'All customer inquiries and bookings will appear here.'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <div className="text-sm text-gray-400">
                Bookings will appear when customers submit inquiries through your website.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {modalMode === 'details' && selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => {
            setModalMode(null)
            setSelectedBooking(null)
          }}
          onUpdateStatus={updateBookingStatus}
        />
      )}
    </div>
  )
}
