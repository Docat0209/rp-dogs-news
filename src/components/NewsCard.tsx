import Image from 'next/image'
import Link from 'next/link'
import type { PostMeta } from '@/types/post'

interface NewsCardProps {
  post: PostMeta
  featured?: boolean
}

export default function NewsCard({ post, featured = false }: NewsCardProps) {
  const dateLabel = new Date(post.date + 'T00:00:00').toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (featured) {
    return (
      <Link href={`/news/${post.slug}`} className="group block">
        <article className="grid md:grid-cols-2 gap-0 border border-gray-200 hover:border-gray-400 transition-colors">
          <div className="relative aspect-video md:aspect-auto md:min-h-[280px] bg-gray-100 overflow-hidden">
            {post.cover ? (
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-700 flex items-center justify-center">
                <span className="text-white text-4xl font-bold opacity-20">NEWS</span>
              </div>
            )}
          </div>
          <div className="p-6 flex flex-col justify-center bg-white">
            <span className="inline-block bg-[#CC0000] text-white text-xs font-bold px-2 py-1 mb-3 w-fit">
              {post.category}
            </span>
            <h2 className="text-2xl font-bold text-black leading-tight mb-3 group-hover:text-[#CC0000] transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.excerpt}</p>
            <div className="flex items-center gap-3 text-xs text-gray-400 mt-auto">
              <span>{post.author}</span>
              <span>·</span>
              <time dateTime={post.date}>{dateLabel}</time>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/news/${post.slug}`} className="group block">
      <article className="border border-gray-200 hover:border-gray-400 transition-colors h-full flex flex-col bg-white">
        <div className="relative aspect-video bg-gray-100 overflow-hidden">
          {post.cover ? (
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-700 flex items-center justify-center">
              <span className="text-white text-2xl font-bold opacity-20">NEWS</span>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-1">
          <span className="inline-block bg-[#CC0000] text-white text-xs font-bold px-2 py-0.5 mb-2 w-fit">
            {post.category}
          </span>
          <h3 className="text-base font-bold text-black leading-tight mb-2 group-hover:text-[#CC0000] transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{dateLabel}</time>
          </div>
        </div>
      </article>
    </Link>
  )
}
