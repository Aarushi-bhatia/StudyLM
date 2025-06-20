import { chunkText } from "../utils/chunker.js";
import { getEmbeddings } from "./embedder.js";
import { addToStore, retrieveRelevantChunks } from "./vectorStore.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function processWithRAG(pdfText, question, docId = null) {
  try {
    // Generate a docId if not provided
    if (!docId) {
      docId = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Split the PDF text into chunks
    const chunks = chunkText(pdfText);
    console.log(`Created ${chunks.length} chunks`);

    // Get embeddings for each chunk individually
    const chunkEmbeddings = [];
    for (let i = 0; i < chunks.length; i++) {
      console.log(`Processing chunk ${i + 1}/${chunks.length}`);
      try {
        // Pass each chunk as a string, not an array
        const embedding = await getEmbeddings(chunks[i]);
        chunkEmbeddings.push(embedding);
      } catch (error) {
        console.error(`Error processing chunk ${i}:`, error);
        throw error;
      }
    }

    // Add chunks and their embeddings to the vector store
    addToStore(chunkEmbeddings, chunks, docId);

    // Get embedding for the question (pass as string, not array)
    const questionEmbedding = await getEmbeddings(question);

    // Retrieve relevant chunks
    const relevantChunks = await retrieveRelevantChunks(questionEmbedding,docId);

    // Create context from relevant chunks
    const context = relevantChunks.join("\n");

    // Generate response using Gemini
    const result = await model.generateContent(
      `Use the following context to answer the question.\n\nContext:\n${context}\n\nQuestion: ${question}`
    );

    const response = await result.response;
    return response.text();
    
  } catch (error) {
    console.error('Error in processWithRAG:', error);
    throw error;
  }
}