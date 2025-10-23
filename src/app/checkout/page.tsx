'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import Link from 'next/link'
import Image from 'next/image'

interface CheckoutFormData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  deliveryInstructions: string
  paymentMethod: 'contact' | 'bank_transfer'
}

export default function CheckoutPage() {
  const { state: cartState, clearCart } = useCart()
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    deliveryInstructions: '',
    paymentMethod: 'contact'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      // Submit order to API
      const orderData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        product_name: `Order with ${cartState.itemCount} items`,
        product_id: `cart-${Date.now()}`,
        quantity: cartState.itemCount.toString(),
        budget: cartState.total.toString(),
        message: `Order Details:\n${cartState.items.map(item => `${item.name} (Qty: ${item.quantity}) - ₦${(item.price * item.quantity).toLocaleString()}`).join('\n')}\n\nDelivery Address: ${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}\n\nPayment Method: ${formData.paymentMethod === 'contact' ? 'Contact for payment details' : 'Bank transfer'}\n\nInstructions: ${formData.deliveryInstructions || 'None'}`
      }

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitMessage({
          type: 'success',
          message: 'Order submitted successfully! We will contact you soon with payment details and delivery information.'
        })

        // Show success message for a few seconds before clearing cart
        setTimeout(() => {
          clearCart() // Clear the cart after showing success message

          // Update message to show next steps
          setSubmitMessage({
            type: 'success',
            message: 'Order submitted successfully! We will contact you soon with payment details and delivery information.\n\nYou can also contact us directly if you have any questions.'
          })
        }, 3000) // Show success for 3 seconds before clearing cart
      } else {
        setSubmitMessage({
          type: 'error',
          message: result.error || 'Failed to submit order. Please try again.'
        })
      }
    } catch (error) {
      console.error('Order submission error:', error)
      setSubmitMessage({
        type: 'error',
        message: 'Failed to submit order. Please check your connection and try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (cartState.items.length === 0) {
    return (
      <div className="py-16 px-4 bg-gray-50 min-h-screen">
        <div className="container mx-auto text-center max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Add some products to your cart before checking out.</p>
            <Link
              href="/shop"
              className="bg-brand-burnt-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-burnt-orange-light transition-colors duration-300 inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 px-4 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        {/* Checkout Header - Security assurance and form introduction */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg mb-4 border-4 border-green-200">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">Secure Checkout</h1>
          <p className="text-gray-700 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            <span className="inline-flex items-center gap-1">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Your information is protected with enterprise-grade security
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Order Summary - Displays cart contents and total */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Order Summary
              </h2>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              {cartState.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 sm:gap-4 p-3 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg border border-gray-200">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 border-2 border-gray-200">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-sm sm:text-base truncate">{item.name}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">₦{item.price.toLocaleString()} × {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800 text-sm sm:text-base">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}

              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
                  <span className="text-gray-800">Total:</span>
                  <span className="bg-gradient-to-r from-brand-burnt-orange to-red-500 bg-clip-text text-transparent">₦{cartState.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form - Customer information collection */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-brand-burnt-orange to-red-500 text-white p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Customer Information
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {submitMessage && (
                <div className={`p-6 rounded-lg border-2 ${submitMessage.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                  <div className="flex items-start gap-3">
                    {submitMessage.type === 'success' ? (
                      <svg className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-lg mb-2">
                        {submitMessage.type === 'success' ? 'Order Submitted Successfully!' : 'Submission Failed'}
                      </p>
                      <p className="whitespace-pre-line leading-relaxed mb-4">{submitMessage.message}</p>

                      {submitMessage.type === 'success' && (
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link
                            href="/shop"
                            className="bg-brand-burnt-orange text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-burnt-orange-light transition-colors duration-200 text-center flex items-center justify-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                            Continue Shopping
                          </Link>
                          <Link
                            href="/contact"
                            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 text-center flex items-center justify-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            Contact Us
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Personal Information - Contact details collection */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Personal Details</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-brand-burnt-orange transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-500"
                        placeholder="Enter your full name (e.g., John Doe)"
                      />
                      <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-brand-burnt-orange transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-500"
                        placeholder="your.email@example.com"
                      />
                      <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-brand-burnt-orange transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-500"
                      placeholder="08012345678 or +2348012345678"
                    />
                    <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Delivery Address - Shipping information collection */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Delivery Address</h3>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-brand-burnt-orange transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-500"
                      placeholder="123 Main Street, Apartment 4B, Building Name"
                    />
                    <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-brand-burnt-orange transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-500"
                      placeholder="Lagos"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-brand-burnt-orange transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-500"
                      placeholder="Lagos State"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-brand-burnt-orange transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-500"
                      placeholder="100001"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information - Optional preferences and instructions */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Additional Information</h3>

                <div>
                  <label htmlFor="deliveryInstructions" className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Instructions <span className="text-gray-500 text-xs">(Optional)</span>
                  </label>
                  <textarea
                    id="deliveryInstructions"
                    name="deliveryInstructions"
                    rows={3}
                    value={formData.deliveryInstructions}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-brand-burnt-orange transition-all duration-200 bg-gray-50 focus:bg-white text-gray-800 placeholder-gray-500 resize-none"
                    placeholder="Special delivery instructions, preferred delivery time, or any other notes..."
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Payment Method <span className="text-gray-500 text-xs">(We&apos;ll contact you with details)</span>
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:border-brand-burnt-orange transition-colors duration-200">
                      <input
                        type="radio"
                        id="contact"
                        name="paymentMethod"
                        value="contact"
                        checked={formData.paymentMethod === 'contact'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-brand-burnt-orange focus:ring-brand-burnt-orange border-gray-300"
                      />
                      <label htmlFor="contact" className="ml-3 flex-1">
                        <span className="font-medium text-gray-800">Contact me for payment details</span>
                        <p className="text-sm text-gray-600">Recommended - We&apos;ll call you with payment options</p>
                      </label>
                    </div>
                    <div className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:border-brand-burnt-orange transition-colors duration-200">
                      <input
                        type="radio"
                        id="bank_transfer"
                        name="paymentMethod"
                        value="bank_transfer"
                        checked={formData.paymentMethod === 'bank_transfer'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-brand-burnt-orange focus:ring-brand-burnt-orange border-gray-300"
                      />
                      <label htmlFor="bank_transfer" className="ml-3 flex-1">
                        <span className="font-medium text-gray-800">I&apos;ll make bank transfer</span>
                        <p className="text-sm text-gray-600">Bank details will be provided after order confirmation</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button - Order finalization and processing */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-lg text-white transition-all duration-300 shadow-lg min-h-[56px] ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-brand-burnt-orange hover:bg-green-600 hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing Your Order...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span>Submit Order</span>
                    </div>
                  )}
                </button>

                <div className="mt-4 text-center">
                  <Link
                    href="/cart"
                    className="text-brand-burnt-orange hover:text-red-500 font-medium transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Cart
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
