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

interface BookingsGridProps {
  bookings: Booking[]
  loading: boolean
  onViewDetails: (booking: Booking) => void
  onUpdateStatus: (bookingId: number, status: 'seen' | 'replied') => void
  onDelete: (bookingId: number) => void
}

export default function BookingsGrid({ bookings, loading, onViewDetails, onUpdateStatus, onDelete }: BookingsGridProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading bookings...</p>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-red-100 text-red-800'
      case 'seen':
        return 'bg-yellow-100 text-yellow-800'
      case 'replied':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">All Bookings</h2>
      </div>

      {/* Bookings Grid */}
      {bookings.length === 0 ? (
        <div className="p-8 text-center">
          <div className="text-gray-500 mb-4">
            <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-gray-600">No bookings to display</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
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
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                      <div className="text-sm text-gray-500">{booking.email}</div>
                      {booking.phone && (
                        <div className="text-sm text-gray-500">{booking.phone}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.service_type}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {booking.message.length > 50
                        ? `${booking.message.substring(0, 50)}...`
                        : booking.message
                      }
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(booking.date_submitted).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onViewDetails(booking)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        View
                      </button>

                      {booking.status === 'new' && (
                        <button
                          onClick={() => onUpdateStatus(booking.id, 'seen')}
                          className="text-yellow-600 hover:text-yellow-900 transition-colors"
                        >
                          Mark Seen
                        </button>
                      )}

                      {booking.status !== 'replied' && (
                        <button
                          onClick={() => onUpdateStatus(booking.id, 'replied')}
                          className="text-green-600 hover:text-green-900 transition-colors"
                        >
                          Mark Replied
                        </button>
                      )}

                      <button
                        onClick={() => onDelete(booking.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
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
      )}
    </div>
  )
}
