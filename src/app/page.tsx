'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import HeroCarousel from '../components/HeroCarousel'
import { trackPageView } from '@/lib/analytics'
import { logPageLoad } from '@/lib/performance'
import ProductCard from '@/components/ProductCard'
import DIYCard from '@/components/DIYCard'
import WorkshopCard from '@/components/WorkshopCard'
import BlogCard from '@/components/BlogCard'

export default function Home() {
  useEffect(() => {
    // Track homepage view for analytics
    trackPageView({
      page_type: 'home',
      page_title: 'Emmdra Empire - Developed by CEO (Chukwuka Emmanuel Ogugua) Homepage'
    })

    // Log page load performance
    logPageLoad('homepage')
  }, [])

  return (
    <div className="relative">
      {/* Hero Carousel Section - Displays main promotional content */}
      <section className="relative">
        <HeroCarousel />
      </section>

      {/* Hero Text Section - Main value proposition and call-to-action */}
      <section className="py-responsive-16 px-responsive-4 bg-gradient-to-br from-orange-100 via-yellow-50 to-green-100">
        <div className="container mx-auto text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-responsive-5xl text-gray-900 mb-responsive-6 font-bold drop-shadow-sm leading-tight">
              Discover Your <span className="text-brand-burnt-orange font-black drop-shadow-md">Style</span>, <span className="text-brand-vibrant-green font-black drop-shadow-md">Beauty</span> & <span className="text-brand-dark-teal font-black drop-shadow-md">Creativity</span>
            </h1>
            <p className="text-responsive-xl text-gray-800 max-w-4xl mx-auto mb-responsive-6 drop-shadow-sm leading-relaxed">
              At <strong className="text-brand-burnt-orange font-bold">Emmdra Empire</strong>, we believe every woman deserves to feel confident, beautiful, and inspired. Our curated collection brings together <strong className="text-brand-burnt-orange font-bold">authentic Nigerian fashion</strong>, <strong className="text-brand-vibrant-green font-bold">natural beauty solutions</strong>, and <strong className="text-brand-dark-teal font-bold">creative DIY projects</strong> that celebrate your unique journey.
            </p>
            <p className="text-responsive-lg text-gray-800 max-w-3xl mx-auto mb-responsive-12 drop-shadow-sm leading-relaxed">
              Whether you&apos;re a busy professional looking for effortless style, a mom seeking natural beauty routines, or someone wanting to unleash their creative side — we&apos;ve got everything you need to live your most beautiful life, Nigerian style.
            </p>

            {/* Category Navigation - Quick access to main content areas */}
            <div className="flex flex-wrap justify-center gap-responsive-3 mb-responsive-12">
              {[
                { name: 'Fashion', link: '/shop', color: 'bg-brand-burnt-orange text-white hover:bg-brand-burnt-orange-light border-2 border-brand-burnt-orange/50 shadow-lg hover:shadow-xl hover:scale-105 font-bold' },
                { name: 'Beauty', link: '/shop', color: 'bg-brand-vibrant-green text-white hover:bg-brand-vibrant-green-light border-2 border-brand-vibrant-green/50 shadow-lg hover:shadow-xl hover:scale-105 font-bold' },
                { name: 'DIY', link: '/diy', color: 'bg-brand-dark-teal text-white hover:bg-brand-dark-teal-light border-2 border-brand-dark-teal/50 shadow-lg hover:shadow-xl hover:scale-105 font-bold' },
                { name: 'Lifestyle', link: '/blog', color: 'bg-yellow-400 text-gray-900 hover:bg-yellow-300 border-2 border-yellow-600/70 shadow-lg hover:shadow-xl hover:scale-105 font-bold' },
                { name: 'Family', link: '/about', color: 'bg-purple-500 text-white hover:bg-purple-400 border-2 border-purple-600/60 shadow-lg hover:shadow-xl hover:scale-105 font-bold' }
              ].map((category) => (
                <Link
                  key={category.name}
                  href={category.link}
                  className={`${category.color} px-responsive-4 py-responsive-2 rounded-full text-sm transition-all duration-300 min-h-[44px] flex items-center justify-center backdrop-blur-sm`}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Primary Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-responsive-4 justify-center">
              <Link
                href="/shop"
                className="bg-brand-burnt-orange text-white font-black text-responsive-lg px-responsive-8 py-responsive-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-brand-burnt-orange/70 hover:border-orange-400 hover:bg-brand-burnt-orange-light min-h-[56px] flex items-center justify-center"
              >
                Shop Our Collection
              </Link>
              <Link
                href="/diy"
                className="bg-brand-vibrant-green text-white font-black text-responsive-lg px-responsive-8 py-responsive-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-brand-vibrant-green/70 hover:border-green-400 hover:bg-brand-vibrant-green-light min-h-[56px] flex items-center justify-center"
              >
                Start Creating
              </Link>
              <Link
                href="/blog"
                className="bg-brand-dark-teal text-white font-black text-responsive-lg px-responsive-8 py-responsive-4 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-brand-dark-teal/70 hover:border-blue-400 hover:bg-brand-dark-teal-light min-h-[56px] flex items-center justify-center"
              >
                Read Stories
              </Link>
            </div>

            {/* Trust Indicators - Social proof and credibility markers */}
            <div className="mt-responsive-12 pt-responsive-8 border-t border-brand-neutral-300">
              <p className="text-responsive-xl text-gray-900 mb-responsive-6 font-bold drop-shadow-sm">Trusted by over 5,000+ Nigerian families</p>
              <div className="flex flex-wrap justify-center items-center gap-responsive-6">
                <div className="flex items-center gap-2 bg-brand-vibrant-green/10 px-responsive-4 py-responsive-2 rounded-full border border-brand-vibrant-green/30">
                  <svg className="w-5 h-5 text-brand-vibrant-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-bold text-gray-900">Premium Quality</span>
                </div>
                <div className="flex items-center gap-2 bg-brand-dark-teal/10 px-responsive-4 py-responsive-2 rounded-full border border-brand-dark-teal/30">
                  <svg className="w-5 h-5 text-brand-dark-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-bold text-gray-900">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 bg-brand-burnt-orange/10 px-responsive-4 py-responsive-2 rounded-full border border-brand-burnt-orange/30">
                  <svg className="w-5 h-5 text-brand-burnt-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-bold text-gray-900">Expert Support</span>
                </div>
              </div>
              <div className="mt-responsive-6 text-center">
                <p className="text-sm text-gray-600"><span className="font-semibold text-brand-burnt-orange">4.9/5</span> from 2,847+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section - Showcase curated product selection */}
      <section className="py-responsive-16 px-responsive-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-responsive-8 sm:mb-responsive-10 lg:mb-responsive-12">
            <h2 className="text-responsive-4xl text-brand-neutral-900 mb-responsive-4 drop-shadow-sm">
              Featured <span className="text-brand-burnt-orange font-black">Products</span>
            </h2>
            <p className="text-responsive-lg text-brand-neutral-700 max-w-2xl mx-auto drop-shadow-sm">
              Discover our handpicked selection of premium fashion, beauty, and lifestyle essentials
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-responsive-4 sm:gap-responsive-6 mb-responsive-8 sm:mb-responsive-10">
            <ProductCard
              id="premium-leather-handbag"
              name="Premium Leather Handbag"
              price={45000}
              image="/images/PremiumLeatherHandbags.png"
              description="Elegant genuine leather handbag with multiple compartments"
              badge="Featured"
              badgeColor="bg-brand-burnt-orange"
              link="/shop"
            />

            <ProductCard
              id="natural-hair-oil"
              name="Natural Hair Oil"
              price={12000}
              image="/images/NaturalHairOil.png"
              description="Organic hair treatment with coconut and jojoba oils"
              link="/shop"
              buttonColor="bg-brand-vibrant-green"
            />

            <ProductCard
              id="ankara-print-blouse"
              name="Ankara Print Blouse"
              price={15000}
              image="/images/AnkaraPrintBlouses.png"
              description="Traditional meets modern with contemporary cut"
              link="/shop"
              buttonColor="bg-brand-burnt-orange"
            />

            <ProductCard
              id="statement-earrings"
              name="Statement Earrings"
              price={8500}
              image="/images/StatementEarrings.png"
              description="Bold geometric design perfect for special occasions"
              link="/shop"
              buttonColor="bg-brand-dark-teal"
            />
          </div>

          <div className="text-center">
            <Link
              href="/shop"
              className="bg-brand-burnt-orange text-white font-semibold text-responsive-base px-responsive-6 py-responsive-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-brand-burnt-orange hover:border-brand-burnt-orange-light min-h-[48px] flex items-center justify-center"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Featured DIY Projects Section - Creative tutorials and craft ideas */}
      <section className="py-responsive-16 px-responsive-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-responsive-12">
            <h2 className="text-responsive-4xl text-brand-neutral-900 mb-responsive-4 drop-shadow-sm">
              Featured <span className="text-brand-dark-teal font-black">DIY Projects</span>
            </h2>
            <p className="text-responsive-lg text-brand-neutral-700 max-w-2xl mx-auto drop-shadow-sm">
              Unleash your creativity with our step-by-step tutorials and craft ideas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-responsive-6 mb-responsive-8">
            <DIYCard
              id="handmade-beaded-necklace"
              name="Handmade Beaded Necklace"
              image="/images/HandmadeBeadedNecklace.png"
              description="Create beautiful jewelry with step-by-step guidance"
              badge="Popular"
              badgeColor="bg-brand-vibrant-green"
              link="/diy/handmade-beaded-necklace"
              level="Beginner"
              duration="45 min"
            />

            <DIYCard
              id="natural-hair-treatment-mask"
              name="Natural Hair Treatment"
              image="/images/NaturalHairTreatmentMask.png"
              description="DIY hair mask using natural ingredients"
              link="/diy/natural-hair-treatment-mask"
              level="Beginner"
              duration="30 min"
            />

            <DIYCard
              id="diy-ankara-throw-pillow"
              name="DIY Ankara Throw Pillow"
              image="/images/DIYAnkaraThrowPillow.png"
              description="Create beautiful home decor with Ankara fabric"
              link="/diy/diy-ankara-throw-pillow"
              level="Intermediate"
              duration="2 hrs"
            />
          </div>

          <div className="text-center">
            <Link
              href="/diy"
              className="bg-brand-dark-teal text-white font-semibold text-responsive-base px-responsive-6 py-responsive-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-brand-dark-teal hover:border-brand-dark-teal-light min-h-[48px] flex items-center justify-center"
            >
              Explore All DIY Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Workshops Section - Professional training and educational events */}
      <section className="py-responsive-16 px-responsive-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-responsive-12">
            <h2 className="text-responsive-4xl text-brand-neutral-900 mb-responsive-4 drop-shadow-sm">
              Featured <span className="text-brand-burnt-orange font-black">Workshops</span>
            </h2>
            <p className="text-responsive-lg text-brand-neutral-700 max-w-2xl mx-auto drop-shadow-sm">
              Join our hands-on workshops and learn from industry experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-responsive-6 mb-responsive-8">
            <WorkshopCard
              id="fashion-styling-masterclass"
              name="Fashion Styling Masterclass"
              image="/images/EmmdraFashionDesignAndAccessories.png"
              description="Learn professional styling techniques"
              badge="Upcoming"
              badgeColor="bg-brand-burnt-orange"
              link="/workshops/fashion-styling-masterclass"
              date="Feb 15, 2024"
              duration="3 hours"
              location="Enugu Studio"
              price={25000}
            />

            <WorkshopCard
              id="diy-jewelry-making"
              name="DIY Jewelry Making"
              image="/images/DIYJewelryMakingWorkshop.png"
              description="Create beautiful handmade jewelry"
              link="/workshops/diy-jewelry-making"
              date="Feb 22, 2024"
              duration="4 hours"
              location="Workshop Space"
              price={15000}
            />

            <WorkshopCard
              id="natural-beauty-workshop"
              name="Natural Beauty Workshop"
              image="/images/beautyHub.png"
              description="Create your own natural beauty products"
              link="/workshops/natural-beauty-workshop"
              date="Mar 1, 2024"
              duration="2.5 hours"
              location="Beauty Hub"
              price={18000}
            />
          </div>

          <div className="text-center">
            <Link
              href="/workshops"
              className="bg-brand-vibrant-green text-white font-semibold text-responsive-base px-responsive-6 py-responsive-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-brand-vibrant-green hover:border-brand-vibrant-green-light min-h-[48px] flex items-center justify-center"
            >
              View All Workshops
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts Section - Content marketing and thought leadership */}
      <section className="py-responsive-16 px-responsive-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-responsive-12">
            <h2 className="text-responsive-4xl text-brand-neutral-900 mb-responsive-4 drop-shadow-sm">
              Featured <span className="text-brand-dark-teal font-black">Stories</span>
            </h2>
            <p className="text-responsive-lg text-brand-neutral-700 max-w-2xl mx-auto drop-shadow-sm">
              Read inspiring stories, fashion tips, and lifestyle advice from our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-responsive-6 mb-responsive-8">
            <BlogCard
              id="fashion-tips-nigerian-weather"
              title="5 Essential Fashion Tips for Nigerian Weather"
              image="/images/5EssentialFashionTipsforNigerianWeather.png"
              excerpt="Learn how to dress comfortably and stylishly in Nigeria's tropical climate..."
              category="Fashion"
              categoryColor="bg-brand-dark-teal"
              link="/blog/fashion-tips-nigerian-weather"
            />

            <BlogCard
              id="diy-natural-beauty-remedies"
              title="DIY Natural Beauty Remedies at Home"
              image="/images/DIYNaturalBeautyRemediesatHome.png"
              excerpt="Discover simple, effective beauty treatments using kitchen ingredients..."
              category="Beauty"
              link="/blog/diy-natural-beauty-remedies"
            />

            <BlogCard
              id="capsule-wardrobe-professionals"
              title="Building a Capsule Wardrobe for Busy Professionals"
              image="/images/BuildingaCapsuleWardrobeforBusyProfessionals.png"
              excerpt="Streamline your morning routine with a carefully curated professional wardrobe..."
              category="Lifestyle"
              link="/blog/capsule-wardrobe-professionals"
            />
          </div>

          <div className="text-center">
            <Link
              href="/blog"
              className="bg-brand-burnt-orange text-white font-semibold text-responsive-base px-responsive-6 py-responsive-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-brand-burnt-orange hover:border-brand-burnt-orange-light min-h-[48px] flex items-center justify-center"
            >
              Read More Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
