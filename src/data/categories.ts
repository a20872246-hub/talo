import { CategoryInfo } from "@/types/tarot"

export const categories: CategoryInfo[] = [
  {
    id: "yearly",
    name: "2026 총운",
    icon: "yearly",
    description: "올해 전체적인 흐름",
    color: "from-amber-500 to-yellow-600",
  },
  {
    id: "love",
    name: "연애운",
    icon: "love",
    description: "새로운 만남, 현재 관계",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "marriage",
    name: "결혼운",
    icon: "marriage",
    description: "결혼 시기, 인연",
    color: "from-purple-500 to-violet-600",
  },
  {
    id: "career",
    name: "직장/사업운",
    icon: "career",
    description: "커리어, 승진, 사업 성공",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "money",
    name: "재물운",
    icon: "money",
    description: "금전, 투자, 재산",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "health",
    name: "건강운",
    icon: "health",
    description: "건강 관리 포인트",
    color: "from-teal-500 to-cyan-600",
  },
]
