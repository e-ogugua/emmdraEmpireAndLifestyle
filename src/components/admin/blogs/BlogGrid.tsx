interface BlogPost {
  id: number
  title: string
  category: string
  excerpt: string
  content: string
  cover_image_url: string
  published_at: string
  created_at: string
  updated_at: string
}

import Image from 'next/image'

interface BlogGridProps {
  blogs: BlogPost[]
  loading: boolean
  onEdit: (blog: BlogPost) => void
  onDelete: (blogId: number) => void
  onRefresh: () => void
}

export default function BlogGrid({ blogs, loading, onEdit, onDelete, onRefresh }: BlogGridProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">All Blog Posts</h2>
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

      {/* Blogs Grid */}
      {blogs.length === 0 ? (
        <div className="p-8 text-center">
          <div className="text-gray-500 mb-4">
            <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-600">No blog posts to display</p>
        </div>
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                {/* Blog Cover Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.cover_image_url}
                    alt={blog.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      blog.category === 'Fashion' ? 'bg-pink-100 text-pink-800' :
                      blog.category === 'Family' ? 'bg-green-100 text-green-800' :
                      blog.category === 'Beauty' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="text-xs text-gray-500 mb-4">
                    {new Date(blog.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(blog)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(blog.id)}
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
