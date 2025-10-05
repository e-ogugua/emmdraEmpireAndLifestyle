'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import ProductList from '@/components/admin/ProductList'
import ProductForm from '@/components/admin/ProductForm'
import AnalyticsDashboard from '@/components/admin/analytics/AnalyticsDashboard'

interface Product {
  id: number
  name: string
  short_description: string
  description: string
  price: number
  image_url: string
  created_at: string
  updated_at: string
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'analytics' | 'list' | 'add' | 'edit'>('analytics')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Check authentication and authorization
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
          window.location.href = '/admin/login'
          return
        }

        // Check if user is authorized (Emmanuel or Chidera)
        const allowedEmails = ['emmanuel@example.com', 'chidera@example.com']
        if (!allowedEmails.includes(user.email || '')) {
          setError('Access denied. You are not authorized to access this dashboard.')
          return
        }

        setUser(user)
        fetchProducts()
      } catch (err) {
        console.error('Auth error:', err)
        setError('Authentication failed')
      }
    }

    checkAuth()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single()

      if (error) throw error

      setProducts([data, ...products])
      setActiveTab('list')
    } catch (err) {
      console.error('Error adding product:', err)
      throw new Error('Failed to add product')
    }
  }

  const handleUpdateProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    if (!editingProduct) return

    try {
      const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingProduct.id)
        .select()
        .single()

      if (error) throw error

      setProducts(products.map(p => p.id === editingProduct.id ? data : p))
      setEditingProduct(null)
      setActiveTab('list')
    } catch (err) {
      console.error('Error updating product:', err)
      throw new Error('Failed to update product')
    }
  }

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)

      if (error) throw error

      setProducts(products.filter(p => p.id !== productId))
    } catch (err) {
      console.error('Error deleting product:', err)
      alert('Failed to delete product')
    }
  }

  const startEdit = (product: Product) => {
    setEditingProduct(product)
    setActiveTab('edit')
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Homepage
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
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.email}</p>
            </div>
            <button
              onClick={() => supabase.auth.signOut()}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-2 font-medium ${
                activeTab === 'analytics'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📊 Analytics
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`py-4 px-2 font-medium ${
                activeTab === 'list'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              View Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`py-4 px-2 font-medium ${
                activeTab === 'add'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Add Product
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'analytics' && <AnalyticsDashboard />}

        {activeTab === 'list' && (
          <ProductList
            products={products}
            loading={loading}
            onEdit={startEdit}
            onDelete={handleDeleteProduct}
            onRefresh={fetchProducts}
          />
        )}

        {(activeTab === 'add' || activeTab === 'edit') && (
          <ProductForm
            product={editingProduct}
            onSubmit={activeTab === 'edit' ? handleUpdateProduct : handleAddProduct}
            onCancel={() => {
              setActiveTab('list')
              setEditingProduct(null)
            }}
            isEditing={activeTab === 'edit'}
          />
        )}
      </div>
    </div>
  )
}
