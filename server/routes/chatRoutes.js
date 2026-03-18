import express from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllChats,
  getChatMessages,
  sendMessage,
  deleteChat,
} from "../controllers/ChatController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authMiddleware);

/**
 * GET /api/chats
 * Returns all chats for logged-in user (sidebar list), sorted by updatedAt DESC.
 */
router.get("/", getAllChats);

/**
 * GET /api/chats/:chatId/messages
 * Returns full conversation history for a specific chat.
 */
router.get("/:chatId/messages", getChatMessages);

/**
 * POST /api/chats/message
 * Unified message endpoint:
 *   - No chatId → creates a new chat session + sends first message + gets AI reply
 *   - With chatId → appends to existing chat + gets AI reply
 * Accepts multipart/form-data with optional "document" (PDF) field.
 */
router.post("/message", upload.single("document"), sendMessage);

/**
 * DELETE /api/chats/:chatId
 * Deletes a chat and all its messages.
 */
router.delete("/:chatId", deleteChat);

export default router;