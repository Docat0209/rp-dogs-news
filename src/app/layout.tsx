import type { Metadata } from 'next'
import { Noto_Serif_TC } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const notoSerifTC = Noto_Serif_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-serif-tc',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rp-dogs-news.vercel.app'),
  title: "DOG'S NEWS | 台島新聞局",
  description: '台島新聞局 — 最新即時新聞報導',
  openGraph: {
    title: "DOG'S NEWS 台島新聞局",
    description: '台島新聞局 — 最新即時新聞報導',
    type: 'website',
    siteName: "DOG'S NEWS 台島新聞局",
    images: [{ url: '/logo_trans.png', width: 300, height: 126, alt: "DOG'S NEWS 台島新聞局" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "DOG'S NEWS 台島新聞局",
    description: '台島新聞局 — 最新即時新聞報導',
    images: ['/logo_trans.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className={`h-full ${notoSerifTC.variable}`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
