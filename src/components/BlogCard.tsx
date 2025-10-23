import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface BlogCardProps {
  id: string
  title: string
  image: string
  excerpt: string
  category: string
  categoryColor?: string
  link: string
}

const BlogCard = React.memo<BlogCardProps>(({
  id,
  title,
  image,
  excerpt,
  category,
  categoryColor = 'bg-brand-dark-teal',
  link
}) => {
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 right-3">
          <span className={`${categoryColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-md border border-current/50`}>
            {category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-brand-neutral-800 mb-2 line-clamp-2">{title}</h3>
        <p className="text-brand-neutral-600 text-sm mb-3 line-clamp-2">{excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-brand-dark-teal font-medium text-sm">{category}</span>
          <Link href={link} className="bg-brand-dark-teal text-white px-3 py-1 rounded-full text-sm hover:bg-brand-dark-teal-light transition-colors">
            Read
          </Link>
        </div>
      </div>
    </article>
  )
})

BlogCard.displayName = 'BlogCard'

export default BlogCard
