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

interface ProductListProps {
  products: Product[]
  loading: boolean
  onEdit: (product: Product) => void
  onDelete: (productId: number) => void
  onRefresh: () => void
}

export default function ProductList({ products, loading, onEdit, onDelete, onRefresh }: ProductListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Refresh Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Products Management</h2>
        <button
          onClick={onRefresh}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">Get started by adding your first product.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.short_description}
                </p>

                <p className="text-xl font-bold text-gray-800 mb-4">
                  ₦{product.price.toLocaleString()}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{products.length}</div>
            <div className="text-gray-600">Total Products</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              ₦{products.reduce((sum, p) => sum + p.price, 0).toLocaleString()}
            </div>
            <div className="text-gray-600">Total Value</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              ₦{products.length > 0 ? Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length).toLocaleString() : '0'}
            </div>
            <div className="text-gray-600">Avg Price</div>
          </div>
        </div>
      </div>
    </div>
  )
}
