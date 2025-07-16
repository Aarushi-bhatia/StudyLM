import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import askRoutes from "./routes/ask.js";
import authRoutes from "./routes/authRoutes.js"
import helmet from "helmet";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("running");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/api", authRoutes);
app.use("/ask", askRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));