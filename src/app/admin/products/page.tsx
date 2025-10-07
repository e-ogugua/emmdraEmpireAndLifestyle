'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import AdminLayout from '@/components/AdminLayout'
import { trackPageView } from '@/lib/analytics'

interface Product {
  id: number
  name: string
  price: number
  category: string
  image_url: string
  featured: boolean
  in_stock: boolean
  created_at: string
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchProducts()
    trackPageView({ page_type: 'product' })
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
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error

      // Refresh the products list
      fetchProducts()
    } catch (err) {
      console.error('Error deleting product:', err)
      alert('Failed to delete product. Please try again.')
    }
  }

  const toggleFeatured = async (id: number, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ featured: !currentFeatured })
        .eq('id', id)

      if (error) throw error

      fetchProducts()
    } catch (err) {
      console.error('Error updating product:', err)
      alert('Failed to update product. Please try again.')
    }
  }

  const toggleStock = async (id: number, currentStock: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ in_stock: !currentStock })
        .eq('id', id)

      if (error) throw error

      fetchProducts()
    } catch (err) {
      console.error('Error updating product:', err)
      alert('Failed to update product. Please try again.')
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]

  return (
    <AdminLayout currentPage="products">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
            <p className="text-gray-600 mt-1">Manage your product catalog</p>
          </div>
          <Link
            href="/admin/products/new"
            className="mt-4 sm:mt-0 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Product
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-xl">🛍️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-xl">⭐</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.featured).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <span className="text-xl">📦</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">In Stock</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.in_stock).length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-xl">🏷️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{new Set(products.map(p => p.category)).size}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.filter(cat => cat !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0">
                            <Image
                              className="h-12 w-12 rounded-lg object-cover"
                              src={product.image_url}
                              alt={product.name}
                              width={48}
                              height={48}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">ID: {product.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₦{product.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => toggleFeatured(product.id, product.featured)}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.featured
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {product.featured ? '⭐ Featured' : '☆ Not Featured'}
                          </button>
                          <button
                            onClick={() => toggleStock(product.id, product.in_stock)}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.in_stock
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {product.in_stock ? '📦 In Stock' : '❌ Out of Stock'}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedCategory !== 'all'
                  ? 'No products match your search criteria.'
                  : 'No products found. Add your first product to get started.'}
              </p>
              <Link
                href="/admin/products/new"
                className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Add First Product
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
