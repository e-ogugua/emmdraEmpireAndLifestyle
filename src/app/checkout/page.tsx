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
          message: '🎉 Order submitted successfully! We will contact you soon with payment details and delivery information.'
        })
        clearCart() // Clear the cart after successful order

        // Scroll to success message
        setTimeout(() => {
          const messageElement = document.getElementById('submit-message')
          messageElement?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
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
            <div className="text-6xl mb-4">🛒</div>
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
    <div className="py-8 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Checkout</h1>
          <p className="text-gray-600">Complete your order by filling out the form below</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartState.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm">{item.name}</h3>
                    <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                <span>Total:</span>
                <span className="text-brand-burnt-orange">₦{cartState.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Customer Information</h2>

            {submitMessage && (
              <div id="submit-message" className={`mb-6 p-4 rounded-lg ${submitMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {submitMessage.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-transparent"
                  placeholder="08012345678"
                />
              </div>

              {/* Delivery Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-transparent"
                  placeholder="Street address, building, apartment"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-transparent"
                    placeholder="Lagos"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-transparent"
                    placeholder="Lagos"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-transparent"
                    placeholder="100001"
                  />
                </div>
              </div>

              {/* Delivery Instructions */}
              <div>
                <label htmlFor="deliveryInstructions" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Instructions (Optional)
                </label>
                <textarea
                  id="deliveryInstructions"
                  name="deliveryInstructions"
                  rows={3}
                  value={formData.deliveryInstructions}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-burnt-orange focus:border-transparent"
                  placeholder="Any special delivery instructions..."
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="contact"
                      checked={formData.paymentMethod === 'contact'}
                      onChange={handleInputChange}
                      className="text-brand-burnt-orange focus:ring-brand-burnt-orange"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Contact me for payment details (recommended)
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === 'bank_transfer'}
                      onChange={handleInputChange}
                      className="text-brand-burnt-orange focus:ring-brand-burnt-orange"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      I will make bank transfer
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-brand-burnt-orange hover:bg-brand-burnt-orange-light'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing Order...
                  </div>
                ) : (
                  'Submit Order'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/cart"
                className="text-brand-burnt-orange hover:text-brand-burnt-orange-light font-medium"
              >
                ← Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
