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
    <article className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 border border-gray-100" data-blog-id={id}>
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={`Blog post: ${title}`}
          fill
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-responsive-3 right-responsive-3">
          <span className={`${categoryColor} text-white px-responsive-3 py-1 rounded-full text-responsive-xs font-bold shadow-md border border-current/50`}>
            {category}
          </span>
        </div>
      </div>
      <div className="p-responsive-4">
        <h3 className="font-bold text-brand-neutral-900 mb-responsive-2 text-responsive-lg leading-tight line-clamp-2" title={title}>{title}</h3>
        <p className="text-brand-neutral-700 text-responsive-sm mb-responsive-3 leading-relaxed line-clamp-2" title={excerpt}>{excerpt}</p>
        <div className="flex items-center justify-between">
          <span className="text-brand-dark-teal font-medium text-responsive-sm" aria-label={`Category: ${category}`}>{category}</span>
          <Link
            href={link}
            className="bg-brand-dark-teal text-white px-responsive-3 py-responsive-1 rounded-full text-responsive-sm hover:bg-brand-dark-teal-light transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg min-h-[44px] flex items-center justify-center font-medium"
            aria-label={`Read blog post: ${title}`}
          >
            Read
          </Link>
        </div>
      </div>
    </article>
  )
})

BlogCard.displayName = 'BlogCard'

export default BlogCard
