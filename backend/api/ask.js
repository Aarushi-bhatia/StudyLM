import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDocument } from "pdfjs-dist";

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  upload.single("document")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: "File upload error" });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { question } = req.body; // Get the question from the request body

      if (!question) {
        return res.status(400).json({ error: "No question provided" });
      }

      // Extract text from the PDF file using pdfjs-dist
      const pdfData = new Uint8Array(req.file.buffer);
      const pdf = await getDocument(pdfData).promise;
      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(" ");
      }

      // Use Gemini API to answer the question
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent(`Answer the following question based on the document:\n\nQuestion: ${question}\n\nDocument:\n${text}`);
      const response = await result.response;
      const answer = response.text(); // Correctly access the text content

      res.json({ answer });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  });
}
