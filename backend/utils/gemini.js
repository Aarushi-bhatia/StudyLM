import { GoogleGenerativeAI } from "@google/generative-ai";
import keyManager from "./geminiKeyManager.js";

const key = keyManager.getRandomGeminiKey();
const genAI = new GoogleGenerativeAI(key);

export default genAI;