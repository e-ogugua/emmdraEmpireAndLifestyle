import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

interface Product {
  id: number
  name: string
  short_description: string
  description: string
  price: number
  image_url: string
  category: string
  featured: boolean
  in_stock: boolean
  created_at?: string
  updated_at?: string
}

export async function GET() {
  try {
    console.log('🛒 API: Fetching products...')

    // Try to fetch from database first
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('❌ API Error fetching products:', error)

      // Return fallback static products if database fails
      const fallbackProducts = [
        {
          id: 1,
          name: 'Premium Leather Handbag',
          short_description: 'Elegant genuine leather handbag with multiple compartments',
          description: 'Handcrafted from premium Nigerian leather with attention to detail. Features multiple compartments and adjustable strap.',
          price: 45000,
          image_url: '/images/PremiumLeatherHandbags.png', // Fixed filename
          category: 'Accessories',
          featured: true,
          in_stock: true
        },
        {
          id: 2,
          name: 'Natural Hair Oil',
          short_description: 'Organic hair treatment with coconut and jojoba oils',
          description: 'Organic hair oil blend for healthy, shiny hair. Contains coconut, jojoba, and argan oils.',
          price: 12000,
          image_url: '/images/NaturalHairOil.png',
          category: 'Beauty',
          featured: false,
          in_stock: true
        },
        {
          id: 3,
          name: 'Ankara Print Blouse',
          short_description: 'Traditional meets modern with contemporary cut',
          description: 'Beautiful Ankara print blouse with contemporary cut. Perfect for office or casual wear.',
          price: 15000,
          image_url: '/images/AnkaraPrintBlouses.png',
          category: 'Fashion',
          featured: false,
          in_stock: true
        },
        {
          id: 4,
          name: 'Statement Earrings',
          short_description: 'Bold and beautiful earrings that add glamour',
          description: 'Eye-catching statement earrings that add glamour to any outfit. Available in gold and silver.',
          price: 8500,
          image_url: '/images/StatementEarrings.png',
          category: 'Accessories',
          featured: false,
          in_stock: true
        }
      ]

      return NextResponse.json({
        products: fallbackProducts,
        count: fallbackProducts.length,
        fallback: true,
        error: 'Database connection failed, using fallback products'
      })
    }

    // Fix image URL for Premium Leather Handbag if it has the wrong filename
    const fixedProducts = (data || []).map((product: Product) => {
      if (product.name === 'Premium Leather Handbag' && product.image_url === '/images/PremiumLeatherHandBags.png') {
        return {
          ...product,
          image_url: '/images/PremiumLeatherHandbags.png' // Fix the filename
        }
      }
      return product
    })

    console.log('✅ API: Products fetched successfully:', fixedProducts?.length || 0, 'products')

    return NextResponse.json({
      products: fixedProducts,
      count: fixedProducts?.length || 0,
      fallback: false
    })
  } catch (error) {
    console.error('❌ API: Unexpected error:', error)

    // Return fallback products on any error
    const fallbackProducts = [
      {
        id: 1,
        name: 'Premium Leather Handbag',
        short_description: 'Elegant genuine leather handbag with multiple compartments',
        description: 'Handcrafted from premium Nigerian leather with attention to detail. Features multiple compartments and adjustable strap.',
        price: 45000,
        image_url: '/images/PremiumLeatherHandbags.png',
        category: 'Accessories',
        featured: true,
        in_stock: true
      }
    ]

    return NextResponse.json({
      products: fallbackProducts,
      count: fallbackProducts.length,
      fallback: true,
      error: 'Unexpected error occurred, using fallback products'
    })
  }
}
