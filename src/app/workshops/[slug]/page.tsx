'use client'

import { useEffect, useState, use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
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

interface WorkshopPageProps {
  params: Promise<{ slug: string }>
}

export default function WorkshopPage({ params }: WorkshopPageProps) {
  const { slug } = use(params)
  const [workshop, setWorkshop] = useState<Workshop | null>(null)
  const [relatedWorkshops, setRelatedWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchWorkshopData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Generate slug from title to find the workshop
        const generateSlug = (title: string) => {
          return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
        }

        // Find workshop with matching slug
        const { data: allWorkshops, error: allWorkshopsError } = await supabase
          .from('workshops')
          .select('*')
          .eq('status', 'upcoming')
          .order('schedule->date', { ascending: true, nullsFirst: false })

        if (allWorkshopsError) {
          console.error('❌ Error fetching workshops:', allWorkshopsError)
          setError('Failed to load workshop.')
          return
        }

        // Find the workshop with matching slug
        const matchingWorkshop = allWorkshops?.find(w => generateSlug(w.title) === slug)

        if (!matchingWorkshop) {
          setError('Workshop not found.')
          return
        }

        setWorkshop(matchingWorkshop)

        // Track workshop view
        trackPageView({
          page_type: 'blog',
          page_id: matchingWorkshop.id.toString(),
          page_title: matchingWorkshop.title
        })

        // Fetch related workshops (same category, excluding current workshop)
        const { data: relatedData, error: relatedError } = await supabase
          .from('workshops')
          .select('*')
          .eq('status', 'upcoming')
          .eq('category', matchingWorkshop.category)
          .neq('id', matchingWorkshop.id)
          .limit(3)

        if (relatedError) {
          console.error('Error fetching related workshops:', relatedError)
        } else {
          setRelatedWorkshops(relatedData || [])
        }

      } catch {
        console.error('Error fetching workshop')
        setError('Failed to load workshop.')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchWorkshopData()
    }
  }, [slug])

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      // Here you would typically send this to your backend or Supabase
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000))

      setSubmitMessage('✅ Registration submitted successfully! We\'ll contact you soon.')
      setRegistrationForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setSubmitMessage('❌ Failed to submit registration. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading workshop...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Workshop Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">{error}</p>
          <Link
            href="/workshops"
            className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
          >
            Back to Workshops
          </Link>
        </div>
      </div>
    )
  }

  if (!workshop) {
    return null
  }

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Back to Workshops Link */}
        <div className="mb-8">
          <Link
            href="/workshops"
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Workshops
          </Link>
        </div>

        {/* Workshop Header */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          {/* Featured Image */}
          <div className="relative w-full h-64 md:h-96 overflow-hidden">
            <Image
              src={workshop.cover_image}
              alt={workshop.title}
              width={800}
              height={400}
              className="w-full h-full object-cover"
            />

            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                workshop.category === 'Fashion' ? 'bg-pink-100 text-pink-800' :
                workshop.category === 'Beauty' ? 'bg-purple-100 text-purple-800' :
                workshop.category === 'Crafts' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {workshop.category}
              </span>
            </div>
          </div>

          {/* Workshop Content */}
          <div className="p-8 lg:p-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              {workshop.title}
            </h1>

            <div className="flex items-center gap-4 mb-8 text-gray-600">
              <span className="text-sm">
                {workshop.instructor && `Instructor: ${workshop.instructor}`}
              </span>
              <span className="text-sm">•</span>
              <span className="text-sm">{workshop.category}</span>
            </div>

            {/* Workshop Meta Grid */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {workshop.schedule?.date && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800 mb-1">📅</div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-gray-800">{new Date(workshop.schedule.date).toLocaleDateString()}</p>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 mb-1">💰</div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="font-semibold text-gray-800">₦{workshop.price.toLocaleString()}</p>
                </div>
                {workshop.schedule?.duration && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800 mb-1">⏱️</div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-800">{workshop.schedule.duration}</p>
                  </div>
                )}
                {workshop.max_participants && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800 mb-1">👥</div>
                    <p className="text-sm text-gray-600">Capacity</p>
                    <p className="font-semibold text-gray-800">{workshop.max_participants} people</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Workshop</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {workshop.description}
              </p>
            </div>

            {/* Registration Form */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Register for This Workshop</h2>

              {submitMessage && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitMessage.includes('✅')
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleRegistrationSubmit} className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-800 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={registrationForm.name}
                      onChange={(e) => setRegistrationForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-brand-burnt-orange transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-md hover:border-brand-burnt-orange/50 text-base sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={registrationForm.email}
                      onChange={(e) => setRegistrationForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-brand-burnt-orange transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-md hover:border-brand-burnt-orange/50 text-base sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-800 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={registrationForm.phone}
                    onChange={(e) => setRegistrationForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-brand-burnt-orange transition-all duration-300 bg-white text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-md hover:border-brand-burnt-orange/50 text-base sm:text-sm"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-bold text-gray-800 mb-2">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={registrationForm.message}
                    onChange={(e) => setRegistrationForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-brand-burnt-orange transition-all duration-300 resize-none bg-white text-gray-900 placeholder-gray-500 shadow-sm hover:shadow-md hover:border-brand-burnt-orange/50 text-base sm:text-sm"
                    placeholder="Any questions or special requirements?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-bold text-base sm:text-lg transition-all duration-300 shadow-lg border-2 min-h-[48px] sm:min-h-[56px] flex items-center justify-center gap-2 transform hover:scale-105 hover:-translate-y-0.5 ${
                    isSubmitting
                      ? 'bg-gray-400 text-white border-gray-300 cursor-not-allowed opacity-75'
                      : 'bg-brand-burnt-orange text-white hover:bg-brand-burnt-orange-light border-brand-burnt-orange hover:border-brand-burnt-orange-light hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span className="text-sm sm:text-base">Registering...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span className="text-sm sm:text-base">Register for Workshop</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </article>

        {/* Related Workshops Section */}
        {relatedWorkshops.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-8">
              More {workshop.category} Workshops
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedWorkshops.map((relatedWorkshop) => (
                <article
                  key={relatedWorkshop.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  <div className="relative">
                    <Image
                      src={relatedWorkshop.cover_image}
                      alt={relatedWorkshop.title}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        relatedWorkshop.category === 'Fashion' ? 'bg-pink-100 text-pink-800' :
                        relatedWorkshop.category === 'Beauty' ? 'bg-purple-100 text-purple-800' :
                        relatedWorkshop.category === 'Crafts' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {relatedWorkshop.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
                      {relatedWorkshop.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {relatedWorkshop.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <span>💰 ₦{relatedWorkshop.price.toLocaleString()}</span>
                    </div>
                    <Link
                      href={`/workshops/${relatedWorkshop.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()}`}
                      className="text-purple-600 hover:text-purple-800 font-medium text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
