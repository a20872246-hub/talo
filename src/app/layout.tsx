import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://talo-tan.vercel.app"),
  title: "오늘의 타로 | 세 장의 카드가 전하는 운명의 메시지",
  description: "과거 · 현재 · 미래. 세 장의 타로카드로 오늘의 운세를 무료로 확인하세요. 연애운, 재물운, 직장운, 건강운.",
  keywords: ["타로", "운세", "2026운세", "타로카드", "무료운세", "연애운", "재물운", "직장운", "건강운"],
  openGraph: {
    title: "오늘의 타로 | 세 장의 카드가 전하는 운명의 메시지",
    description: "과거 · 현재 · 미래. 세 장의 타로카드로 오늘의 운세를 무료로 확인하세요.",
    type: "website",
    locale: "ko_KR",
    siteName: "오늘의 타로",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "오늘의 타로 | 세 장의 카드가 전하는 운명의 메시지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "오늘의 타로 | 세 장의 카드가 전하는 운명의 메시지",
    description: "과거 · 현재 · 미래. 세 장의 타로카드로 오늘의 운세를 무료로 확인하세요.",
    images: ["/og.png"],
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
