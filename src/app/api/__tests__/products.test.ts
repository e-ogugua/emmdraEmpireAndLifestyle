import { NextRequest } from 'next/server'
import { GET } from '@/app/api/products/route'

// Mock the supabase client
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn(() => ({
          data: [
            {
              id: 1,
              name: 'Premium Leather Handbag',
              short_description: 'Elegant genuine leather handbag',
              description: 'Handcrafted from premium Nigerian leather',
              price: 45000,
              image_url: '/images/PremiumLeatherHandbags.png',
              category: 'Accessories',
              featured: true,
              in_stock: true,
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z'
            }
          ],
          error: null
        }))
      }))
    }))
  }
}))

describe('/api/products', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('should return products from database successfully', async () => {
      const request = new NextRequest('http://localhost:3000/api/products')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('products')
      expect(data).toHaveProperty('count')
      expect(data).toHaveProperty('fallback', false)
      expect(Array.isArray(data.products)).toBe(true)
      expect(data.products.length).toBeGreaterThan(0)
    })

    it('should return fallback products when database fails', async () => {
      // Mock database error
      const { supabase } = require('@/lib/supabase')
      supabase.from.mockReturnValue({
        select: jest.fn(() => ({
          order: jest.fn(() => ({
            data: null,
            error: { message: 'Database connection failed' }
          }))
        }))
      })

      const request = new NextRequest('http://localhost:3000/api/products')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('fallback', true)
      expect(data).toHaveProperty('error')
      expect(data.products).toHaveLength(4) // Fallback products count
    })

    it('should handle unexpected errors gracefully', async () => {
      // Mock unexpected error
      const { supabase } = require('@/lib/supabase')
      supabase.from.mockImplementation(() => {
        throw new Error('Unexpected database error')
      })

      const request = new NextRequest('http://localhost:3000/api/products')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toHaveProperty('fallback', true)
      expect(data).toHaveProperty('error')
      expect(data.products).toHaveLength(1) // Single fallback product
    })

    it('should set appropriate cache headers for successful response', async () => {
      const request = new NextRequest('http://localhost:3000/api/products')
      const response = await GET(request)

      expect(response.headers.get('Cache-Control')).toBe('public, s-maxage=300, stale-while-revalidate=600')
      expect(response.headers.get('CDN-Cache-Control')).toBe('public, max-age=300')
      expect(response.headers.get('Vercel-CDN-Cache-Control')).toBe('public, max-age=300')
    })

    it('should set shorter cache headers for fallback response', async () => {
      // Mock database error
      const { supabase } = require('@/lib/supabase')
      supabase.from.mockReturnValue({
        select: jest.fn(() => ({
          order: jest.fn(() => ({
            data: null,
            error: { message: 'Database error' }
          }))
        }))
      })

      const request = new NextRequest('http://localhost:3000/api/products')
      const response = await GET(request)

      expect(response.headers.get('Cache-Control')).toBe('public, s-maxage=60, stale-while-revalidate=120')
    })

    it('should fix image URL for Premium Leather Handbag', async () => {
      const request = new NextRequest('http://localhost:3000/api/products')
      const response = await GET(request)
      const data = await response.json()

      const handbagProduct = data.products.find((p: any) => p.name === 'Premium Leather Handbag')
      expect(handbagProduct.image_url).toBe('/images/PremiumLeatherHandbags.png')
    })
  })
})

