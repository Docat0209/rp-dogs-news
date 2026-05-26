import { getPostsByPage, getAllPosts, ARTICLES_PER_PAGE } from '@/lib/posts'
import NewsCard from '@/components/NewsCard'
import Pagination from '@/components/Pagination'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ pageNum: string }>
}

export async function generateStaticParams() {
  const all = getAllPosts()
  const totalPages = Math.max(1, Math.ceil(all.length / ARTICLES_PER_PAGE))
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    pageNum: String(i + 2),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pageNum } = await params
  return { title: `第 ${pageNum} 頁 | DOG'S NEWS 台島新聞局` }
}

export default async function NewsPage({ params }: Props) {
  const { pageNum } = await params
  const page = parseInt(pageNum, 10)
  const { posts, totalPages } = getPostsByPage(page)

  if (isNaN(page) || page < 2 || page > totalPages || posts.length === 0) {
    notFound()
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#CC0000] transition-colors">首頁</Link>
        <span>/</span>
        <span className="text-[#CC0000] font-semibold">第 {page} 頁</span>
      </nav>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-5 bg-[#CC0000]" />
        <h2 className="text-sm font-bold tracking-widest text-[#1A1A1A] uppercase">新聞列表</h2>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <NewsCard key={post.slug} post={post} />
        ))}
      </div>

      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  )
}
