import { getAllPosts } from '@/lib/posts'
import NewsCard from '@/components/NewsCard'

export default function HomePage() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Masthead */}
      <div className="border-b-4 border-black pb-3 mb-6">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            {new Date().toLocaleDateString('zh-TW', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
          </span>
          <span className="text-[#CC0000] font-semibold">虛構新聞局</span>
        </div>
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl font-semibold">尚無新聞</p>
          <p className="text-sm mt-2">請在 content/news/ 資料夾新增 .md 文章</p>
        </div>
      )}

      {/* Featured article */}
      {featured && (
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">頭條新聞</h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <NewsCard post={featured} featured />
        </section>
      )}

      {/* News grid */}
      {rest.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">最新新聞</h2>
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
