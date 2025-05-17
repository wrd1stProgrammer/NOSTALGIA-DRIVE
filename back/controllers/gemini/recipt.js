// controllers/gemini/receipt.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const runVision            = require('./runVision');
const parseVisionReceipt   = require('./parseVisionReceipt');
const Receipt              = require('../../models/Receipt');
const Mission              = require('../../models/Mission');

const genAI    = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const textModel = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',                 // 텍스트 전용
  generationConfig: { responseMimeType: 'text/plain' },
});

exports.analyzeReceipt = async (req, res) => {
  try {
    const { imageResponse } = req.body;           // S3 공개 URL
    const userId = req.user.userId;

    /* ---------- 1. Vision OCR + 탄소 계산 ---------- */
    const ocrPrompt = `
# 역할
당신은 “영수증 해석 + 탄소배출 산정 AI” 입니다.
사용자가 구입한 품목이 전 지구적 관점에서 **얼마나 탄소를 배출했는지(g CO₂e)** 정량화해 주세요.

# 출력 JSON 형식
{
  "items": [
    { "item": "...", "price": 0, "category": "...", "carbon_g": 0 }
  ],
  "total_co2_g": 0
}

# 탄소배출 계수(예시)
음료(매장) 150 g, 음료(테이크아웃) 210 g, 베이커리 300 g/개,
육류 50 g×g중량, 채소 50 g/100g, 과일 80 g/100g,
일회용 컵·플라스틱 포장 추가 시 +60 g

# 규칙
1. category 는 반드시 한국어, 매장/테이크아웃 구분.
2. 수량·사이즈·포장 단서를 반영해 carbon_g 조정.
3. 영수증 인식 실패 시 {"error":"UNREADABLE"} 만 반환.
JSON 이외 어떠한 장식도 출력하지 마세요.
    `.trim();

    const visionText = await runVision(ocrPrompt, imageResponse);

    if (visionText.includes('"error"')) {
      return res.status(400).json({ message: '이미지를 인식할 수 없습니다.' });
    }
    const parsed = parseVisionReceipt(visionText); // { items, total_co2_g }

    /* ---------- 2. 3-단계 미션 생성 ---------- */
    const missionPrompt = `
# 역할
당신은 “개인 맞춤 탄소저감 코치” 입니다.
아래 영수증 항목을 바탕으로, 사용자가 **${parsed.total_co2_g} g CO₂e** 를
줄일 수 있도록 EASY·MEDIUM·HARD 3단계 미션을 설계하세요.

# 입력 항목
${JSON.stringify(parsed.items, null, 2)}

# 출력 형식 (JSON 배열)
[
  {
    "title": "EASY · 머그컵 사용하기",
    "desc":  "다회용 컵으로 음료 주문 (1주일 동안 5회)",
    "expected_reduction_g": 60
  },
  ...
]

# 규칙
1. EASY → MEDIUM → HARD 순으로 난이도·절감량이 증가.
2. 미션은 입력 항목과 직접 연관된 행동이어야 함.
3. expected_reduction_g 총합 ≥ ${parsed.total_co2_g}.
4. 모든 텍스트는 한국어, 코드블록/설명은 금지.
    `.trim();

    const missionRes  = await textModel.generateContent(missionPrompt);
    const stages      = JSON.parse(missionRes.response.text()
                         .replace(/```(?:json)?|```/gi,'').trim());

    /* ---------- 3. DB 저장 ---------- */
    const receipt = await Receipt.create({
      user:       userId,
      imageResponse,
      ocrJson:    parsed.items,
      totalCarbon: parsed.total_co2_g,
    });

    const mission = await Mission.create({
      user: userId,
      receipt: receipt._id,
      stages,
    });

    res.status(201).json({ mission, receipt });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gemini 분석 실패' });
  }
};
