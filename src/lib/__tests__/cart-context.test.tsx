import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { CartProvider, useCart } from '@/lib/cart-context'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Test component that uses the cart context
const TestComponent = () => {
  const { state, addToCart, removeFromCart, updateQuantity, clearCart } = useCart()

  return (
    <div>
      <div data-testid="cart-count">{state.itemCount}</div>
      <div data-testid="cart-total">{state.total}</div>
      <button onClick={() => addToCart({
        id: '1',
        name: 'Test Product',
        price: 100,
        image_url: '/test.jpg'
      })}>
        Add Item
      </button>
      <button onClick={() => updateQuantity('1', 2)}>
        Update Quantity
      </button>
      <button onClick={() => removeFromCart('1')}>
        Remove Item
      </button>
      <button onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  )
}

describe('Cart Context', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  describe('CartProvider', () => {
    it('should provide initial cart state', () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('0')
    })

    it('should load cart from localStorage on mount', () => {
      const savedCart = [
        { id: '1', name: 'Saved Product', price: 50, image_url: '/test.jpg', quantity: 2 }
      ]
      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedCart))

      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('100')
    })

    it('should handle localStorage parsing errors gracefully', () => {
      localStorageMock.getItem.mockReturnValue('invalid-json')
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to load cart from localStorage:',
        expect.any(Error)
      )
      expect(screen.getByTestId('cart-count')).toHaveTextContent('0')

      consoleSpy.mockRestore()
    })
  })

  describe('Cart Actions', () => {
    it('should add items to cart', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      const addButton = screen.getByText('Add Item')

      await act(async () => {
        fireEvent.click(addButton)
      })

      expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('100')
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'emmdra-cart',
        expect.stringContaining('"quantity":1')
      )
    })

    it('should update item quantity in cart', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      // Add item first
      await act(async () => {
        fireEvent.click(screen.getByText('Add Item'))
      })

      // Update quantity
      await act(async () => {
        fireEvent.click(screen.getByText('Update Quantity'))
      })

      expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('200')
    })

    it('should remove items from cart', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      // Add item first
      await act(async () => {
        fireEvent.click(screen.getByText('Add Item'))
      })

      expect(screen.getByTestId('cart-count')).toHaveTextContent('1')

      // Remove item
      await act(async () => {
        fireEvent.click(screen.getByText('Remove Item'))
      })

      expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('0')
    })

    it('should clear entire cart', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      // Add item first
      await act(async () => {
        fireEvent.click(screen.getByText('Add Item'))
      })

      expect(screen.getByTestId('cart-count')).toHaveTextContent('1')

      // Clear cart
      await act(async () => {
        fireEvent.click(screen.getByText('Clear Cart'))
      })

      expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('0')
    })

    it('should increment quantity when adding existing item', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      const addButton = screen.getByText('Add Item')

      // Add same item twice
      await act(async () => {
        fireEvent.click(addButton)
        fireEvent.click(addButton)
      })

      expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
      expect(screen.getByTestId('cart-total')).toHaveTextContent('200')
    })

    it('should remove item when quantity is set to 0', async () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      )

      // Add item first
      await act(async () => {
        fireEvent.click(screen.getByText('Add Item'))
      })

      // Set quantity to 0 (should remove item)
      const { updateQuantity } = useCart()

      await act(async () => {
        updateQuantity('1', 0)
      })

      expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
    })
  })

  describe('useCart Hook', () => {
    it('should throw error when used outside CartProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      expect(() => {
        render(<TestComponent />)
      }).toThrow('useCart must be used within a CartProvider')

      consoleSpy.mockRestore()
    })
  })

  describe('Edge Cases', () => {
    it('should handle decimal prices correctly', async () => {
      const TestDecimalComponent = () => {
        const { addToCart, state } = useCart()

        return (
          <div>
            <div data-testid="cart-total">{state.total}</div>
            <button onClick={() => addToCart({
              id: 'decimal',
              name: 'Decimal Product',
              price: 99.99,
              image_url: '/test.jpg'
            })}>
              Add Decimal Item
            </button>
          </div>
        )
      }

      render(
        <CartProvider>
          <TestDecimalComponent />
        </CartProvider>
      )

      await act(async () => {
        fireEvent.click(screen.getByText('Add Decimal Item'))
      })

      expect(screen.getByTestId('cart-total')).toHaveTextContent('99.99')
    })

    it('should handle large quantities correctly', async () => {
      const TestQuantityComponent = () => {
        const { addToCart, updateQuantity, state } = useCart()

        return (
          <div>
            <div data-testid="cart-count">{state.itemCount}</div>
            <button onClick={() => addToCart({
              id: 'bulk',
              name: 'Bulk Product',
              price: 10,
              image_url: '/test.jpg',
              quantity: 100
            })}>
              Add Bulk Item
            </button>
            <button onClick={() => updateQuantity('bulk', 1000)}>
              Update to 1000
            </button>
          </div>
        )
      }

      render(
        <CartProvider>
          <TestQuantityComponent />
        </CartProvider>
      )

      await act(async () => {
        fireEvent.click(screen.getByText('Add Bulk Item'))
      })

      expect(screen.getByTestId('cart-count')).toHaveTextContent('100')

      await act(async () => {
        fireEvent.click(screen.getByText('Update to 1000'))
      })

      expect(screen.getByTestId('cart-count')).toHaveTextContent('1000')
    })
  })
})
