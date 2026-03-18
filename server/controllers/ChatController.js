import mongoose from "mongoose";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

// /**
//  * Helper: Auto-generate a short title from the first user message.
//  * Takes the first ~50 chars and appends "..." if truncated.
//  */
// function generateTitle(message) {
//   const cleaned = message.replace(/\s+/g, " ").trim();
//   if (cleaned.length <= 50) return cleaned;
//   return cleaned.substring(0, 50).trim() + "...";
// }

/**
 * GET /api/chats
 * Returns all chats for the logged-in user, sorted by updatedAt DESC.
 * Includes title, lastMessagePreview, and timestamps for sidebar display.
 */
export const getAllChats = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const chats = await Chat.find({ user: userId })
      .sort({ updatedAt: -1 })
      .select("_id title pdfId lastMessagePreview createdAt updatedAt");

    res.json(chats);
  } catch (err) {
    console.error("Error fetching chats:", err);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};

/**
 * GET /api/chats/:chatId/messages
 * Returns the full conversation history for a specific chat.
 * Verifies ownership before returning messages.
 */
export const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const chatObjectId = new mongoose.Types.ObjectId(chatId);

    // Verify this chat belongs to the logged-in user
    const chat = await Chat.findOne({ _id: chatObjectId, user: userId });
    if (!chat) {
      return res.status(403).json({ error: "Access denied or chat not found" });
    }

    const messages = await Message.find({ chat: chatObjectId })
      .sort({ createdAt: "asc" })
      .select("role content createdAt");

    // Also return chat metadata so frontend can restore PDF context
    res.json({
      chat: {
        _id: chat._id,
        title: chat.title,
        pdfId: chat.pdfId,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
      },
      messages,
    });
  } catch (err) {
    if (err.name === "BSONError") {
      return res.status(400).json({ error: "Invalid chat ID format" });
    }
    console.error("Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

/**
 * POST /api/chats/message
 * Unified message endpoint:
 *   - If chatId is NOT provided → creates a new chat + saves user message
 *   - If chatId IS provided → appends user message to existing chat
 *
 * Then runs RAG pipeline and saves the AI response.
 *
 * Body: { chatId?, content, pdfId? }
 * File: PDF file (multipart/form-data via "document" field)
 */
export const sendMessage = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const { chatId, content, pdfId } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Message content is required" });
    }

    // Dynamic import to avoid circular deps
    const { runRAG } = await import("../rag/rag.js");
    const extractTextFromPDF = (await import("../utils/extractPdf.js")).default;

    let chat;
    let isNewChat = false;

    // ─── EXISTING CHAT ───
    if (chatId) {
      const chatObjectId = new mongoose.Types.ObjectId(chatId);
      chat = await Chat.findOne({ _id: chatObjectId, user: userId });
      if (!chat) {
        await session.abortTransaction();
        session.endSession();
        return res.status(403).json({ error: "Access denied or chat not found" });
      }
    }
    // ─── NEW CHAT ───
    else {
      if (!req.file) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ error: "PDF file is required for a new chat" });
      }

      // const title = generateTitle(content);
      chat = new Chat({
        user: userId,
        pdfId: pdfId || req.file?.originalname || null,
        title : req.file?.originalname || "Untitled Document",
        lastMessagePreview: content.substring(0, 100),
      });
      await chat.save({ session });
      isNewChat = true;
    }

    // ─── SAVE USER MESSAGE ───
    const userMessage = new Message({
      chat: chat._id,
      role: "user",
      content: content.trim(),
    });
    await userMessage.save({ session });

    // ─── RUN RAG PIPELINE ───
    let answerText = "Sorry, I couldn't process the document.";

    if (req.file) {
      // PDF was uploaded with this message
      const pdfText = await extractTextFromPDF(req.file.buffer);
      answerText = await runRAG(pdfText, content);
    } else if (!req.file && chatId) {
      // Continuing conversation — re-use PDF context
      // For follow-up questions without a new PDF upload,
      // the frontend should re-send the PDF or we need stored text.
      // For now, return a message asking to re-upload
      answerText = "Please re-upload the PDF to continue asking questions, or start a new chat.";

      // If the frontend sends the PDF on every message, this block won't execute.
      if (req.file) {
        const pdfText = await extractTextFromPDF(req.file.buffer);
        answerText = await runRAG(pdfText, content);
      }
    }

    // ─── SAVE AI RESPONSE ───
    const aiMessage = new Message({
      chat: chat._id,
      role: "model",
      content: answerText,
    });
    await aiMessage.save({ session });

    // ─── UPDATE CHAT METADATA ───
    chat.lastMessagePreview = content.substring(0, 100);
    chat.updatedAt = new Date();
    await chat.save({ session });

    await session.commitTransaction();

    res.status(isNewChat ? 201 : 200).json({
      chatId: chat._id,
      title: chat.title,
      isNewChat,
      userMessage: {
        _id: userMessage._id,
        role: userMessage.role,
        content: userMessage.content,
        createdAt: userMessage.createdAt,
      },
      aiMessage: {
        _id: aiMessage._id,
        role: aiMessage.role,
        content: aiMessage.content,
        createdAt: aiMessage.createdAt,
      },
    });
  } catch (err) {
    await session.abortTransaction();
    console.error("Error in sendMessage:", err);
    res.status(500).json({ error: err.message || "Failed to process message" });
  } finally {
    session.endSession();
  }
};

/**
 * DELETE /api/chats/:chatId
 * Deletes a chat and all its messages.
 */
export const deleteChat = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { chatId } = req.params;
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const chatObjectId = new mongoose.Types.ObjectId(chatId);

    const chat = await Chat.findOne({ _id: chatObjectId, user: userId });
    if (!chat) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ error: "Access denied or chat not found" });
    }

    // Delete all messages belonging to this chat
    await Message.deleteMany({ chat: chatObjectId }, { session });
    // Delete the chat itself
    await Chat.deleteOne({ _id: chatObjectId }, { session });

    await session.commitTransaction();
    res.json({ message: "Chat deleted successfully" });
  } catch (err) {
    await session.abortTransaction();
    console.error("Error deleting chat:", err);
    res.status(500).json({ error: "Failed to delete chat" });
  } finally {
    session.endSession();
  }
};
