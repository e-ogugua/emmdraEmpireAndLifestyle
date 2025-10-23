import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ProductCard from '@/components/ProductCard'

const mockProduct = {
  id: 'test-product-1',
  name: 'Premium Leather Handbag',
  price: 45000,
  image: '/images/handbag.png',
  description: 'Elegant genuine leather handbag with multiple compartments and adjustable strap',
  badge: 'Featured',
  badgeColor: 'bg-brand-burnt-orange',
  link: '/shop/handbag',
  buttonText: 'Shop Now',
  buttonColor: 'bg-brand-dark-teal'
}

describe('ProductCard', () => {
  describe('Rendering', () => {
    it('should render product information correctly', () => {
      render(<ProductCard {...mockProduct} />)

      // Check product name
      expect(screen.getByText('Premium Leather Handbag')).toBeInTheDocument()

      // Check description
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument()

      // Check price formatting
      expect(screen.getByText('₦45,000')).toBeInTheDocument()

      // Check button text
      expect(screen.getByText('Shop Now')).toBeInTheDocument()

      // Check badge
      expect(screen.getByText('Featured')).toBeInTheDocument()
    })

    it('should render without optional badge', () => {
      const productWithoutBadge = { ...mockProduct, badge: undefined }

      render(<ProductCard {...productWithoutBadge} />)

      expect(screen.getByText('Premium Leather Handbag')).toBeInTheDocument()
      expect(screen.queryByText('Featured')).not.toBeInTheDocument()
    })

    it('should use default values for optional props', () => {
      const minimalProduct = {
        id: 'minimal',
        name: 'Minimal Product',
        price: 1000,
        image: '/test.jpg',
        description: 'Simple product',
        link: '/shop/minimal'
      }

      render(<ProductCard {...minimalProduct} />)

      expect(screen.getByText('Shop')).toBeInTheDocument()
      expect(screen.queryByText('Featured')).not.toBeInTheDocument()
    })

    it('should format price correctly for different amounts', () => {
      const products = [
        { ...mockProduct, price: 1000 },
        { ...mockProduct, price: 100000 },
        { ...mockProduct, price: 1000000 }
      ]

      products.forEach((product) => {
        const { unmount } = render(<ProductCard {...product} />)
        expect(screen.getByText(`₦${product.price.toLocaleString()}`)).toBeInTheDocument()
        unmount()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper alt text for images', () => {
      render(<ProductCard {...mockProduct} />)

      const image = screen.getByAltText('Product: Premium Leather Handbag')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', mockProduct.image)
    })

    it('should have accessible price label', () => {
      render(<ProductCard {...mockProduct} />)

      const priceElement = screen.getByLabelText('Price: 45,000 Naira')
      expect(priceElement).toBeInTheDocument()
      expect(priceElement).toHaveTextContent('₦45,000')
    })

    it('should have accessible button with descriptive label', () => {
      render(<ProductCard {...mockProduct} />)

      const button = screen.getByLabelText('Shop Premium Leather Handbag for 45,000 Naira')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Shop Now')
    })

    it('should have proper heading structure', () => {
      render(<ProductCard {...mockProduct} />)

      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent('Premium Leather Handbag')
    })

    it('should have minimum 44px touch target for button', () => {
      render(<ProductCard {...mockProduct} />)

      const button = screen.getByRole('link')
      expect(button).toHaveClass('min-h-[44px]')
    })
  })

  describe('Responsive Design', () => {
    it('should apply responsive classes correctly', () => {
      render(<ProductCard {...mockProduct} />)

      // Check responsive padding classes
      const card = document.querySelector('[data-product-id]')
      expect(card).toHaveClass('p-responsive-3', 'sm:p-responsive-4')
    })

    it('should apply responsive typography classes', () => {
      render(<ProductCard {...mockProduct} />)

      const title = screen.getByRole('heading')
      expect(title).toHaveClass('text-responsive-sm', 'sm:text-responsive-base')

      const description = screen.getByText(mockProduct.description)
      expect(description).toHaveClass('text-responsive-sm')

      const price = screen.getByLabelText(/Price/)
      expect(price).toHaveClass('text-responsive-base', 'sm:text-responsive-lg')

      const button = screen.getByRole('link')
      expect(button).toHaveClass('text-responsive-xs', 'sm:text-responsive-sm')
    })

    it('should apply responsive spacing classes', () => {
      render(<ProductCard {...mockProduct} />)

      // Check responsive margin classes
      const badge = screen.getByText('Featured')
      expect(badge.parentElement).toHaveClass('top-responsive-2', 'left-responsive-2')
    })
  })

  describe('Interactive Features', () => {
    it('should have hover effects on card', () => {
      render(<ProductCard {...mockProduct} />)

      const card = document.querySelector('[data-product-id]')
      expect(card).toHaveClass('hover:shadow-xl', 'transition-all', 'duration-300')
    })

    it('should have hover effects on image', () => {
      render(<ProductCard {...mockProduct} />)

      const image = screen.getByAltText(/Product/)
      expect(image).toHaveClass('group-hover:scale-105', 'transition-transform', 'duration-300')
    })

    it('should have hover effects on button', () => {
      render(<ProductCard {...mockProduct} />)

      const button = screen.getByRole('link')
      expect(button).toHaveClass('hover:scale-105', 'hover:shadow-lg', 'transition-all', 'duration-300')
    })

    it('should navigate to correct link', () => {
      render(<ProductCard {...mockProduct} />)

      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', mockProduct.link)
    })
  })

  describe('Badge System', () => {
    it('should render badge with correct styling', () => {
      render(<ProductCard {...mockProduct} />)

      const badge = screen.getByText('Featured')
      expect(badge).toHaveClass(
        'bg-brand-burnt-orange',
        'text-white',
        'px-responsive-3',
        'py-1',
        'rounded-full',
        'text-responsive-xs',
        'font-bold',
        'shadow-md',
        'border',
        'border-current/50'
      )
    })

    it('should use default badge color when not specified', () => {
      const productWithDefaultBadge = {
        ...mockProduct,
        badge: 'New',
        badgeColor: undefined
      }

      render(<ProductCard {...productWithDefaultBadge} />)

      const badge = screen.getByText('New')
      expect(badge).toHaveClass('bg-brand-burnt-orange') // default color
    })

    it('should handle different badge colors', () => {
      const colors = ['bg-brand-burnt-orange', 'bg-brand-vibrant-green', 'bg-yellow-400']

      colors.forEach((color) => {
        const product = { ...mockProduct, badgeColor: color.replace('bg-', '') }
        const { unmount } = render(<ProductCard {...product} />)

        const badge = screen.getByText('Featured')
        expect(badge).toHaveClass(color)

        unmount()
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle missing image gracefully', () => {
      const productWithBrokenImage = {
        ...mockProduct,
        image: '/nonexistent-image.jpg'
      }

      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      render(<ProductCard {...productWithBrokenImage} />)

      const image = screen.getByAltText(/Product/)
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('src', '/nonexistent-image.jpg')

      consoleSpy.mockRestore()
    })

    it('should handle very long product names', () => {
      const longName = 'A'.repeat(200)
      const productWithLongName = {
        ...mockProduct,
        name: longName
      }

      render(<ProductCard {...productWithLongName} />)

      const heading = screen.getByRole('heading')
      expect(heading).toHaveClass('line-clamp-2')
      expect(heading).toHaveAttribute('title', longName)
    })

    it('should handle very long descriptions', () => {
      const longDescription = 'A'.repeat(500)
      const productWithLongDescription = {
        ...mockProduct,
        description: longDescription
      }

      render(<ProductCard {...productWithLongDescription} />)

      const description = screen.getByText(longDescription)
      expect(description).toHaveClass('line-clamp-2')
      expect(description).toHaveAttribute('title', longDescription)
    })
  })

  describe('Performance', () => {
    it('should be memoized to prevent unnecessary re-renders', () => {
      const { unmount } = render(<ProductCard {...mockProduct} />)

      // Re-render with same props
      unmount()
      render(<ProductCard {...mockProduct} />)

      // Component should not re-render due to memo
      expect(screen.getByText('Premium Leather Handbag')).toBeInTheDocument()
    })

    it('should have displayName for debugging', () => {
      expect(ProductCard.displayName).toBe('ProductCard')
    })
  })

  describe('Integration', () => {
    it('should work in a list of products', () => {
      const products = [
        mockProduct,
        { ...mockProduct, id: '2', name: 'Second Product' },
        { ...mockProduct, id: '3', name: 'Third Product' }
      ]

      render(
        <div>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )

      expect(screen.getByText('Premium Leather Handbag')).toBeInTheDocument()
      expect(screen.getByText('Second Product')).toBeInTheDocument()
      expect(screen.getByText('Third Product')).toBeInTheDocument()

      // All products should have proper data attributes
      products.forEach((product) => {
        expect(document.querySelector(`[data-product-id="${product.id}"]`)).toBeInTheDocument()
      })
    })
  })
})
