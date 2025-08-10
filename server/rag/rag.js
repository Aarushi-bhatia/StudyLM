import dotenv from "dotenv";
dotenv.config();

import {
  GoogleGenerativeAIEmbeddings,
  ChatGoogleGenerativeAI,
} from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";

/**
 * Returns a general-purpose prompt for document-based Q&A.
 */
function getPromptTemplate() {
  return PromptTemplate.fromTemplate(`
You are an intelligent assistant. Your task is to answer questions using ONLY the text from the uploaded document.

Guidelines:
- Use only the given document context.
- Do NOT include unrelated content.
- If the answer is not found, say: "Not available in document."

---
Document:
{context}

Question: {question}
---
Answer:
`);
}

/**
 * Extracts the top N chunks based on both embedding similarity and keyword match.
 */
function rankChunksByKeywordMatch(question, docs, topK = 5) {
  const keywords = question.toLowerCase().split(/\W+/).filter(Boolean);
  
  const scored = docs.map((doc) => {
    const content = doc.pageContent.toLowerCase();
    const keywordHits = keywords.filter((k) => content.includes(k)).length;
    return { doc, score: keywordHits };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.doc);
}

/**
 * Runs the full RAG pipeline using Langchain + Gemini + MemoryVectorStore
 */
export async function runRAG(text, question) {
  try {
    // Step 1: Split text into documents
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const docs = await splitter.createDocuments([text]);

    // Step 2: Embed chunks and store in vector DB
    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "embedding-001",
      apiKey: process.env.GOOGLE_API_KEY,
    });
    const vectorstore = await MemoryVectorStore.fromDocuments(docs, embeddings);
    const retriever = vectorstore.asRetriever({ k: 12 }); // wider initial recall

    // Step 3: Gemini model setup
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0,
      systemInstruction:
        "Answer using only the document content. If not found, reply 'Not available in document.'",
    });

    const promptTemplate = getPromptTemplate();

    // Step 4: Define the RAG chain
    const chain = RunnableSequence.from([
      async (input) => {
        const initialDocs = await retriever.getRelevantDocuments(input.question);
        
        // const topDocs = rankChunksByKeywordMatch(input.question, initialDocs, 5);
        return {
          context: initialDocs.map((d) => d.pageContent).join("\n\n"),
          question: input.question,
        };
      },
      promptTemplate,
      model,
      new StringOutputParser(),
    ]);

    // Step 5: Run and return
    const answer = await chain.invoke({ question });
    console.log(answer)
    return answer.trim();
  } catch (err) {
    console.error("❌ RAG Error:", err.message);
    return "Something went wrong while processing the document.";
  }
}
