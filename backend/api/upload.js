import multer from "multer";
import extractTextFromPDF from "../utils/extractText.js";
import { getAnswerFromGemini } from "../utils/geminiAI.js";

// Middleware for file upload using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://doc-chat-xi.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  upload.single("document")(req, res, async (err) => {
    if (err) return res.status(500).json({ error: "File upload error" });

    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const { question } = req.body;
      if (!question) return res.status(400).json({ error: "No question provided" });

      // Extract text from PDF
      const documentText = await extractTextFromPDF(req.file.buffer);

      // Get AI-generated answer
      const answer = await getAnswerFromGemini(question, documentText);

      res.json({ answer });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: error.message });
    }
  });
}
