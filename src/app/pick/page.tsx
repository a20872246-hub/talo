"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import TarotCard from "@/components/TarotCard"
import MysticIcon from "@/components/MysticIcon"
import { tarotCards } from "@/data/tarot-cards"
import { categories } from "@/data/categories"
import { getRandomCard, getRandomBoolean } from "@/lib/utils"
import { Category } from "@/types/tarot"

interface SelectedCard {
  position: number
  cardId: number
  isReversed: boolean
}

function PickContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryId = searchParams.get("category") as Category

  const [isShuffling, setIsShuffling] = useState(true)
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([])
  const [flippedPositions, setFlippedPositions] = useState<number[]>([])
  const [usedCardIds, setUsedCardIds] = useState<number[]>([])

  const category = categories.find((c) => c.id === categoryId)
  const TOTAL_CARDS_TO_PICK = 3
  const DISPLAY_CARD_COUNT = 5

  // 카드 셔플 시뮬레이션
  useEffect(() => {
    const shuffleTimer = setTimeout(() => {
      setIsShuffling(false)
    }, 4000)
    return () => clearTimeout(shuffleTimer)
  }, [])

  // 모든 카드가 선택되면 결과 페이지로 이동
  useEffect(() => {
    if (selectedCards.length === TOTAL_CARDS_TO_PICK && flippedPositions.length === TOTAL_CARDS_TO_PICK) {
      const timer = setTimeout(() => {
        const cards = selectedCards
          .sort((a, b) => a.position - b.position)
          .map(c => `${c.cardId}:${c.isReversed}`)
          .join(",")
        router.push(`/result?category=${categoryId}&cards=${cards}`)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [selectedCards, flippedPositions, categoryId, router])

  // 카드 선택 핸들러
  const handleCardSelect = (displayIndex: number) => {
    if (isShuffling || selectedCards.length >= TOTAL_CARDS_TO_PICK) return
    if (selectedCards.some(c => c.position === displayIndex)) return

    const cardId = getRandomCard(usedCardIds)
    const isReversed = getRandomBoolean(0.3)

    const newCard: SelectedCard = {
      position: displayIndex,
      cardId,
      isReversed,
    }

    setSelectedCards(prev => [...prev, newCard])
    setUsedCardIds(prev => [...prev, cardId])

    // 카드 뒤집기
    setTimeout(() => {
      setFlippedPositions(prev => [...prev, displayIndex])
    }, 300)
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">카테고리를 찾을 수 없습니다.</p>
      </div>
    )
  }

  const displayCards = Array(DISPLAY_CARD_COUNT).fill(null)
  const cardLabels = ["과거", "현재", "미래"]

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="text-gold-400/80 mb-2">
          <MysticIcon type={category.icon} className="w-10 h-10 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-1 font-serif tracking-wide">
          {category.name}
        </h1>
        <p className="text-sm text-gray-500">{category.description}</p>
      </motion.div>

      {/* 선택 진행 상태 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-4 mb-6"
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                selectedCards.length > i
                  ? "border-gold-400 bg-gold-400/20 text-gold-400"
                  : "border-gray-600 text-gray-600"
              }`}
            >
              {selectedCards.length > i ? (
                <span className="text-xs">&#10003;</span>
              ) : (
                <span className="text-xs">{i + 1}</span>
              )}
            </div>
            <span className="text-[10px] text-gray-500">{cardLabels[i]}</span>
          </div>
        ))}
      </motion.div>

      {/* 안내 문구 */}
      <AnimatePresence mode="wait">
        {isShuffling ? (
          <motion.div
            key="shuffling"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mb-6 h-12"
          >
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gold-400/80 text-sm"
            >
              카드를 섞고 있습니다...
            </motion.p>
          </motion.div>
        ) : selectedCards.length < TOTAL_CARDS_TO_PICK ? (
          <motion.div
            key="select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mb-6 h-12"
          >
            <p className="text-white/90 text-sm">마음을 집중하고 카드를 선택하세요</p>
            <p className="text-xs text-gray-500 mt-1">
              {TOTAL_CARDS_TO_PICK - selectedCards.length}장의 카드를 더 선택해주세요
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-6 h-12"
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-gold-400/80 text-sm"
            >
              카드를 해석하고 있습니다...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 카드 배열 */}
      <div className="relative w-full max-w-2xl h-[320px] flex items-center justify-center">
        <AnimatePresence>
          {isShuffling ? (
            // 오버핸드 셔플 (점잖고 천천히 섞는 타로 스타일)
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* 카드 덱 - 천천히 펼쳤다 모으기 */}
              <div className="relative">
                {Array(7).fill(null).map((_, i) => {
                  const centerIndex = 3
                  const offset = i - centerIndex

                  return (
                    <motion.div
                      key={`shuffle-${i}`}
                      className="absolute"
                      style={{
                        left: '50%',
                        top: '50%',
                        marginLeft: -35,
                        marginTop: -60,
                        zIndex: i,
                      }}
                      initial={{ x: 0, rotate: 0 }}
                      animate={{
                        x: [
                          0,
                          offset * 25,
                          offset * 40,
                          offset * 25,
                          0,
                        ],
                        y: [
                          i * -2,
                          i * -3 - 10,
                          i * -2,
                          i * -3 - 10,
                          i * -2,
                        ],
                        rotate: [
                          offset * 2,
                          offset * 5,
                          offset * 8,
                          offset * 5,
                          offset * 2,
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        times: [0, 0.25, 0.5, 0.75, 1],
                      }}
                    >
                      <TarotCard size="sm" />
                    </motion.div>
                  )
                })}
              </div>

              {/* 은은한 빛 효과 */}
              <motion.div
                className="absolute w-48 h-48 rounded-full bg-gold-400/5 blur-3xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          ) : (
            // 선택 가능한 카드
            <motion.div
              className="flex justify-center gap-2 sm:gap-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {displayCards.map((_, index) => {
                const selectedCard = selectedCards.find(c => c.position === index)
                const isFlipped = flippedPositions.includes(index)
                const isSelected = !!selectedCard
                const selectionOrder = selectedCards.findIndex(c => c.position === index)

                return (
                  <motion.div
                    key={`pick-${index}`}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {isSelected && selectedCard ? (
                      <TarotCard
                        card={tarotCards[selectedCard.cardId]}
                        isFlipped={isFlipped}
                        isReversed={selectedCard.isReversed}
                        isSelected={true}
                        size="md"
                        label={cardLabels[selectionOrder]}
                      />
                    ) : selectedCards.length >= TOTAL_CARDS_TO_PICK ? (
                      <motion.div
                        animate={{ opacity: 0.2, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <TarotCard size="md" />
                      </motion.div>
                    ) : (
                      <TarotCard
                        onClick={() => handleCardSelect(index)}
                        size="md"
                        delay={index * 0.03}
                      />
                    )}
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 선택된 카드 미리보기 */}
      {selectedCards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex gap-6"
        >
          {selectedCards
            .sort((a, b) => {
              const orderA = selectedCards.findIndex(c => c === a)
              const orderB = selectedCards.findIndex(c => c === b)
              return orderA - orderB
            })
            .map((card, idx) => (
              <motion.div
                key={card.position}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-[10px] text-gold-400/50 mb-1 uppercase tracking-wider">
                  {cardLabels[idx]}
                </div>
                <TarotCard
                  card={tarotCards[card.cardId]}
                  isFlipped={true}
                  isReversed={card.isReversed}
                  size="lg"
                />
              </motion.div>
            ))}
        </motion.div>
      )}

      {/* 뒤로가기 버튼 */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => router.push("/")}
        className="mt-8 text-sm text-gray-600 hover:text-gray-400 transition-colors"
      >
        다른 운세 보기
      </motion.button>
    </div>
  )
}

export default function PickPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <motion.p
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-500"
        >
          로딩 중...
        </motion.p>
      </div>
    }>
      <PickContent />
    </Suspense>
  )
}
