import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "오늘의 타로 | 2026 운세를 카드 한 장으로",
  description: "2026년, 카드 한 장으로 내 운명을 엿보다. 무료 타로카드 운세 서비스",
  keywords: ["타로", "운세", "2026운세", "타로카드", "무료운세", "연애운", "재물운"],
  openGraph: {
    title: "오늘의 타로 | 2026 운세를 카드 한 장으로",
    description: "새해 첫 타로, 무료로 뽑아보세요",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[#0a0a0f] text-white antialiased">
        <div className="stars-bg fixed inset-0 pointer-events-none" />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
