"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { TarotCard as TarotCardType } from "@/types/tarot"
import { cn } from "@/lib/utils"
import MysticIcon from "./MysticIcon"

interface TarotCardProps {
  card?: TarotCardType
  isFlipped?: boolean
  isReversed?: boolean
  isSelected?: boolean
  onClick?: () => void
  delay?: number
  size?: "sm" | "md" | "lg" | "xl"
  label?: string
}

export default function TarotCard({
  card,
  isFlipped = false,
  isReversed = false,
  isSelected = false,
  onClick,
  delay = 0,
  size = "md",
  label,
}: TarotCardProps) {
  const sizeClasses = {
    sm: "w-[70px] h-[120px]",
    md: "w-[100px] h-[170px]",
    lg: "w-[140px] h-[240px]",
    xl: "w-[180px] h-[310px]",
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <span className="text-xs text-gold-400/70 tracking-wider uppercase font-light">
          {label}
        </span>
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, type: "spring", stiffness: 200 }}
        whileHover={onClick ? { y: -8, scale: 1.02 } : undefined}
        whileTap={onClick ? { scale: 0.98 } : undefined}
        onClick={onClick}
        className={cn(
          sizeClasses[size],
          "relative",
          onClick && "cursor-pointer",
          isSelected && "ring-2 ring-gold-400/70 ring-offset-4 ring-offset-[#0a0a0f] rounded-lg"
        )}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* 카드 뒷면 */}
          <div
            className="absolute inset-0 rounded-lg overflow-hidden shadow-xl shadow-black/50"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#1e1e3f] to-[#0d0d1a] border border-gold-400/30 rounded-lg">
              <div className="w-full h-full flex items-center justify-center p-2">
                <div className="relative w-full h-full border border-gold-400/20 rounded flex items-center justify-center bg-gradient-to-br from-indigo-950/50 to-purple-950/50">
                  {/* 중앙 심볼 */}
                  <div className="relative">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 border border-gold-400/40 rounded-full flex items-center justify-center">
                      <MysticIcon type="moon" className="w-5 h-5 sm:w-7 sm:h-7 text-gold-400/60" />
                    </div>
                    {/* 4방향 장식 */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-gold-400/30" />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-gold-400/30" />
                    <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-2 h-0.5 bg-gold-400/30" />
                    <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-2 h-0.5 bg-gold-400/30" />
                  </div>
                  {/* 코너 장식 */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-400/25" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-400/25" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-400/25" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-400/25" />
                </div>
              </div>
            </div>
          </div>

          {/* 카드 앞면 - 실제 타로카드 이미지 */}
          <div
            className={cn(
              "absolute inset-0 rounded-lg overflow-hidden shadow-xl shadow-black/50",
              "border border-gold-400/40"
            )}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
          >
            {card && (
              <div
                className={cn(
                  "w-full h-full relative bg-[#0d0d1a]",
                  isReversed && "rotate-180"
                )}
              >
                {/* 실제 타로카드 이미지 */}
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 140px, 180px"
                  unoptimized
                />
                {/* 이미지 위 오버레이 (역방향 표시) */}
                {isReversed && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 rotate-180 px-2 py-0.5 bg-black/70 rounded text-[8px] text-gold-400/80 uppercase tracking-wider">
                    Reversed
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
