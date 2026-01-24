import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
const router = express.Router();

import mongoose from "mongoose";

router.use(authMiddleware);

/**
 * Endpoint 1: GET /api/chats
 * Fetches the list of chat titles for the logged-in user's sidebar.
 */
router.get("/", async (req, res) => {
  try {
    const chats = await Chat.find({
      user: new mongoose.Types.ObjectId(req.user.id),
    }).sort({ createdAt: -1 }); // Show newest first
    //   .select('_id title');
    // Only send ID and title

    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

router.get('/:chatId', async (req, res) => {
  try {
    const { chatId } = req.params;
    const userId = new mongoose.Types.ObjectId(req.user.id);

    console.log("--- DEBUGGING 403 ---");
    console.log("Looking for Chat ID:", chatId);
    console.log("Logged in User ID:", userId);
    
    // --- FIX: Manually cast chatId to an ObjectId ---
    const chatObjectId = new mongoose.Types.ObjectId(chatId);

    // 1. Verify this chat belongs to the logged-in user
    const chat = await Chat.findOne({ _id: chatObjectId, user: userId });

    if (!chat) {
      // This was the source of your 403 error
      return res.status(403).json({ error: "Access denied or chat not found" });
    }

    // 2. Fetch all messages for this chat
    const messages = await Message.find({ chat: chatObjectId }) // <-- Use the ObjectId here too
      .sort({ createdAt: 'asc' }) 
      .select('role content'); 

    res.json(messages);

  } catch (err) {
    // This will catch errors if the chatId in the URL is not a valid ObjectId format
    if (err.name === 'BSONError') {
      return res.status(400).json({ error: "Invalid chat ID format" });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

/**
 * Endpoint 3: POST /api/chats
 * Creates a new chat (e.g., when a new PDF is uploaded).
 * Expects { title: "pdf_name.pdf", firstMessageContent: "Hi" }
 */
router.post("/", async (req, res) => {
  const { title, firstMessageContent } = req.body;
  const userId = req.user.id;
// --- ADD THIS LINE ---
  console.log("--- CREATING NEW CHAT ---");
  console.log("USER ID:", userId);
  console.log("REQ BODY:", req.body);
  // ------------------------------
  if (!title || !firstMessageContent) {
    return res.status(400).json({ error: "Missing title or first message" });
  }

  // Use a transaction to ensure both are created or neither is
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Create the new chat
    const newChat = new Chat({
      user: new mongoose.Types.ObjectId(userId),
      title: title,
    });
    const savedChat = await newChat.save({ session });

    // 2. Create the first user message
    const userMessage = new Message({
      chat: savedChat._id,
      role: "user",
      content: firstMessageContent,
    });
    await userMessage.save({ session });

    // 3. (Optional) Create a first model response
    // const modelMessage = new Message({
    //   chat: savedChat._id,
    //   role: 'model',
    //   content: 'Your PDF has been processed. Ask me anything!'
    // });
    // await modelMessage.save({ session });

    // Commit the transaction
    await session.commitTransaction();

    res.status(201).json(savedChat);
  } catch (err) {
    // Roll back transaction on error
    await session.abortTransaction();
    console.error(err);
    res.status(500).json({ error: "Failed to create new chat" });
  } finally {
    session.endSession();
  }
});

/**
 * Endpoint 4: POST /api/chats/:chatId/messages
 * Saves a new message in an existing chat
 */
router.post('/:chatId/messages', async (req, res) => {
  try {
    const { chatId } = req.params;
    const { role, content } = req.body;
    const userId = new mongoose.Types.ObjectId(req.user.id);

    if (!role || !content) {
      return res.status(400).json({ error: "Missing role or content" });
    }

    const chatObjectId = new mongoose.Types.ObjectId(chatId);

    // Verify ownership
    const chat = await Chat.findOne({ _id: chatObjectId, user: userId });
    if (!chat) {
      return res.status(403).json({ error: "Access denied" });
    }

    const message = new Message({
      chat: chatObjectId,
      role,
      content,
    });

    await message.save();
    res.status(201).json(message);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save message" });
  }
});

export default router;
