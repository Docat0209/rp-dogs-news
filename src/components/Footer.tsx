import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[#111111] text-white mt-16">
      <div className="h-1 bg-[#9B1C1C]" />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo block */}
          <Link href="/" className="flex items-center gap-4 hover:opacity-85 transition-opacity">
            <div className="bg-white px-3 py-2 inline-flex items-center">
              <Image
                src="/logo_trans.png"
                alt="DOG'S NEWS 台島新聞局"
                width={110}
                height={46}
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-white font-black text-base tracking-tight">台島新聞局</span>
              <span className="text-[#9B1C1C] text-xs font-semibold tracking-widest uppercase">Taiwan Island News</span>
            </div>
          </Link>

          {/* Right side */}
          <div className="text-right">
            <p className="text-gray-400 text-sm">© {year} DOG&apos;S NEWS 台島新聞局</p>
          </div>
        </div>

        {/* Disclaimer — single, bottom */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-600 text-xs">
            本站所有內容均為虛構，僅供角色扮演用途，不代表任何真實事件或人物。
          </p>
        </div>
      </div>
    </footer>
  )
}
