import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b-4 border-[#CC0000]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-5">
        <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <Image
            src="/logo_trans.png"
            alt="DOG'S NEWS 台島新聞局"
            width={150}
            height={63}
            className="h-14 w-auto object-contain"
            priority
          />
          <div className="flex flex-col leading-tight border-l-2 border-[#CC0000] pl-4">
            <span className="text-[#1A1A1A] font-black text-xl tracking-tight">台島新聞局</span>
            <span className="text-[#CC0000] text-xs font-semibold tracking-[0.15em] uppercase">Taiwan Island News</span>
          </div>
        </Link>
      </div>
    </header>
  )
}
