export function chunkText(text, maxLength = 500) {
  const words = text.split(/\s+/);
  const chunks = [];

  for (let i = 0; i < words.length; i += maxLength) {
    const chunk = words.slice(i, i + maxLength).join(" ");
    chunks.push(chunk);
  }

  return chunks;
}
