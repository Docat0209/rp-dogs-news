import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

function pageHref(page: number): string {
  return page === 1 ? '/' : `/page/${page}`
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-8 mt-10 pt-6 border-t border-gray-200">
      {currentPage > 1 ? (
        <Link
          href={pageHref(currentPage - 1)}
          className="text-sm font-medium text-[#CC0000] hover:text-[#1A1A1A] transition-colors"
        >
          ← 上一頁
        </Link>
      ) : (
        <span className="text-sm font-medium text-gray-300 cursor-not-allowed">← 上一頁</span>
      )}
      <span className="text-xs text-gray-400 tracking-wide">
        第 {currentPage} 頁 &nbsp;/&nbsp; 共 {totalPages} 頁
      </span>
      {currentPage < totalPages ? (
        <Link
          href={pageHref(currentPage + 1)}
          className="text-sm font-medium text-[#CC0000] hover:text-[#1A1A1A] transition-colors"
        >
          下一頁 →
        </Link>
      ) : (
        <span className="text-sm font-medium text-gray-300 cursor-not-allowed">下一頁 →</span>
      )}
    </div>
  )
}
