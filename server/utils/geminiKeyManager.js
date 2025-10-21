import dotenv from 'dotenv'
dotenv.config()

const GEMINI_API_KEY = [
  { username: 'user_1', key: process.env.GEMINI_API_KEY },
  { username: 'user_2', key: process.env.GEMINI_API_KEY_API2 },
  { username: 'user_3', key: process.env.GEMINI_API_KEY_API3 },
  { username: 'user_4', key: process.env.GEMINI_API_KEY_API4 }
]

function getRandomGeminiKey() {
  const validKeys = GEMINI_API_KEY.filter(k => k.key); // Skip undefined ones
  const randomIndex = Math.floor(Math.random() * validKeys.length);
  return validKeys[randomIndex].key;
}

export default { GEMINI_API_KEY, getRandomGeminiKey }