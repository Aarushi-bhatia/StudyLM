import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  name: String,
  userId: String,
  chunkCount: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Document", DocumentSchema);