describe('/api/cart', () => {
  describe('GET', () => {
    it('should return empty cart initially', async () => {
      const { GET } = await import('@/app/api/cart/route')
      const request = new NextRequest('http://localhost:3000/api/cart')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual({
        items: [],
        total: 0,
        itemCount: 0,
        currency: 'NGN'
      })
    })
  })

  describe('POST', () => {
    it('should add item to cart', async () => {
      const { POST } = await import('@/app/api/cart/route')
      const request = new NextRequest('http://localhost:3000/api/cart', {
        method: 'POST',
        body: JSON.stringify({
          product_id: '1',
          quantity: 2,
          name: 'Test Product',
          price: 1000,
          image_url: '/test.jpg'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.items).toHaveLength(1)
      expect(data.items[0].quantity).toBe(2)
      expect(data.items[0].product_id).toBe('1')
      expect(data.total).toBe(2000)
      expect(data.itemCount).toBe(2)
    })

    it('should update quantity of existing item', async () => {
      const { POST } = await import('@/app/api/cart/route')

      // First add item
      const request1 = new NextRequest('http://localhost:3000/api/cart', {
        method: 'POST',
        body: JSON.stringify({
          product_id: '1',
          quantity: 1,
          name: 'Test Product',
          price: 1000,
          image_url: '/test.jpg'
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      await POST(request1)

      // Then add same item again
      const request2 = new NextRequest('http://localhost:3000/api/cart', {
        method: 'POST',
        body: JSON.stringify({
          product_id: '1',
          quantity: 1,
          name: 'Test Product',
          price: 1000,
          image_url: '/test.jpg'
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      const response = await POST(request2)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.items).toHaveLength(1)
      expect(data.items[0].quantity).toBe(2)
      expect(data.total).toBe(2000)
    })
  })

  describe('DELETE', () => {
    it('should remove item from cart', async () => {
      const { POST, DELETE } = await import('@/app/api/cart/route')

      // Add item first
      const addRequest = new NextRequest('http://localhost:3000/api/cart', {
        method: 'POST',
        body: JSON.stringify({
          product_id: '1',
          quantity: 1,
          name: 'Test Product',
          price: 1000,
          image_url: '/test.jpg'
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      await POST(addRequest)

      // Remove item
      const removeRequest = new NextRequest('http://localhost:3000/api/cart?product_id=1')
      const response = await DELETE(removeRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.items).toHaveLength(0)
      expect(data.total).toBe(0)
      expect(data.itemCount).toBe(0)
    })

    it('should clear entire cart when all=true', async () => {
      const { POST, DELETE } = await import('@/app/api/cart/route')

      // Add multiple items
      for (let i = 1; i <= 3; i++) {
        const request = new NextRequest('http://localhost:3000/api/cart', {
          method: 'POST',
          body: JSON.stringify({
            product_id: i.toString(),
            quantity: 1,
            name: `Product ${i}`,
            price: 1000,
            image_url: '/test.jpg'
          }),
          headers: { 'Content-Type': 'application/json' }
        })
        await POST(request)
      }

      // Clear all
      const clearRequest = new NextRequest('http://localhost:3000/api/cart?all=true')
      const response = await DELETE(clearRequest)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.items).toHaveLength(0)
      expect(data.total).toBe(0)
      expect(data.itemCount).toBe(0)
    })
  })
})

describe('Error Handling', () => {
  describe('Invalid Requests', () => {
    it('should handle invalid JSON in POST request', async () => {
      const { POST } = await import('@/app/api/cart/route')
      const request = new NextRequest('http://localhost:3000/api/cart', {
        method: 'POST',
        body: 'invalid-json',
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      expect(response.status).toBe(400)
    })

    it('should handle missing required fields', async () => {
      const { POST } = await import('@/app/api/cart/route')
      const request = new NextRequest('http://localhost:3000/api/cart', {
        method: 'POST',
        body: JSON.stringify({
          product_id: '1',
          // missing quantity, name, price, image_url
        }),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      expect(response.status).toBe(400)
    })
  })

  describe('Database Connection', () => {
    it('should handle Supabase connection timeout', async () => {
      // Mock timeout error
      const { supabase } = require('@/lib/supabase')
      supabase.from.mockReturnValue({
        select: jest.fn(() => ({
          order: jest.fn(() => new Promise((resolve) => {
            setTimeout(() => resolve({ data: null, error: { message: 'Connection timeout' } }), 100)
          }))
        }))
      })

      const { GET } = await import('@/app/api/products/route')
      const request = new NextRequest('http://localhost:3000/api/products')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.fallback).toBe(true)
    })
  })
})

describe('API Response Format', () => {
  it('should return consistent response structure', async () => {
    const { GET } = await import('@/app/api/products/route')
    const request = new NextRequest('http://localhost:3000/api/products')
    const response = await GET(request)
    const data = await response.json()

    // Check required fields
    expect(data).toHaveProperty('products')
    expect(data).toHaveProperty('count')
    expect(data).toHaveProperty('fallback')

    // Check products array structure
    if (data.products.length > 0) {
      const product = data.products[0]
      expect(product).toHaveProperty('id')
      expect(product).toHaveProperty('name')
      expect(product).toHaveProperty('price')
      expect(product).toHaveProperty('image_url')
      expect(product).toHaveProperty('category')
      expect(product).toHaveProperty('in_stock')
      expect(product).toHaveProperty('featured')
    }
  })

  it('should return proper HTTP status codes', async () => {
    const { GET } = await import('@/app/api/products/route')
    const request = new NextRequest('http://localhost:3000/api/products')
    const response = await GET(request)

    expect(response.status).toBe(200)
  })
})
