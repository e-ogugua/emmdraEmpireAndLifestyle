'use client'

import { useCart } from '@/lib/cart-context'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { state: cartState, updateQuantity, removeFromCart, clearCart } = useCart()

  if (cartState.items.length === 0) {
    return (
      <div className="py-8 sm:py-16 px-4 bg-gray-50 min-h-screen">
        <div className="container mx-auto text-center max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="text-4xl sm:text-6xl mb-4">🛒</div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Add some products to your cart before checking out.</p>
            <Link
              href="/shop"
              className="bg-brand-burnt-orange text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-brand-burnt-orange-light transition-colors duration-300 inline-flex items-center gap-2 min-h-[48px]"
            >
              <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    <div className="py-8 sm:py-16 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">Shopping Cart</h1>

          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
            {/* Cart Items */}
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              {cartState.items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50/50">
                  <div className="w-full sm:w-16 h-32 sm:h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 w-full">
                    <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-1 line-clamp-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-2">₦{item.price.toLocaleString()}</p>

                    {/* Mobile: Stack controls vertically */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
                      <div className="flex items-center gap-3 bg-white rounded-lg p-2 shadow-sm border">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 bg-white hover:bg-red-50 border-2 border-gray-300 hover:border-red-400 rounded-full flex items-center justify-center text-gray-700 hover:text-red-600 font-bold text-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 min-w-[44px]"
                        >
                          −
                        </button>
                        <span className="w-12 sm:w-10 text-center font-bold text-lg text-gray-800 bg-gray-50 rounded-md py-2 px-3 border-2 border-gray-200 min-w-[48px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 bg-white hover:bg-green-50 border-2 border-gray-300 hover:border-green-400 rounded-full flex items-center justify-center text-gray-700 hover:text-green-600 font-bold text-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 min-w-[44px]"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-left sm:text-right sm:ml-auto">
                        <p className="font-bold text-gray-800 text-base sm:text-lg">₦{(item.price * item.quantity).toLocaleString()}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm mt-1 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t border-gray-200 pt-4 sm:pt-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
                <span className="text-lg sm:text-xl font-bold text-gray-800">Total:</span>
                <span className="text-xl sm:text-2xl font-bold text-brand-burnt-orange">₦{cartState.total.toLocaleString()}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={clearCart}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 sm:py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300 min-h-[48px] text-center"
                >
                  Clear Cart
                </button>
                <Link
                  href="/checkout"
                  className="flex-1 bg-brand-burnt-orange text-white py-3 sm:py-3 px-6 rounded-lg font-semibold hover:bg-brand-burnt-orange-light transition-colors duration-300 text-center min-h-[48px] flex items-center justify-center"
                >
                  Proceed to Checkout →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
