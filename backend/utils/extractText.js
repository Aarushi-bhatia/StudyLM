import { getDocument } from "pdfjs-dist";

export default async function extractTextFromPDF(pdfBuffer) {
  try {
    const pdfData = new Uint8Array(pdfBuffer);
    const pdf = await getDocument(pdfData).promise;
    let extractedText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      extractedText += content.items.map(item => item.str).join(" ");
    }

    return extractedText;
  } catch (error) {
    throw new Error("Failed to extract text from PDF.");
  }
}
