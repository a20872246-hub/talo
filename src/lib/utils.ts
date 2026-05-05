import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRandomCard(excludeIds: number[] = []): number {
  const availableIds = Array.from({ length: 22 }, (_, i) => i).filter(
    (id) => !excludeIds.includes(id)
  )
  return availableIds[Math.floor(Math.random() * availableIds.length)]
}

export function getRandomBoolean(probability: number = 0.5): boolean {
  return Math.random() < probability
}

export function getLuckyNumber(): number {
  return Math.floor(Math.random() * 99) + 1
}

export function getLuckyColor(): string {
  const colors = [
    "빨강", "주황", "노랑", "초록", "파랑",
    "남색", "보라", "분홍", "하늘색", "금색",
    "은색", "흰색", "검정", "베이지", "민트"
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export function getLuckyDirection(): string {
  const directions = ["동", "서", "남", "북", "동북", "동남", "서북", "서남"]
  return directions[Math.floor(Math.random() * directions.length)]
}
