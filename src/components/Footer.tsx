import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-16">
      {/* Upper section — white, logo area */}
      <div className="bg-white border-t-4 border-[#CC0000]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <Image
              src="/logo_trans.png"
              alt="DOG'S NEWS 台島新聞局"
              width={120}
              height={50}
              className="h-12 w-auto object-contain"
            />
            <div className="flex flex-col leading-tight border-l-2 border-[#CC0000] pl-4">
              <span className="text-[#1A1A1A] font-black text-lg tracking-tight">台島新聞局</span>
              <span className="text-[#CC0000] text-xs font-semibold tracking-[0.15em] uppercase">Taiwan Island News</span>
            </div>
          </Link>
          <p className="text-gray-500 text-sm">© {year} DOG&apos;S NEWS 台島新聞局</p>
        </div>
      </div>

      {/* Lower section — dark, disclaimer */}
      <div className="bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-6 py-4 text-center">
          <p className="text-gray-600 text-xs">
            本站所有內容均為虛構，僅供角色扮演用途，不代表任何真實事件或人物。
          </p>
        </div>
      </div>
    </footer>
  )
}
