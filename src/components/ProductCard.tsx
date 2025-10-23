import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  description: string
  badge?: string
  badgeColor?: string
  link: string
  buttonText?: string
  buttonColor?: string
}

const ProductCard = React.memo<ProductCardProps>(({
  id,
  name,
  price,
  image,
  description,
  badge,
  badgeColor = 'bg-brand-burnt-orange',
  link,
  buttonText = 'Shop',
  buttonColor = 'bg-brand-dark-teal'
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {badge && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
            <span className={`${badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-md border border-current/50`}>
              {badge}
            </span>
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="font-bold text-brand-neutral-900 mb-2 text-sm sm:text-base leading-tight">{name}</h3>
        <p className="text-brand-neutral-700 text-sm sm:text-base mb-3 leading-relaxed">{description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-base sm:text-lg text-brand-burnt-orange">₦{price.toLocaleString()}</span>
          <Link href={link} className={`${buttonColor} text-white px-3 py-1 rounded-full text-xs sm:text-sm hover:opacity-90 min-h-[36px] flex items-center font-medium transition-opacity`}>
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  )
})

ProductCard.displayName = 'ProductCard'

export default ProductCard
