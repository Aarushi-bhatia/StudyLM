import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getAnswerFromGemini(question, documentText) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(`Answer the following question based on the document:\n\nQuestion: ${question}\n\nDocument:\n${documentText}`);
    
    const response = await result.response;
    return response.text(); // Extract answer text
  } catch (error) {
    throw new Error("Failed to generate response from Gemini AI.");
  }
}
