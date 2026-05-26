import { getAllPosts } from '@/lib/posts'
import NewsCard from '@/components/NewsCard'

export default function HomePage() {
  const posts = getAllPosts()
  const [latest, ...rest] = posts

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {posts.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl font-semibold">尚無新聞</p>
          <p className="text-sm mt-2">請在 content/news/ 資料夾新增 .md 文章</p>
        </div>
      )}

      {/* Latest article — full-width large card */}
      {latest && (
        <section className="mb-10">
          <NewsCard post={latest} featured />
        </section>
      )}

      {/* Remaining articles — grid */}
      {rest.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-5 bg-[#9B1C1C]" />
            <h2 className="text-sm font-bold tracking-widest text-[#111111] uppercase">更多新聞</h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(post => (
              <NewsCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
