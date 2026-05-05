import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "오늘의 타로 | 세 장의 카드가 전하는 운명의 메시지"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
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
          background: "#0a0a0f",
          position: "relative",
          overflow: "hidden",
          fontFamily: "serif",
        }}
      >
        {/* 배경 그라디언트 레이어 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 800px 500px at 50% 50%, #120820 0%, #0a0a0f 100%)",
            display: "flex",
          }}
        />

        {/* 중앙 글로우 원 */}
        <div
          style={{
            position: "absolute",
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* 장식 원 1 */}
        <div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            border: "1px solid rgba(251,191,36,0.18)",
            display: "flex",
          }}
        />
        {/* 장식 원 2 */}
        <div
          style={{
            position: "absolute",
            width: 270,
            height: 270,
            borderRadius: "50%",
            border: "1px solid rgba(251,191,36,0.10)",
            display: "flex",
          }}
        />

        {/* 별 패턴 - 좌측 */}
        {[
          [60, 55, 3], [140, 100, 2], [45, 200, 2], [100, 320, 3],
          [30, 420, 2], [180, 480, 2], [90, 570, 3], [200, 150, 2],
        ].map(([x, y, s], i) => (
          <div
            key={`l${i}`}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: s,
              height: s,
              borderRadius: "50%",
              background: `rgba(255,255,255,${0.25 + (i % 4) * 0.12})`,
              display: "flex",
            }}
          />
        ))}

        {/* 별 패턴 - 우측 */}
        {[
          [1100, 60, 2], [1050, 180, 3], [1140, 280, 2], [980, 350, 2],
          [1110, 420, 3], [1020, 510, 2], [1150, 560, 2], [950, 120, 2],
        ].map(([x, y, s], i) => (
          <div
            key={`r${i}`}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: s,
              height: s,
              borderRadius: "50%",
              background: `rgba(255,255,255,${0.25 + (i % 4) * 0.12})`,
              display: "flex",
            }}
          />
        ))}

        {/* 상단 장식 */}
        <div
          style={{
            position: "absolute",
            top: 44,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 140,
              height: 1,
              background:
                "linear-gradient(to right, transparent, rgba(251,191,36,0.55))",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 11,
              color: "rgba(251,191,36,0.55)",
              letterSpacing: "0.35em",
              display: "flex",
            }}
          >
            ✦  ✦  ✦
          </div>
          <div
            style={{
              width: 140,
              height: 1,
              background:
                "linear-gradient(to left, transparent, rgba(251,191,36,0.55))",
              display: "flex",
            }}
          />
        </div>

        {/* 달 SVG */}
        <div
          style={{
            marginBottom: 24,
            display: "flex",
            position: "relative",
            filter: "drop-shadow(0 0 18px rgba(251,191,36,0.55))",
          }}
        >
          <svg width="68" height="68" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill="rgba(251,191,36,0.92)"
            />
          </svg>
        </div>

        {/* 메인 타이틀 */}
        <div
          style={{
            fontSize: 74,
            fontWeight: 700,
            color: "#fbbf24",
            letterSpacing: "0.18em",
            display: "flex",
            textShadow:
              "0 0 30px rgba(251,191,36,0.65), 0 0 60px rgba(251,191,36,0.3)",
            marginBottom: 18,
          }}
        >
          오늘의 타로
        </div>

        {/* 황금 구분선 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              width: 90,
              height: 1,
              background: "rgba(251,191,36,0.45)",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 13,
              color: "rgba(251,191,36,0.65)",
              letterSpacing: "0.35em",
              display: "flex",
            }}
          >
            ✦ ✦ ✦
          </div>
          <div
            style={{
              width: 90,
              height: 1,
              background: "rgba(251,191,36,0.45)",
              display: "flex",
            }}
          />
        </div>

        {/* 서브타이틀 */}
        <div
          style={{
            fontSize: 26,
            color: "rgba(210,210,230,0.88)",
            letterSpacing: "0.06em",
            display: "flex",
            marginBottom: 30,
          }}
        >
          세 장의 카드가 전하는 운명의 메시지
        </div>

        {/* 카테고리 뱃지 */}
        <div style={{ display: "flex", gap: 10 }}>
          {["연애운", "재물운", "직장운", "건강운", "오늘의 운세"].map((cat) => (
            <div
              key={cat}
              style={{
                padding: "7px 18px",
                border: "1px solid rgba(251,191,36,0.32)",
                borderRadius: 24,
                fontSize: 15,
                color: "rgba(251,191,36,0.75)",
                letterSpacing: "0.04em",
                background: "rgba(251,191,36,0.06)",
                display: "flex",
              }}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* 하단 장식 */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 100,
              height: 1,
              background:
                "linear-gradient(to right, transparent, rgba(251,191,36,0.45))",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 14,
              color: "rgba(251,191,36,0.45)",
              letterSpacing: "0.28em",
              display: "flex",
            }}
          >
            過去 · 現在 · 未來
          </div>
          <div
            style={{
              width: 100,
              height: 1,
              background:
                "linear-gradient(to left, transparent, rgba(251,191,36,0.45))",
              display: "flex",
            }}
          />
        </div>
      </div>
    ),
    size
  )
}
