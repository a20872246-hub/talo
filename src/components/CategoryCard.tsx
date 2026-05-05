"use client"

import { motion } from "framer-motion"
import { CategoryInfo } from "@/types/tarot"
import { cn } from "@/lib/utils"
import MysticIcon from "./MysticIcon"

interface CategoryCardProps {
  category: CategoryInfo
  onClick: () => void
  index: number
}

export default function CategoryCard({ category, onClick, index }: CategoryCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "relative p-6 rounded-2xl overflow-hidden",
        "bg-gradient-to-br from-[#1a1a2e]/80 to-[#16213e]/80",
        "backdrop-blur-sm",
        "shadow-lg shadow-black/30",
        "border border-gold-400/20",
        "group cursor-pointer",
        "hover:border-gold-400/40 transition-colors duration-300"
      )}
    >
      {/* 신비로운 빛 효과 */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-t from-gold-400/10 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 text-left">
        <div className="text-gold-400/80 mb-3 group-hover:text-gold-400 transition-colors">
          <MysticIcon type={category.icon} className="w-10 h-10" />
        </div>
        <h3 className="text-lg font-bold text-white/90 mb-1 group-hover:text-white transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors">
          {category.description}
        </p>
      </div>

      {/* 코너 장식 */}
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-gold-400/30" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-gold-400/30" />
    </motion.button>
  )
}
