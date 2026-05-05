import { NextRequest, NextResponse } from "next/server"
import { tarotCards } from "@/data/tarot-cards"
import { categories } from "@/data/categories"
import { Category, InterpretationResponse } from "@/types/tarot"
import { getLuckyNumber, getLuckyColor, getLuckyDirection } from "@/lib/utils"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cardId, category, isReversed } = body as {
      cardId: number
      category: Category
      isReversed: boolean
    }

    const card = tarotCards[cardId]
    const categoryInfo = categories.find((c) => c.id === category)

    if (!card || !categoryInfo) {
      return NextResponse.json(
        { error: "Invalid card or category" },
        { status: 400 }
      )
    }

    // AI API 연동 시 이 부분을 OpenAI/Claude API 호출로 대체
    // 현재는 미리 정의된 해석 사용
    const cardData = isReversed ? card.reversed : card.upright

    const interpretation = generateInterpretation(card, categoryInfo, cardData, isReversed)
    const advice = generateAdvice(cardData, category)

    const response: InterpretationResponse = {
      interpretation,
      advice,
      luckyItems: {
        number: getLuckyNumber(),
        color: getLuckyColor(),
        direction: getLuckyDirection(),
      },
    }

    return NextResponse.json(response)
  } catch {
    return NextResponse.json(
      { error: "Failed to generate interpretation" },
      { status: 500 }
    )
  }
}

function generateInterpretation(
  card: typeof tarotCards[0],
  categoryInfo: typeof categories[0],
  cardData: typeof tarotCards[0]["upright"],
  isReversed: boolean
): string {
  const direction = isReversed ? "역방향" : "정방향"
  const year = new Date().getFullYear()

  let intro = `${card.nameKo} 카드가 ${direction}으로 나왔습니다.\n\n`
  intro += `💫 핵심 메시지\n${cardData.meaning}\n\n`

  let categoryMessage = ""
  switch (categoryInfo.id) {
    case "yearly":
      categoryMessage = `🌟 ${year}년 총운\n당신의 한 해는 "${card.keywords[0]}"의 에너지로 가득할 것입니다. ${cardData.meaning}\n\n`
      categoryMessage += `💕 연애/인간관계: ${cardData.love}\n\n`
      categoryMessage += `💼 직장/사업: ${cardData.career}\n\n`
      categoryMessage += `💰 재물: ${cardData.money}`
      break
    case "love":
      categoryMessage = `💕 연애운 상세 해석\n${cardData.love}`
      break
    case "marriage":
      categoryMessage = `💍 결혼운 상세 해석\n${cardData.love}\n\n진정한 인연은 서로를 성장시킵니다. 지금 만나고 있는 사람이든, 앞으로 만날 사람이든, 서로에게 좋은 영향을 주고받을 수 있는 관계를 지향하세요.`
      break
    case "career":
      categoryMessage = `💼 직장/사업운 상세 해석\n${cardData.career}`
      break
    case "money":
      categoryMessage = `💰 재물운 상세 해석\n${cardData.money}`
      break
    case "health":
      categoryMessage = `💚 건강운 상세 해석\n${cardData.health}`
      break
  }

  return intro + categoryMessage
}

function generateAdvice(
  cardData: typeof tarotCards[0]["upright"],
  category: Category
): string[] {
  const adviceList: string[] = []

  // 카테고리별 기본 조언
  switch (category) {
    case "yearly":
      adviceList.push("매월 첫째 주에 목표를 점검하고 조정하세요")
      adviceList.push("새로운 인연을 만날 기회를 적극적으로 찾으세요")
      adviceList.push("건강을 위해 규칙적인 생활 습관을 유지하세요")
      break
    case "love":
      adviceList.push("솔직한 감정 표현이 관계를 더 깊게 합니다")
      adviceList.push("상대방의 이야기에 귀 기울이세요")
      adviceList.push("작은 것에도 감사하는 마음을 표현하세요")
      break
    case "marriage":
      adviceList.push("서두르지 말고 자연스러운 흐름을 따르세요")
      adviceList.push("가족과의 관계도 소중히 여기세요")
      adviceList.push("경제적 기반을 함께 준비해 나가세요")
      break
    case "career":
      adviceList.push("네트워킹의 힘을 과소평가하지 마세요")
      adviceList.push("새로운 기술이나 지식을 꾸준히 습득하세요")
      adviceList.push("멘토나 조언자를 찾아보세요")
      break
    case "money":
      adviceList.push("수입의 일정 부분을 저축하는 습관을 들이세요")
      adviceList.push("충동구매를 줄이고 계획적으로 소비하세요")
      adviceList.push("부수입 창출 방법을 고민해보세요")
      break
    case "health":
      adviceList.push("규칙적인 운동으로 체력을 기르세요")
      adviceList.push("충분한 수면과 휴식을 취하세요")
      adviceList.push("정기적인 건강검진을 받으세요")
      break
  }

  return adviceList
}
