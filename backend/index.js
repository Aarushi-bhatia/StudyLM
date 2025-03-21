import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { PDFExtract } from "pdf.js-extract";

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const pdfExtract = new PDFExtract();


const extractTextFromPDF = async (buffer) => {
  return new Promise((resolve, reject) => {
    pdfExtract.extractBuffer(buffer, {}, (err, data) => {
      if (err) return reject(err);
      const extractedText = data.pages
        .map(page => page.content.map(item => item.str).join(" "))
        .join("\n");
      resolve(extractedText);
    });
  });
};

app.post("/upload", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Extract text from the PDF file using pdfjs-dist
    const text = await extractTextFromPDF(req.file.buffer);

    // Summarize the extracted text using Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(`Summarize the following text:\n\n${text}`);
    const response = await result.response;
    const summary = response.text(); // Correctly access the text content

    res.json({ summary });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/ask", upload.single("document"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { question } = req.body; // Get the question from the request body

    if (!question) {
      return res.status(400).json({ error: "No question provided" });
    }

    // Extract text from the PDF file using pdfjs-dist
    const text = await extractTextFromPDF(req.file.buffer);

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

app.listen(process.env.PORT, () => console.log("Server running"));