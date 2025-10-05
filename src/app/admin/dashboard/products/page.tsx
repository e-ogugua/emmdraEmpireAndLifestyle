'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import ProductGrid from '@/components/admin/products/ProductGrid'
import ProductFormModal from '@/components/admin/products/ProductFormModal'

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

type ModalMode = 'add' | 'edit' | null

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [modalMode, setModalMode] = useState<ModalMode>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)

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
      setModalMode(null)
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
      setModalMode(null)
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
    setModalMode('edit')
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.short_description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

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
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Products Management</h1>
              <p className="text-gray-600 mt-1">Manage your product catalog</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <button
                onClick={() => supabase.auth.signOut()}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Stats and Actions */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{products.length}</div>
                <div className="text-sm text-gray-600">Total Products</div>
              </div>
              <button
                onClick={() => setModalMode('add')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={paginatedProducts}
          loading={loading}
          onEdit={startEdit}
          onDelete={handleDeleteProduct}
          onRefresh={fetchProducts}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No products found' : 'No products yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? 'Try adjusting your search terms.'
                : 'Get started by adding your first product.'
              }
            </p>
            {!searchTerm && (
              <button
                onClick={() => setModalMode('add')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add First Product
              </button>
            )}
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {modalMode && (
        <ProductFormModal
          mode={modalMode}
          product={editingProduct}
          onSubmit={modalMode === 'edit' ? handleUpdateProduct : handleAddProduct}
          onClose={() => {
            setModalMode(null)
            setEditingProduct(null)
          }}
        />
      )}
    </div>
  )
}
