'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface WorkshopRegistration {
  id: number
  name: string
  email: string
  phone?: string
  workshop_name: string
  workshop_date?: string
  experience_level?: string
  group_size?: string
  budget?: string
  special_requirements?: string
  message?: string
  status: string
  created_at: string
}

export default function AdminWorkshopRegistrations() {
  const [registrations, setRegistrations] = useState<WorkshopRegistration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRegistration, setSelectedRegistration] = useState<WorkshopRegistration | null>(null)

  // Check authentication and authorization
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          window.location.href = '/admin/login'
          return
        }

        // Check if user is authorized (case-insensitive and trimmed)
        const allowedEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || []
        const normalizedUserEmail = user.email?.toLowerCase().trim() || ''
        const normalizedAllowedEmails = allowedEmails.map(email => email.toLowerCase().trim())

        if (!normalizedAllowedEmails.includes(normalizedUserEmail)) {
          setError('Access denied. You are not authorized to access this page.')
          return
        }

        fetchRegistrations()
      } catch (err) {
        console.error('Auth error:', err)
        setError('Authentication failed')
      }
    }

    checkAuth()
  }, [])

  const fetchRegistrations = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('workshop_registrations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching workshop registrations:', error)
        setError('Failed to load workshop registrations')
        return
      }

      setRegistrations(data || [])
    } catch (err) {
      console.error('Error:', err)
      setError('Failed to load workshop registrations')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('workshop_registrations')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error

      fetchRegistrations()
    } catch (err) {
      console.error('Error updating registration:', err)
      alert('Failed to update registration status')
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/admin/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Workshop Registrations</h1>
              <p className="text-gray-600">Manage workshop signups - {registrations.length} total</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchRegistrations}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Refresh
              </button>
              <Link
                href="/admin/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading workshop registrations...</p>
            </div>
          </div>
        ) : registrations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workshop registrations yet</h3>
            <p className="text-gray-500">Workshop registrations will appear here when customers submit them.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">All Workshop Registrations</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Workshop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {registrations.map((registration) => (
                    <tr key={registration.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{registration.name}</div>
                          <div className="text-sm text-gray-500">{registration.email}</div>
                          {registration.phone && (
                            <div className="text-sm text-gray-500">{registration.phone}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{registration.workshop_name}</div>
                        {registration.experience_level && (
                          <div className="text-sm text-gray-500">Level: {registration.experience_level}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(registration.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={registration.status}
                          onChange={(e) => updateStatus(registration.id, e.target.value)}
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            registration.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : registration.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedRegistration(registration)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          View Details
                        </button>
                        <a
                          href={`mailto:${registration.email}?subject=Regarding your workshop registration`}
                          className="text-green-600 hover:text-green-900"
                        >
                          Reply
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Registration Details Modal */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Workshop Registration Details</h3>
              <button
                onClick={() => setSelectedRegistration(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Name:</span> {selectedRegistration.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedRegistration.email}</p>
                    {selectedRegistration.phone && (
                      <p><span className="font-medium">Phone:</span> {selectedRegistration.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Workshop Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Workshop:</span> {selectedRegistration.workshop_name}</p>
                    {selectedRegistration.workshop_date && (
                      <p><span className="font-medium">Preferred Date:</span> {selectedRegistration.workshop_date}</p>
                    )}
                    {selectedRegistration.experience_level && (
                      <p><span className="font-medium">Experience Level:</span> {selectedRegistration.experience_level}</p>
                    )}
                    {selectedRegistration.group_size && (
                      <p><span className="font-medium">Group Size:</span> {selectedRegistration.group_size}</p>
                    )}
                    {selectedRegistration.budget && (
                      <p><span className="font-medium">Budget:</span> ₦{selectedRegistration.budget}</p>
                    )}
                  </div>
                </div>
              </div>

              {selectedRegistration.special_requirements && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Special Requirements</h4>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedRegistration.special_requirements}</p>
                  </div>
                </div>
              )}

              {selectedRegistration.message && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Message</h4>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedRegistration.message}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="flex gap-2">
                  <select
                    value={selectedRegistration.status}
                    onChange={(e) => updateStatus(selectedRegistration.id, e.target.value)}
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      selectedRegistration.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : selectedRegistration.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedRegistration(null)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <a
                    href={`mailto:${selectedRegistration.email}?subject=Regarding your workshop registration`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Reply to Customer
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
