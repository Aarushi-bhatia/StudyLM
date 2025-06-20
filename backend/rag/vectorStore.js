import { Pinecone } from "@pinecone-database/pinecone";

let index;

async function getIndex() {
  if (!index) {
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
    index = pinecone.index(process.env.PINECONE_INDEX_NAME);
  }
  return index;
}

export async function addToStore(embeddings, chunks, docId) {
  const index = await getIndex();
  const vectors = embeddings.map((embedding, i) => ({
    id: `${docId}-${i}-${Date.now()}`, // unique ID
    values: embedding,
    metadata: { chunk: chunks[i], docId },
  }));

  await index.upsert(vectors);
}

export async function retrieveRelevantChunks(questionEmbedding, docId, topK = 3) {
  const index = await getIndex();

  const queryResult = await index.query({
    vector: questionEmbedding,
    topK,
    filter: { docId },
    includeMetadata: true,
  });

  return queryResult.matches.map((match) => match.metadata.chunk);
}
