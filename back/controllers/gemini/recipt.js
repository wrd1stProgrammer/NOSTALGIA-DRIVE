const { GoogleGenerativeAI } = require('@google/generative-ai');
const runVision = require('./runVision');
const Receipt  = require('../../models/Receipt');
const Mission  = require('../../models/Mission');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const textModel = genAI.getGenerativeModel({
  model: 'gemini-pro',
  generationConfig: { responseMimeType: 'application/json' },
});

const analyzeReceipt = async (req, res) => {
  try {
    const { imageResponse } = req.body;
    const userId = req.user.userId;        // JWT auth 미들웨어
    console.log(imageResponse,'log');
    /* 1. Vision OCR + 탄소계산 */
    const ocrPrompt = `
      You are an OCR + carbon calculator.
      For each line item return:
      { item, price, category, carbon_g }
      Finally return "total_co2_g".
      If the receipt is unreadable return { "error":"UNREADABLE" }.
    `;
    const visionText = await runVision(ocrPrompt, imageResponse);
    if (visionText.includes('"error"')) {
      return res.status(400).json({ message: '이미지를 인식할 수 없습니다.' });
    }
    const parsed = JSON.parse(visionText); // { list:[], total_co2_g }

    /* 2. 3-단계 미션 생성 */
    const missionPrompt = `
      Input total_co2_g = ${parsed.total_co2_g}.
      Create 3 step missions (easy, medium, hard) that together
      reduce at least total_co2_g within 7 days.
      Return JSON array [{title, desc}]
    `;
    const mRes   = await textModel.generateContent(missionPrompt);
    const stages = JSON.parse(mRes.response.text());

    /* 3. DB 저장 */
    const receipt = await Receipt.create({
      user: userId,
      imageResponse,
      ocrJson:  parsed.list,
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

module.exports = {analyzeReceipt}
