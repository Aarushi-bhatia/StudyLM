import express from "express";
import multer from "multer";
import extractTextFromPDF from "../utils/extractPdf.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import mongoose from "mongoose";
import Document from "../models/Document.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { runRAG } from "../rag/rag.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", authMiddleware, upload.single("document"), async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const { question } = req.body;
    if (!question) return res.status(400).json({ error: "No question provided" });

    const userId = new mongoose.Types.ObjectId(req.user.id);
    const pdfText = await extractTextFromPDF(req.file.buffer);

   const answer = await runRAG(pdfText, question);
// 1. Create the new Chat
    const newChat = new Chat({
      user: userId,
      title: req.file.originalname,
    });
    const savedChat = await newChat.save({ session });
    const chatId = savedChat._id;

    // 2. Save the User's question
    const userMessage = new Message({
      chat: chatId,
      role: "user",
      content: question,
    });
    await userMessage.save({ session });

    // 3. Save the Model's answer
    const modelMessage = new Message({
      chat: chatId,
      role: "model",
      content: answer,
    });
    await modelMessage.save({ session });
    // Save doc metadata to DB
    // await Document.create({
    //   name: req.file.originalname,
    //   userId: req.user.id, 
    // });
await session.commitTransaction();

    // Send back the answer AND the new chat's ID (for your frontend)
    res.json({ 
      answer,
      chatId: chatId 
    });

  } catch (error) {
    // If anything fails, roll back all database changes
    await session.abortTransaction();
    console.error("Error in /ask route:", error);
    res.status(500).json({ error: error.message });
  } finally {
    // End the session
    session.endSession();
  }
});

export default router;