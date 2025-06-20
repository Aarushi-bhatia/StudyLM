import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use the embeddings model correctly via getGenerativeModel
const model = genAI.getGenerativeModel({ model: "embedding-001" });

export async function getEmbeddings(text) {
  try {
    console.log('=== EMBEDDING DEBUG ===');
    console.log('Input text type:', typeof text);
    console.log('Input text length:', text?.length);
    console.log('Text preview:', text?.substring(0, 100) + '...');
    
    // Validate input
    if (!text || typeof text !== 'string') {
      throw new Error(`Invalid input: expected string, got ${typeof text}`);
    }
    
    if (text.trim().length === 0) {
      throw new Error('Input text is empty');
    }

    console.log('Calling embedContent...');
    
    // Call embedContent with the text directly
    const result = await model.embedContent(text);
    
    console.log('Embedding result received');
    console.log('Embedding values length:', result.embedding.values.length);
    console.log('First few embedding values:', result.embedding.values.slice(0, 5));
    console.log('=== END EMBEDDING DEBUG ===');
    
    return result.embedding.values;
  } catch (error) {
    console.error('=== EMBEDDING ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error details:', error.errorDetails);
    console.error('========================');
    throw error;
  }
}