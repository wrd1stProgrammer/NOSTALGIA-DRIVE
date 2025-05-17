const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

// basic setting

const geminai = async() => {
    const prompt = ""
  
    console.log('processing...');
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
  
    console.log(text);
}

module.exports = {geminai}