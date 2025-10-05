import HeroCarousel from '../components/HeroCarousel'
import CategoryGrid from '../components/CategoryGrid'
import DiscoverMoreSection from '../components/DiscoverMoreSection'

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Carousel Section - Standalone */}
      <section className="relative" style={{ height: '100vh' }}>
        <HeroCarousel />
      </section>

      {/* Hero Text Section - Separate */}
      <section className="relative z-10 py-16 px-4 bg-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Welcome to Emmdra Empire
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            Discover amazing products, unleash your creativity with our tutorials, and find fashion that speaks to your soul.
            Your journey to creativity and style starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="bg-black text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors"
            >
              Shop Now
            </a>
            <a
              href="/diy"
              className="border border-black text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-black hover:text-white transition-colors"
            >
              Explore DIY
            </a>
          </div>
        </div>
      </section>

      {/* Category Preview Grid */}
      <CategoryGrid />

      {/* Discover More Section */}
      <DiscoverMoreSection />
    </div>
  )
}
