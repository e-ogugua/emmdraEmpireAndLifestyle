'use client'

import { useState } from 'react'

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

interface BookingDetailsModalProps {
  booking: Booking
  onClose: () => void
  onUpdateStatus: (bookingId: number, status: 'seen' | 'replied') => void
}

export default function BookingDetailsModal({ booking, onClose, onUpdateStatus }: BookingDetailsModalProps) {
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusUpdate = async (newStatus: 'seen' | 'replied') => {
    if (booking.status === newStatus) return

    setIsUpdating(true)
    try {
      await onUpdateStatus(booking.id, newStatus)
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'seen':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'replied':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Booking Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(booking.status)}`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>

            {/* Status Action Buttons */}
            <div className="flex gap-2">
              {booking.status === 'new' && (
                <button
                  onClick={() => handleStatusUpdate('seen')}
                  disabled={isUpdating}
                  className="bg-yellow-600 text-white px-3 py-2 rounded-md hover:bg-yellow-700 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  {isUpdating ? 'Updating...' : 'Mark as Seen'}
                </button>
              )}

              {booking.status !== 'replied' && (
                <button
                  onClick={() => handleStatusUpdate('replied')}
                  disabled={isUpdating}
                  className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  {isUpdating ? 'Updating...' : 'Mark as Replied'}
                </button>
              )}
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Customer Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-gray-800">{booking.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-800">{booking.email}</p>
                </div>
                {booking.phone && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-800">{booking.phone}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Booking Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Service Type</label>
                  <p className="text-gray-800 capitalize">{booking.service_type.replace('_', ' ')}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date Submitted</label>
                  <p className="text-gray-800">{formatDate(booking.date_submitted)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created</label>
                  <p className="text-gray-800">{formatDate(booking.created_at)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Message</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                {booking.message}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`mailto:${booking.email}?subject=Regarding your ${booking.service_type} inquiry`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
              >
                Reply via Email
              </a>

              {booking.phone && (
                <a
                  href={`https://wa.me/${booking.phone.replace(/\D/g, '')}?text=Hi%20${booking.name},%20regarding%20your%20${booking.service_type}%20inquiry`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
                >
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
