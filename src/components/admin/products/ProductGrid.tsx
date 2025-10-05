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

interface ProductGridProps {
  products: Product[]
  loading: boolean
  onEdit: (product: Product) => void
  onDelete: (productId: number) => void
  onRefresh: () => void
}

export default function ProductGrid({ products, loading, onEdit, onDelete, onRefresh }: ProductGridProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">All Products</h2>
        <button
          onClick={onRefresh}
          className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="p-8 text-center">
          <div className="text-gray-500 mb-4">
            <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-gray-600">No products to display</p>
        </div>
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-white bg-opacity-90 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                      ₦{product.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.short_description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
