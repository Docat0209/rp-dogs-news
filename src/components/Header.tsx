import Image from 'next/image'
import Link from 'next/link'
import ClockWidget from './ClockWidget'

export default function Header() {
  return (
    <header className="bg-gradient-to-b from-white to-[#fafafa] border-b-4 border-[#CC0000] shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <Image
            src="/logo_trans.png"
            alt="DOG'S NEWS 海狗新聞局"
            width={150}
            height={63}
            className="h-14 w-auto object-contain"
            priority
          />
          <div className="flex flex-col leading-tight border-l-2 border-[#CC0000] pl-4">
            <span className="text-[#1A1A1A] font-black text-xl tracking-tight">海狗新聞局</span>
            <span className="text-[#CC0000] text-xs font-bold tracking-[0.25em] uppercase">DOGSNEWS</span>
          </div>
        </Link>
        <ClockWidget />
      </div>
    </header>
  )
}
