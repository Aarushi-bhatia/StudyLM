// import { chunkText } from "../utils/chunker.js";
// import { getEmbeddings } from "./embedder.js";
// import { addToStore, retrieveRelevantChunks } from "./vectorStore.js";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import geminiApiKey from "../utils/geminiApiKey.js"

// export async function processWithRAG(pdfText, question, docId = null) {
//   try {
//     // Generate a docId if not provided
//     if (!docId) {
//       docId = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//     }

//     console.log(`Processing document with ID: ${docId}`);

//     // Split the PDF text into chunks
//     const chunks = chunkText(pdfText);
//     console.log(`Created ${chunks.length} chunks`);

//     // Debug: Log chunk info
//     console.log('Sample chunk:', chunks[0]);
//     console.log('Average chunk length:', chunks.reduce((sum, chunk) => sum + chunk.length, 0) / chunks.length);

//     // Get embeddings for each chunk individually
//     const chunkEmbeddings = [];
//     for (let i = 0; i < chunks.length; i++) {
//       console.log(`Processing chunk ${i + 1}/${chunks.length}`);
//       try {
//         const embedding = await getEmbeddings(chunks[i]);
//         chunkEmbeddings.push(embedding);
//       } catch (error) {
//         console.error(`Error processing chunk ${i}:`, error);
//         throw error;
//       }
//     }

//     console.log(`Successfully generated ${chunkEmbeddings.length} embeddings`);

//     // Add chunks and their embeddings to the vector store
//     await addToStore(chunkEmbeddings, chunks, docId);

//     // Get embedding for the question
//     console.log('Getting embedding for question:', question);
//     const questionEmbedding = await getEmbeddings(question);

//     // Retrieve relevant chunks
//     const relevantChunks = await retrieveRelevantChunks(questionEmbedding, docId, 5);

//     if (relevantChunks.length === 0) {
//       console.warn('No relevant chunks found for question:', question);
//       return "I couldn't find relevant information in the document to answer your question.";
//     }

//     console.log(`Using ${relevantChunks.length} chunks for context`);

//     // Create context from relevant chunks with better formatting
//     const context = relevantChunks
//       .map((chunk, i) => `[Context ${i + 1}]: ${chunk}`)
//       .join('\n\n');

//     console.log('Context length:', context.length);

//     const genAI = new GoogleGenerativeAI(geminiApiKey.getRandomGeminiKey());
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//     // Enhanced prompt for better responses
//     const prompt = `Based on the following context from the document, answer the question accurately and concisely.

// Context:
// ${context}

// Question: ${question}

// Instructions:
// - Only use information from the provided context
// - If the context doesn't contain enough information to answer the question, say so
// - Be specific and cite relevant details from the context
// - Keep your answer focused and relevant

// Answer:`;

//     // Generate response using Gemini
//     console.log('Generating response...');
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
    
//     console.log('✅ Response generated successfully');
//     return response.text();

//   } catch (error) {
//     console.error('Error in processWithRAG:', error);
//     throw error;
//   }
// }