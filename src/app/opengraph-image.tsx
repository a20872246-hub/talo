import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "오늘의 타로 | 세 장의 카드가 전하는 운명의 메시지"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const notoSerifKR = await fetch(
    "https://fonts.gstatic.com/s/notoserifjp/v30/xn77YHs72GKoTvER4Gn3b5eMRtWGkp2nDBNIkg.woff2"
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 40%, #0a0f1a 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 별 배경 */}
        {[
          [80, 60], [200, 120], [340, 40], [500, 90], [650, 30],
          [780, 110], [920, 55], [1050, 80], [1130, 140], [150, 200],
          [420, 180], [700, 160], [900, 200], [1100, 220], [60, 300],
          [280, 350], [550, 280], [820, 320], [1020, 370], [100, 480],
          [350, 520], [600, 450], [850, 500], [1100, 460], [200, 580],
          [480, 600], [750, 570], [980, 590],
        ].map(([x, y], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              borderRadius: "50%",
              background: `rgba(255, 255, 255, ${0.3 + (i % 5) * 0.1})`,
            }}
          />
        ))}

        {/* 상단 장식 라인 */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ width: 120, height: 1, background: "linear-gradient(to right, transparent, rgba(251,191,36,0.5))" }} />
          <div style={{ width: 6, height: 6, background: "rgba(251,191,36,0.7)", borderRadius: "50%", transform: "rotate(45deg)" }} />
          <div style={{ width: 4, height: 4, background: "rgba(251,191,36,0.5)", borderRadius: "50%", transform: "rotate(45deg)" }} />
          <div style={{ width: 6, height: 6, background: "rgba(251,191,36,0.7)", borderRadius: "50%", transform: "rotate(45deg)" }} />
          <div style={{ width: 120, height: 1, background: "linear-gradient(to left, transparent, rgba(251,191,36,0.5))" }} />
        </div>

        {/* 배경 원형 글로우 */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)",
          }}
        />

        {/* 외곽 원 장식 */}
        <div
          style={{
            position: "absolute",
            width: 280,
            height: 280,
            borderRadius: "50%",
            border: "1px solid rgba(251,191,36,0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 240,
            height: 240,
            borderRadius: "50%",
            border: "1px solid rgba(251,191,36,0.1)",
          }}
        />

        {/* 달 심볼 */}
        <div style={{ display: "flex", marginBottom: 28, position: "relative" }}>
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill="rgba(251,191,36,0.9)"
              style={{ filter: "drop-shadow(0 0 12px rgba(251,191,36,0.6))" }}
            />
          </svg>
          {/* 별 장식 */}
          <div style={{ position: "absolute", top: -8, right: -10, fontSize: 14, color: "rgba(251,191,36,0.8)" }}>✦</div>
          <div style={{ position: "absolute", bottom: -4, left: -12, fontSize: 10, color: "rgba(251,191,36,0.6)" }}>✦</div>
        </div>

        {/* 메인 타이틀 */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#fbbf24",
            letterSpacing: "0.15em",
            textShadow: "0 0 20px rgba(251,191,36,0.6), 0 0 40px rgba(251,191,36,0.3)",
            fontFamily: "'Noto Serif JP'",
            marginBottom: 16,
          }}
        >
          오늘의 타로
        </div>

        {/* 구분선 */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <div style={{ width: 80, height: 1, background: "rgba(251,191,36,0.4)" }} />
          <div style={{ fontSize: 14, color: "rgba(251,191,36,0.6)", letterSpacing: "0.3em" }}>✦ ✦ ✦</div>
          <div style={{ width: 80, height: 1, background: "rgba(251,191,36,0.4)" }} />
        </div>

        {/* 서브타이틀 */}
        <div
          style={{
            fontSize: 24,
            color: "rgba(200,200,220,0.85)",
            letterSpacing: "0.05em",
            fontFamily: "'Noto Serif JP'",
            marginBottom: 14,
          }}
        >
          세 장의 카드가 전하는 운명의 메시지
        </div>

        {/* 카테고리 뱃지 */}
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          {["연애운", "재물운", "직장운", "건강운", "오늘의 운세"].map((cat) => (
            <div
              key={cat}
              style={{
                padding: "6px 16px",
                border: "1px solid rgba(251,191,36,0.3)",
                borderRadius: 20,
                fontSize: 14,
                color: "rgba(251,191,36,0.7)",
                letterSpacing: "0.05em",
                background: "rgba(251,191,36,0.05)",
              }}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* 하단 장식 라인 */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div style={{ width: 120, height: 1, background: "linear-gradient(to right, transparent, rgba(251,191,36,0.5))" }} />
          <div style={{ fontSize: 13, color: "rgba(251,191,36,0.5)", letterSpacing: "0.2em" }}>過去 · 現在 · 未來</div>
          <div style={{ width: 120, height: 1, background: "linear-gradient(to left, transparent, rgba(251,191,36,0.5))" }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Noto Serif JP",
          data: notoSerifKR,
          style: "normal",
          weight: 700,
        },
      ],
    }
  )
}
