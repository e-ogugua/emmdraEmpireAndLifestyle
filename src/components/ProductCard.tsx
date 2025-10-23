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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100" data-product-id={id}>
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <Image
          src={image}
          alt={`Product: ${name}`}
          fill
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {badge && (
          <div className="absolute top-responsive-2 left-responsive-2">
            <span className={`${badgeColor} text-white px-responsive-3 py-1 rounded-full text-responsive-xs font-bold shadow-md border border-current/50`}>
              {badge}
            </span>
          </div>
        )}
      </div>
      <div className="p-responsive-3 sm:p-responsive-4">
        <h3 className="font-bold text-brand-neutral-900 mb-responsive-2 text-responsive-sm sm:text-responsive-base leading-tight line-clamp-2" title={name}>{name}</h3>
        <p className="text-brand-neutral-700 text-responsive-sm mb-responsive-3 leading-relaxed line-clamp-2" title={description}>{description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-responsive-base sm:text-responsive-lg text-brand-burnt-orange" aria-label={`Price: ${price.toLocaleString()} Naira`}>₦{price.toLocaleString()}</span>
          <Link
            href={link}
            className={`${buttonColor} text-white px-responsive-3 py-responsive-1 rounded-full text-responsive-xs sm:text-responsive-sm hover:opacity-90 min-h-[44px] flex items-center justify-center font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg`}
            aria-label={`Shop ${name} for ${price.toLocaleString()} Naira`}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  )
})

ProductCard.displayName = 'ProductCard'

export default ProductCard
