interface DIYTutorial {
  id: number
  title: string
  category: string
  difficulty: string
  excerpt: string
  steps: string[]
  cover_image_url: string
  created_at: string
  updated_at: string
}

interface DIYGridProps {
  tutorials: DIYTutorial[]
  loading: boolean
  onEdit: (tutorial: DIYTutorial) => void
  onDelete: (tutorialId: number) => void
  onRefresh: () => void
}

export default function DIYGrid({ tutorials, loading, onEdit, onDelete, onRefresh }: DIYGridProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading DIY tutorials...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">All DIY Tutorials</h2>
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

      {/* Tutorials Grid */}
      {tutorials.length === 0 ? (
        <div className="p-8 text-center">
          <div className="text-gray-500 mb-4">
            <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 8a9 9 0 110-18 9 9 0 010 18z" />
            </svg>
          </div>
          <p className="text-gray-600">No DIY tutorials to display</p>
        </div>
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((tutorial) => (
              <div key={tutorial.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
                {/* Tutorial Cover Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={tutorial.cover_image_url}
                    alt={tutorial.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      tutorial.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      tutorial.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {tutorial.difficulty}
                    </span>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                      {tutorial.category}
                    </span>
                  </div>
                </div>

                {/* Tutorial Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {tutorial.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {tutorial.excerpt}
                  </p>

                  <div className="text-xs text-gray-500 mb-4">
                    {tutorial.steps.length} steps • {new Date(tutorial.created_at).toLocaleDateString()}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(tutorial)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(tutorial.id)}
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
