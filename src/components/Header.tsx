import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-[#111111] border-b-2 border-[#9B1C1C]">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
          {/* White background so transparent logo renders with full color fidelity */}
          <div className="bg-white px-3 py-2 inline-flex items-center">
            <Image
              src="/logo_trans.png"
              alt="DOG'S NEWS 台島新聞局"
              width={130}
              height={55}
              className="h-11 w-auto object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-white font-black text-lg tracking-tight">台島新聞局</span>
            <span className="text-[#9B1C1C] text-xs font-semibold tracking-widest uppercase">Taiwan Island News</span>
          </div>
        </Link>
      </div>
    </header>
  )
}
