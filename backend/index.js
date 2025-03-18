import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import OpenAI from "openai";
import fs from "fs";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const storage = multer.memoryStorage();
const upload = multer({ storage });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/upload", upload.single("document"), async (req, res) => {
  try {
    const text = req.file.buffer.toString("utf-8");

    const response = await openai.completions.create({
      model: "gpt-4",
      prompt: `Summarize this document:\n\n${text}`,
      max_tokens: 200,
    });

    res.json({ summary: response.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
