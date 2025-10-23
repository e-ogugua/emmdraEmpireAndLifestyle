import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface DIYCardProps {
  id: string
  name: string
  image: string
  description: string
  badge?: string
  badgeColor?: string
  link: string
  level: string
  duration: string
}

const DIYCard = React.memo<DIYCardProps>(({
  id,
  name,
  image,
  description,
  badge,
  badgeColor = 'bg-brand-vibrant-green',
  link,
  level,
  duration
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100" data-diy-id={id}>
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={`DIY Project: ${name}`}
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
        <div className="flex items-center justify-between">
          <span className="text-brand-vibrant-green font-semibold text-responsive-sm" aria-label={`Difficulty: ${level}, Duration: ${duration}`}>{level} • {duration}</span>
          <Link
            href={link}
            className="bg-brand-vibrant-green text-white px-responsive-3 py-responsive-1 rounded-full text-responsive-sm hover:bg-brand-vibrant-green-light font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg min-h-[44px] flex items-center justify-center"
            aria-label={`Try DIY project: ${name} (${level} level, ${duration})`}
          >
            Try It
          </Link>
        </div>
      </div>
    </div>
  )
})

DIYCard.displayName = 'DIYCard'

export default DIYCard
