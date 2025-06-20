import express from "express";
import multer from "multer";
import extractTextFromPDF from "../utils/extractPdf.js";
import { processWithRAG } from "../rag/ragEngine.js";
import Document from "../models/Document.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.post("/", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { question } = req.body; 

    if (!question) {
      return res.status(400).json({ error: "No question provided" });
    }

    const pdfText = await extractTextFromPDF(req.file.buffer);

     const doc = await Document.create({
      name: req.file.originalname,
      userId: "test-user",
      chunkCount: pdfText.split(" ").length
    });

   
    const answer = await processWithRAG(pdfText, req.body.question); 

    res.json({ answer });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router