import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import uploadHandler from "./api/upload";
import askHandler from "./api/ask";

dotenv.config();

const app = express();
app.use(cors({
  origin: ["https://doc-chat-xi.vercel.app/"]
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Define API routes
app.post("/api/upload", uploadHandler);
app.post("/api/ask", askHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
