"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import TarotCard from "@/components/TarotCard"
import MysticIcon from "@/components/MysticIcon"
import { tarotCards } from "@/data/tarot-cards"
import { categories } from "@/data/categories"
import { getLuckyNumber, getLuckyColor, getLuckyDirection } from "@/lib/utils"
import { Category, TarotCard as TarotCardData } from "@/types/tarot"

interface ParsedCard {
  cardId: number
  isReversed: boolean
  card: TarotCardData
}

function ResultContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const categoryId = searchParams.get("category") as Category
  const cardsParam = searchParams.get("cards") || ""

  const [interpretation, setInterpretation] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [luckyItems, setLuckyItems] = useState({
    number: 0,
    color: "",
    direction: "",
  })

  // 카드 파싱: "cardId:isReversed,cardId:isReversed,cardId:isReversed"
  const parsedCards: ParsedCard[] = cardsParam.split(",").map(cardStr => {
    const [cardId, isReversed] = cardStr.split(":")
    return {
      cardId: parseInt(cardId),
      isReversed: isReversed === "true",
      card: tarotCards[parseInt(cardId)]
    }
  }).filter(c => c.card)

  const category = categories.find((c) => c.id === categoryId)
  const cardLabels = ["과거", "현재", "미래"]

  useEffect(() => {
    // 행운의 아이템 생성
    setLuckyItems({
      number: getLuckyNumber(),
      color: getLuckyColor(),
      direction: getLuckyDirection(),
    })

    // AI 해석 가져오기
    const fetchInterpretation = async () => {
      setIsLoading(true)

      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // 3장 카드 종합 해석 생성
      const interpretation = generateThreeCardInterpretation(parsedCards, categoryId)
      setInterpretation(interpretation)
      setIsLoading(false)
    }

    if (parsedCards.length === 3) {
      fetchInterpretation()
    }
  }, [cardsParam, categoryId])

  if (!category || parsedCards.length !== 3) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">결과를 찾을 수 없습니다.</p>
      </div>
    )
  }

  const handleShare = async () => {
    const cardNames = parsedCards.map((c, i) =>
      `${cardLabels[i]}: ${c.card.nameKo} (${c.isReversed ? "역방향" : "정방향"})`
    ).join("\n")

    const shareText = `오늘의 타로 - ${category.name}\n\n` +
      `${cardNames}\n\n` +
      `${interpretation.slice(0, 150)}...\n\n` +
      `행운의 숫자: ${luckyItems.number}\n` +
      `행운의 색상: ${luckyItems.color}\n` +
      `행운의 방향: ${luckyItems.direction}쪽\n\n` +
      `나도 타로 뽑아보기: ${window.location.origin}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "오늘의 타로",
          text: shareText,
        })
      } catch {
        await navigator.clipboard.writeText(shareText)
        alert("결과가 클립보드에 복사되었습니다!")
      }
    } else {
      await navigator.clipboard.writeText(shareText)
      alert("결과가 클립보드에 복사되었습니다!")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 pb-28">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="text-gold-400/80 mb-2">
          <MysticIcon type={category.icon} className="w-10 h-10 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-white font-serif tracking-wide">
          {category.name}
        </h1>
        <p className="text-sm text-gray-500 mt-1">세 장의 카드가 전하는 메시지</p>
      </motion.div>

      {/* 3장의 카드 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-3 sm:gap-6 mb-8"
      >
        {parsedCards.map((parsedCard, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.15, type: "spring", stiffness: 200 }}
            className="flex flex-col items-center"
          >
            <div className="text-xs text-gold-400/70 mb-2 uppercase tracking-wider font-medium">
              {cardLabels[index]}
            </div>
            <TarotCard
              card={parsedCard.card}
              isFlipped={true}
              isReversed={parsedCard.isReversed}
              size="lg"
            />
            <div className="mt-3 text-center">
              <p className="text-sm font-bold text-white/90">{parsedCard.card.nameKo}</p>
              <p className="text-[10px] text-gray-500">
                {parsedCard.isReversed ? "역방향" : "정방향"}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* 해석 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <MysticIcon type="star" className="w-5 h-5 text-gold-400" />
            <span>2026년 당신의 {category.name}</span>
          </h3>

          {isLoading ? (
            <div className="space-y-3">
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-4 bg-white/10 rounded"
              />
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                className="h-4 bg-white/10 rounded w-4/5"
              />
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                className="h-4 bg-white/10 rounded w-3/5"
              />
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-center text-gold-400/60 text-sm mt-4"
              >
                카드를 해석하고 있습니다...
              </motion.p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm">
                {interpretation}
              </p>
            </motion.div>
          )}
        </div>

        {/* 행운의 아이템 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-4 bg-gradient-to-br from-gold-500/10 to-amber-500/10 rounded-2xl p-5 border border-gold-500/20"
        >
          <h4 className="text-sm font-bold text-gold-400 mb-3 flex items-center gap-2">
            <MysticIcon type="star" className="w-4 h-4" />
            오늘의 행운 아이템
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-white">{luckyItems.number}</p>
              <p className="text-xs text-gray-400">행운의 숫자</p>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{luckyItems.color}</p>
              <p className="text-xs text-gray-400">행운의 색상</p>
            </div>
            <div>
              <p className="text-lg font-bold text-white">{luckyItems.direction}쪽</p>
              <p className="text-xs text-gray-400">행운의 방향</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 버튼 영역 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f] to-transparent"
      >
        <div className="max-w-md mx-auto flex gap-3">
          <button
            onClick={() => router.push("/")}
            className="flex-1 py-3 px-4 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
          >
            다시 뽑기
          </button>
          <button
            onClick={handleShare}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-gold-500 to-amber-500 text-black font-bold hover:from-gold-400 hover:to-amber-400 transition-colors btn-glow"
          >
            결과 공유하기
          </button>
        </div>
      </motion.div>
    </div>
  )
}

function generateThreeCardInterpretation(cards: ParsedCard[], categoryId: Category): string {
  const [past, present, future] = cards

  const getCategoryMeaning = (card: ParsedCard) => {
    const data = card.isReversed ? card.card.reversed : card.card.upright
    switch (categoryId) {
      case "yearly":
        return data.meaning
      case "love":
      case "marriage":
        return data.love
      case "career":
        return data.career
      case "money":
        return data.money
      case "health":
        return data.health
      default:
        return data.meaning
    }
  }

  const categoryName = categoryId === "yearly" ? "총운" :
    categoryId === "love" ? "연애운" :
    categoryId === "marriage" ? "결혼/인연운" :
    categoryId === "career" ? "직장/사업운" :
    categoryId === "money" ? "재물운" : "건강운"

  return `[과거 - ${past.card.nameKo}]
${getCategoryMeaning(past)}

[현재 - ${present.card.nameKo}]
${getCategoryMeaning(present)}

[미래 - ${future.card.nameKo}]
${getCategoryMeaning(future)}

[종합 해석]
세 장의 카드가 보여주는 ${categoryName}의 흐름입니다. 과거에 ${past.card.nameKo}의 에너지가 있었고, 현재는 ${present.card.nameKo}가 나타나는 시기입니다. 앞으로 ${future.card.nameKo}의 기운이 펼쳐질 것입니다.

${present.isReversed ? "현재 카드가 역방향으로 나왔습니다. 이는 내면의 성찰이 필요한 시기임을 암시합니다." : "현재 카드가 정방향으로 나왔습니다. 지금 올바른 방향으로 나아가고 있습니다."}

${future.isReversed ? "미래 카드가 역방향입니다. 계획을 재검토하고 신중하게 접근하세요." : "미래 카드가 긍정적인 방향을 가리킵니다. 현재의 노력이 좋은 결실을 맺을 것입니다."}`
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <motion.p
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-500"
        >
          결과를 불러오는 중...
        </motion.p>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}
