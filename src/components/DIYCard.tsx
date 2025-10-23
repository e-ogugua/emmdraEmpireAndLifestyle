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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {badge && (
          <div className="absolute top-3 left-3">
            <span className={`${badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-md border border-current/50`}>
              {badge}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-brand-neutral-900 mb-2 text-lg leading-tight">{name}</h3>
        <p className="text-brand-neutral-700 text-sm mb-3 leading-relaxed">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-brand-vibrant-green font-semibold text-sm">{level} • {duration}</span>
          <Link href={link} className="bg-brand-vibrant-green text-white px-3 py-1 rounded-full text-sm hover:bg-brand-vibrant-green-light font-medium transition-colors">
            Try It
          </Link>
        </div>
      </div>
    </div>
  )
})

DIYCard.displayName = 'DIYCard'

export default DIYCard
