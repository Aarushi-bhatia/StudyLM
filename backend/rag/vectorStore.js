// import { Pinecone } from "@pinecone-database/pinecone";

// let index;

// async function getIndex() {
//   if (!index) {
//     const pinecone = new Pinecone({
//       apiKey: process.env.PINECONE_API_KEY,
//     });
//     index = pinecone.index(process.env.PINECONE_INDEX_NAME);
//   }
//   return index;
// }

// export async function addToStore(embeddings, chunks, docId) {
//   try {
//     const index = await getIndex();
    
//     // Create vectors with proper format
//     const vectors = embeddings.map((embedding, i) => ({
//       id: `${docId}-${i}-${Date.now()}`,
//       values: embedding,
//       metadata: { 
//         chunk: chunks[i], 
//         docId,
//         chunkIndex: i 
//       },
//     }));

//     console.log(`Upserting ${vectors.length} vectors to namespace: ${docId}`);

//     // Fix: Pass vectors directly in the upsert call
//     await index.namespace(docId).upsert(vectors);
    
//     console.log(`✅ Successfully upserted ${vectors.length} vectors`);
//   } catch (error) {
//     console.error('Error in addToStore:', error);
//     throw error;
//   }
// }

// export async function retrieveRelevantChunks(questionEmbedding, docId, topK = 5) {
//   try {
//     const index = await getIndex();

//     if (!docId) {
//       console.warn("No docId provided");
//       return [];
//     }

//     console.log(`Querying namespace: ${docId} with topK: ${topK}`);

//     const queryOptions = {
//       vector: questionEmbedding,
//       topK,
//       includeMetadata: true,
//     };

//     // Query the specific namespace
//     const queryResult = await index.namespace(docId).query(queryOptions);

//     console.log(`Retrieved ${queryResult.matches.length} matches`);
    
//     // Log similarity scores for debugging
//     queryResult.matches.forEach((match, i) => {
//       console.log(`Match ${i + 1}: Score ${match.score.toFixed(4)} - ${match.metadata.chunk.substring(0, 100)}...`);
//     });

//     return queryResult.matches.map((match) => match.metadata.chunk);
//   } catch (error) {
//     console.error('Error in retrieveRelevantChunks:', error);
//     throw error;
//   }
// }