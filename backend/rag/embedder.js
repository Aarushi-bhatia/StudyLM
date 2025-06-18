import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model : "embedding-001"})

export async function embedTexts(texts){
    const result = await model.embedContent({ content : texts})
    return result.embedding.values
}