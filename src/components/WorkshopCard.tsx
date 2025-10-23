import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface WorkshopCardProps {
  id: string
  name: string
  image: string
  description: string
  badge?: string
  badgeColor?: string
  link: string
  date: string
  duration: string
  location: string
  price: number
}

const WorkshopCard = React.memo<WorkshopCardProps>(({
  id,
  name,
  image,
  description,
  badge,
  badgeColor = 'bg-brand-burnt-orange',
  link,
  date,
  duration,
  location,
  price
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100" data-workshop-id={id}>
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={`Workshop: ${name}`}
          fill
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {badge && (
          <div className="absolute top-responsive-3 left-responsive-3">
            <span className={`${badgeColor} text-white px-responsive-3 py-1 rounded-full text-responsive-xs font-bold shadow-md border border-current/50`}>
              {badge}
            </span>
          </div>
        )}
      </div>
      <div className="p-responsive-4">
        <h3 className="font-bold text-brand-neutral-900 mb-responsive-2 text-responsive-lg leading-tight line-clamp-2" title={name}>{name}</h3>
        <p className="text-brand-neutral-700 text-responsive-sm mb-responsive-3 leading-relaxed line-clamp-2" title={description}>{description}</p>
        <div className="space-y-responsive-2">
          <div className="flex items-center text-responsive-sm text-brand-neutral-600">
            <svg className="w-4 h-4 mr-responsive-2 text-brand-burnt-orange flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span>{date}</span>
          </div>
          <div className="flex items-center text-responsive-sm text-brand-neutral-600">
            <svg className="w-4 h-4 mr-responsive-2 text-brand-vibrant-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-responsive-sm text-brand-neutral-600">
            <svg className="w-4 h-4 mr-responsive-2 text-brand-dark-teal flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            <span>{location}</span>
          </div>
        </div>
        <div className="mt-responsive-4 flex items-center justify-between">
          <span className="font-bold text-responsive-lg text-brand-burnt-orange" aria-label={`Workshop price: ${price.toLocaleString()} Naira`}>₦{price.toLocaleString()}</span>
          <Link
            href={link}
            className="bg-brand-burnt-orange text-white px-responsive-3 py-responsive-1 rounded-full text-responsive-sm hover:bg-brand-burnt-orange-light transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg min-h-[44px] flex items-center justify-center font-medium"
            aria-label={`Register for ${name} workshop - ${date}, ${duration}, ${location} for ${price.toLocaleString()} Naira`}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
})

WorkshopCard.displayName = 'WorkshopCard'

export default WorkshopCard
