'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Consultation {
  id: number
  name: string
  email: string
  phone?: string
  consultation_type: string
  budget?: string
  preferred_date?: string
  preferred_time?: string
  current_style?: string
  goals?: string
  message?: string
  created_at: string
}

export default function AdminConsultations() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null)

  // Check authentication and authorization
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          window.location.href = '/admin/login'
          return
        }

        // Check if user is authorized
        const allowedEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || []
        if (!allowedEmails.includes(user.email || '')) {
          setError('Access denied. You are not authorized to access this page.')
          return
        }

        setUser(user)
        fetchConsultations()
      } catch (err) {
        console.error('Auth error:', err)
        setError('Authentication failed')
      }
    }

    checkAuth()
  }, [])

  const fetchConsultations = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching consultations:', error)
        setError('Failed to load consultations')
        return
      }

      setConsultations(data || [])
    } catch (err) {
      console.error('Error:', err)
      setError('Failed to load consultations')
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/admin/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </a>
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
              <h1 className="text-2xl font-bold text-gray-800">Consultations Management</h1>
              <p className="text-gray-600">Manage consultation requests - {consultations.length} total</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchConsultations}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Refresh
              </button>
              <a
                href="/admin/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Dashboard
              </a>
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
              <p className="text-gray-600">Loading consultations...</p>
            </div>
          </div>
        ) : consultations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No consultations yet</h3>
            <p className="text-gray-500">Consultation requests will appear here when customers submit them.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">All Consultations</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Consultation Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preferred Time
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
                  {consultations.map((consultation) => (
                    <tr key={consultation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{consultation.name}</div>
                          <div className="text-sm text-gray-500">{consultation.email}</div>
                          {consultation.phone && (
                            <div className="text-sm text-gray-500">{consultation.phone}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{consultation.consultation_type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {consultation.budget ? `₦${consultation.budget}` : 'Not specified'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {consultation.preferred_time || 'Not specified'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(consultation.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedConsultation(consultation)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          View Details
                        </button>
                        <a
                          href={`mailto:${consultation.email}?subject=Regarding your consultation request`}
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

      {/* Consultation Details Modal */}
      {selectedConsultation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Consultation Details</h3>
              <button
                onClick={() => setSelectedConsultation(null)}
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
                    <p><span className="font-medium">Name:</span> {selectedConsultation.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedConsultation.email}</p>
                    {selectedConsultation.phone && (
                      <p><span className="font-medium">Phone:</span> {selectedConsultation.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Consultation Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Type:</span> {selectedConsultation.consultation_type}</p>
                    <p><span className="font-medium">Budget:</span> {selectedConsultation.budget ? `₦${selectedConsultation.budget}` : 'Not specified'}</p>
                    {selectedConsultation.preferred_date && (
                      <p><span className="font-medium">Preferred Date:</span> {new Date(selectedConsultation.preferred_date).toLocaleDateString()}</p>
                    )}
                    {selectedConsultation.preferred_time && (
                      <p><span className="font-medium">Preferred Time:</span> {selectedConsultation.preferred_time}</p>
                    )}
                  </div>
                </div>
              </div>

              {selectedConsultation.current_style && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Current Style</h4>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedConsultation.current_style}</p>
                  </div>
                </div>
              )}

              {selectedConsultation.goals && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Goals</h4>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedConsultation.goals}</p>
                  </div>
                </div>
              )}

              {selectedConsultation.message && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Additional Message</h4>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{selectedConsultation.message}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => setSelectedConsultation(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <a
                  href={`mailto:${selectedConsultation.email}?subject=Regarding your consultation request`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Reply to Customer
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
