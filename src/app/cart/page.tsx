'use client'

import { useCart } from '@/lib/cart-context'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { state: cartState, updateQuantity, removeFromCart, clearCart } = useCart()

  if (cartState.items.length === 0) {
    return (
      <div className="py-16 px-4 bg-gray-50 min-h-screen">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-lg text-gray-600 mb-8">Add some products to get started!</p>
          <Link
            href="/shop"
            className="bg-brand-burnt-orange text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-burnt-orange-light transition-colors duration-300 inline-flex items-center gap-2"
          >
            🛍️ Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Cart Items */}
            <div className="space-y-6 mb-8">
              {cartState.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">₦{item.price.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-gray-800">₦{(item.price * item.quantity).toLocaleString()}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-brand-burnt-orange">₦{cartState.total.toLocaleString()}</span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300"
                >
                  Clear Cart
                </button>
                <Link
                  href="/checkout"
                  className="flex-1 bg-brand-burnt-orange text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-burnt-orange-light transition-colors duration-300 text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
