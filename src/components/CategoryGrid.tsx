interface Category {
  id: string
  title: string
  image: string
  link: string
}

const categories: Category[] = [
  {
    id: 'adult-wears',
    title: 'Adult Wears & Fashion',
    image: '/images/AdultWearsAndFashion.png',
    link: '/shop'
  },
  {
    id: 'kiddies',
    title: 'Kiddies',
    image: '/images/Kiddies.png',
    link: '/shop'
  },
  {
    id: 'accessories',
    title: 'Accessories',
    image: '/images/Accessories.png',
    link: '/shop'
  },
  {
    id: 'beauty-hub',
    title: 'Beauty Hub',
    image: '/images/beautyHub.png',
    link: '/shop'
  },
  {
    id: 'workshops',
    title: 'Workshops & Training',
    image: '/images/workshopsAndTraning.png',
    link: '/shop'
  }
]

export default function CategoryGrid() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of fashion, accessories, and lifestyle products
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.link}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white"
            >
              {/* Category Image Container */}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30" />

                {/* Category Title */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-bold text-lg md:text-xl text-center px-4 drop-shadow-lg">
                    {category.title}
                  </h3>
                </div>
              </div>

              {/* Hover Effect Indicator */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white transition-all duration-300 rounded-lg" />
            </a>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <a
            href="/shop"
            className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors duration-300"
          >
            View All Categories
          </a>
        </div>
      </div>
    </section>
  )
}
