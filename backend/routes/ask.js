import express from "express";
import multer from "multer";
import extractTextFromPDF from "../utils/extractPdf.js";
import Document from "../models/Document.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import genAI from "../utils/gemini.js"; 

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "No question provided" });

    const pdfText = await extractTextFromPDF(req.file.buffer);

    const truncatedText = pdfText.slice(0, 10000);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`Answer the following question based on the document:\n\nQuestion: ${question}\n\nDocument:\n${truncatedText}`);
    const response = await result.response;
    const answer = response.text();

    // Save doc metadata to DB
    await Document.create({
      name: req.file.originalname,
      userId: "test", 
    });

    res.json({ answer });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;