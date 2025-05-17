// controllers/gemini/runVision.js
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI  = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const vision = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });


module.exports = async function runVision(prompt, imageUrl) {
  /* 1) 이미지 다운로드 → base64 */
  const { data: buffer, headers } = await axios.get(imageUrl, {
    responseType: 'arraybuffer',
  });
  const mimeType = headers['content-type'] || 'image/jpeg';
  const b64      = Buffer.from(buffer).toString('base64');

  /* 2) Vision generateContent (parts 배열) */
  const result = await vision.generateContent([
    { text: prompt },
    {
      inlineData: {
        mimeType,   // 예: 'image/jpeg'
        data: b64,
      },
    },
  ]);

  return result.response.text();  // JSON string
};
