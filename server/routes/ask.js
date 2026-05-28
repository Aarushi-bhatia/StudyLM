import express from "express";
import multer from "multer";
import extractTextFromDocument, { isSupportedDocument } from "../utils/extractDocument.js";
import Document from "../models/Document.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { runRAG } from "../rag/rag.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authMiddleware, upload.single("document"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "No question provided" });

    if (!isSupportedDocument(req.file)) {
      return res.status(400).json({
        error: "Unsupported file type. Please upload PDF, DOCX, CSV, XLS, or XLSX files.",
      });
    }

    const documentText = await extractTextFromDocument(req.file);

    const answer = await runRAG(documentText, question);

    await Document.create({
      name: req.file.originalname,
      userId: req.user.id, 
    });

    res.json({ answer });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;