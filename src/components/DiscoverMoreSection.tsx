interface DiscoverCard {
  id: string
  title: string
  image: string
  link: string
}

const discoverCards: DiscoverCard[] = [
  {
    id: 'blog',
    title: 'Read Our Blog',
    image: '/images/EmmdraBlog.png',
    link: '/blog'
  },
  {
    id: 'story',
    title: 'Our Story',
    image: '/images/EmmdraOurStory.JPG',
    link: '/about'
  }
]

export default function DiscoverMoreSection() {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Discover More
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Learn more about our journey and explore our latest insights.
          </p>
        </div>

        {/* Discover Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {discoverCards.map((card) => (
            <a
              key={card.id}
              href={card.link}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white"
            >
              {/* Card Image Container */}
              <div className="relative w-full h-64 md:h-80 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                {/* Card Title */}
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <h3 className="text-white font-bold text-xl md:text-2xl lg:text-3xl text-center px-6 drop-shadow-lg">
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* Hover Effect Indicator */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white transition-all duration-300 rounded-xl" />
            </a>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-12">
          <a
            href="/contact"
            className="inline-block bg-gray-800 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-700 transition-colors duration-300"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  )
}
