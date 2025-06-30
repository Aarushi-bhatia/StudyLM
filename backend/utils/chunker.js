export function chunkText(text, maxLength = 500, overlap = 50) {
  const chunks = [];
  
  // Split by sentences first for better semantic boundaries
  const sentences = text.match(/[^\.!?]+[\.!?]+/g) || [text];
  
  let currentChunk = '';
  
  for (const sentence of sentences) {
    if ((currentChunk + sentence).length <= maxLength) {
      currentChunk += sentence;
    } else {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = sentence;
    }
  }
  
  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}