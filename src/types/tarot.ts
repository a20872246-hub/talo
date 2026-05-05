export interface TarotCard {
  id: number
  name: string
  nameKo: string
  keywords: string[]
  upright: {
    meaning: string
    love: string
    career: string
    money: string
    health: string
  }
  reversed: {
    meaning: string
    love: string
    career: string
    money: string
    health: string
  }
  image: string
}

export type Category =
  | "yearly"    // 2026 총운
  | "love"      // 연애운
  | "marriage"  // 결혼운
  | "career"    // 직장/사업운
  | "money"     // 재물운
  | "health"    // 건강운

export interface CategoryInfo {
  id: Category
  name: string
  icon: string
  description: string
  color: string
}

export interface ReadingResult {
  card: TarotCard
  category: Category
  isReversed: boolean
  interpretation: string
  advice: string[]
  luckyItems: {
    number: number
    color: string
    direction: string
  }
}

export interface InterpretationRequest {
  cardId: number
  category: Category
  isReversed: boolean
}

export interface InterpretationResponse {
  interpretation: string
  advice: string[]
  luckyItems: {
    number: number
    color: string
    direction: string
  }
}
