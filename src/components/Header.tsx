import Image from 'next/image'
import Link from 'next/link'

const navItems = [
  { label: '首頁', href: '/' },
  { label: '政治', href: '/?category=政治' },
  { label: '社會', href: '/?category=社會' },
  { label: '國際', href: '/?category=國際' },
  { label: '體育', href: '/?category=體育' },
  { label: '娛樂', href: '/?category=娛樂' },
]

export default function Header() {
  return (
    <header className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-3 border-b border-gray-700">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <Image
              src="/logo.png"
              alt="DOG'S NEWS"
              width={140}
              height={60}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-200 hover:text-white hover:text-[#CC0000] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="py-2 flex items-center gap-3 text-xs text-gray-400">
          <span className="bg-[#CC0000] text-white px-2 py-0.5 font-bold text-xs">最新</span>
          <span>虛構新聞局 — 所有新聞均為角色扮演創作，不代表真實事件</span>
        </div>
      </div>
    </header>
  )
}
