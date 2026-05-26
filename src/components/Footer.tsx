import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="DOG'S NEWS"
                width={120}
                height={50}
                className="h-10 w-auto object-contain mb-3"
              />
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              虛構新聞局，專為角色扮演世界提供即時新聞報導。
            </p>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-gray-700 pt-6 md:pt-0 md:pl-10">
            <p className="text-gray-500 text-xs">
              © {year} DOG&apos;S NEWS 虛構新聞局. 版權所有。
            </p>
            <p className="text-gray-600 text-xs mt-1">
              本站所有內容均為虛構，僅供角色扮演用途。
            </p>
          </div>
        </div>
      </div>
      <div className="h-1 bg-[#CC0000]" />
    </footer>
  )
}
