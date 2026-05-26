import { getPost, getAllSlugs, formatPostDate } from '@/lib/posts'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | DOG'S NEWS 台島新聞局`,
    description: post.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const dateLabel = formatPostDate(post.date)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#CC0000] transition-colors">首頁</Link>
        <span>/</span>
        <span className="text-[#CC0000] font-semibold">{post.category}</span>
        <span>/</span>
        <span className="text-gray-600 truncate max-w-xs">{post.title}</span>
      </nav>

      {/* Article header */}
      <header className="mb-8">
        <span className="inline-block bg-[#CC0000] text-white text-xs font-bold px-2 py-1 mb-4 tracking-wide shadow-sm">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-lg text-gray-500 mb-4 leading-relaxed">{post.excerpt}</p>
        <div className="flex items-center gap-3 text-sm text-gray-400 border-t-2 border-b border-[#CC0000] border-b-gray-200 py-3">
          <span className="font-medium text-gray-700">{post.author}</span>
          <span>·</span>
          <time dateTime={post.date}>{dateLabel}</time>
          <span>· 台島新聞局</span>
        </div>
      </header>

      {/* Cover image */}
      {post.cover && (
        <div className="relative aspect-video mb-8 overflow-hidden bg-gray-100">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article body */}
      <div className="markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Back link */}
      <div className="mt-12 pt-6 border-t border-gray-200 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#CC0000] hover:text-[#1A1A1A] transition-colors"
        >
          ← 返回首頁
        </Link>
        <Image
          src="/logo_trans.png"
          alt="台島新聞局"
          width={70}
          height={30}
          className="h-7 w-auto object-contain opacity-30"
        />
      </div>
    </div>
  )
}
