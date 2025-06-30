import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import {
  GoogleGenerativeAIEmbeddings,
  ChatGoogleGenerativeAI,
} from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import extractTextFromPDF from "./utils/extractPdf.js";

async function debugRAG(question) {
  try {
    const pdfBuffer = fs.readFileSync("sample.pdf");
    const text = await extractTextFromPDF(pdfBuffer);

    // DEBUG: Print extracted text
    // console.log("=== EXTRACTED TEXT ===");
    // console.log(text.substring(0, 500) + "...");
    // console.log("Text length:", text.length);

    // Check if name "Aarushi" is in the extracted text
    const hasAarushi = text.toLowerCase().includes("aarushi");
    console.log("Contains 'Aarushi':", hasAarushi);

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000, // Increased chunk size
      chunkOverlap: 200, // Increased overlap
    });
    const docs = await splitter.createDocuments([text]);

    // DEBUG: Print all chunks
    // console.log("\n=== DOCUMENT CHUNKS ===");
    // docs.forEach((doc, index) => {
    //   console.log(`Chunk ${index}:`, doc.pageContent.substring(0, 200) + "...");
    //   if (doc.pageContent.toLowerCase().includes("aarushi")) {
    //     console.log(`🎯 Chunk ${index} contains 'Aarushi'!`);
    //   }
    // });

    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "embedding-001",
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const vectorstore = await MemoryVectorStore.fromDocuments(docs, embeddings);
    const retriever = vectorstore.asRetriever({ k: 5 }); // Get more chunks

    // DEBUG: Show retrieved chunks
    // const relevantDocs = await retriever.getRelevantDocuments(question);
    // console.log("\n=== RETRIEVED CHUNKS ===");
    // relevantDocs.forEach((doc, index) => {
    //   console.log(
    //     `Retrieved ${index}:`,
    //     doc.pageContent.substring(0, 200) + "..."
    //   );
    //   if (doc.pageContent.toLowerCase().includes("aarushi")) {
    //     console.log(`🎯 Retrieved chunk ${index} contains 'Aarushi'!`);
    //   }
    // });

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-flash",
      temperature: 0.1, 
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const promptTemplate = PromptTemplate.fromTemplate(
      `You are an AI assistant analyzing a resume document. Use ONLY the content from the provided document below to answer the question. Be very careful to extract and mention any names, personal information, or identifying details that appear in the document.

Document Context:
{context}

Question: {question}

Instructions: If you see any names, personal details, or identifying information in the document, make sure to include them in your answer. Look carefully for any personal identifiers.

Answer:`
    );

    const chain = RunnableSequence.from([
      async (input) => {
        const relevantDocs = await retriever.getRelevantDocuments(
          input.question
        );
        return {
          context: relevantDocs.map((d) => d.pageContent).join("\n\n"),
          question: input.question,
        };
      },
      promptTemplate,
      model,
      new StringOutputParser(),
    ]);

    const answer = await chain.invoke({ question });
    // console.log(`\n=== FINAL ANSWER ===`);
    // console.log(`Q: ${question}`);
    // console.log(`A: ${answer}`);

    return answer;
  } catch (error) {
    console.error("Error in RAG pipeline:", error.message);
    throw error;
  }
}

// // Also try a more specific question about the name
// async function testNameRetrieval() {
//   console.log("\n=== TESTING NAME-SPECIFIC QUESTION ===");
//   await debugRAG("What is the name of the person whose resume this is?");
// }

// // Run both tests
// debugRAG("how much cgp did she get in college?")
//   .then(() => testNameRetrieval())
//   .catch((error) => {
//     console.error("Failed to run RAG:", error.message);
//   });
