import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: "DOG'S NEWS | 台島新聞局",
  description: '台島新聞局 — 最新即時新聞報導',
  openGraph: {
    title: "DOG'S NEWS 台島新聞局",
    description: '台島新聞局 — 最新即時新聞報導',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className="h-full">
      <body className="min-h-full flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
