import { chunkText } from "../utils/chunker";
import { getEmbeddings } from "./embedder";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function processWithRAG(pdfText, question) {
  const chunks = chunkText(pdfText);
  const chunkEmbeddings = await getEmbeddings(chunks);
  addToStore(chunkEmbeddings, chunks);
  const questionEmbedding = (await getEmbeddings([question]))[0];
  const relevantchunks = await retrieveRelevantChunks(questionEmbedding);

  const context = relevantchunks.join("\n");
  const result = await model.generateContent(
    `Use the following context to answer the question.\n\nContext:\n${context}\n\nQuestion: ${question}`
  );
  const response = await result.response;
  return response.text();
}
