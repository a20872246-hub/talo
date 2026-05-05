"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import CategoryCard from "@/components/CategoryCard"
import MysticIcon from "@/components/MysticIcon"
import { categories } from "@/data/categories"

export default function HomePage() {
  const router = useRouter()

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/pick?category=${categoryId}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        {/* 신비로운 심볼 */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative w-24 h-24 mx-auto mb-6"
        >
          {/* 외곽 원 */}
          <div className="absolute inset-0 border border-gold-400/30 rounded-full" />
          <div className="absolute inset-2 border border-gold-400/20 rounded-full" />
          {/* 중앙 심볼 */}
          <div className="absolute inset-0 flex items-center justify-center text-gold-400">
            <MysticIcon type="moon" className="w-12 h-12" />
          </div>
          {/* 작은 별들 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-400 rounded-full" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-gold-400 rounded-full" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-gold-400 rounded-full" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-gold-400 rounded-full" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold mb-3 gold-glow font-serif tracking-wider">
          오늘의 타로
        </h1>
        <p className="text-lg text-gray-400 mb-2">
          2026년, 세 장의 카드가 전하는 운명의 메시지
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-3 text-gold-400/60 text-sm"
        >
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-gold-400/40" />
          <span>과거 · 현재 · 미래</span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-gold-400/40" />
        </motion.div>
      </motion.div>

      {/* 카테고리 선택 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-2xl"
      >
        <h2 className="text-center text-lg text-gray-300/80 mb-6 font-light">
          알고 싶은 운세를 선택하세요
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => handleCategorySelect(category.id)}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      {/* 하단 안내 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <p className="text-sm text-gray-500">매일 무료로 타로 세 장을 뽑아보세요</p>
        <p className="mt-2 text-xs text-gray-600">
          결과는 재미로만 참고해 주세요
        </p>
      </motion.div>
    </div>
  )
}
