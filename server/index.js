import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import askRoutes from "./routes/ask.js";
import authRoutes from "./routes/authRoutes.js"
import helmet from "helmet";
import passport from "passport";
import session from "express-session";
import jwt from "jsonwebtoken";
import "./passportConfig.js";

dotenv.config();
const app = express();
app.use(cors({origin: "http://localhost:5173",
  credentials: true,}));
app.use(express.json());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("running");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

  app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", authRoutes);
app.use("/ask", askRoutes);
// Google login
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback
app.get(
  "/auth/google/callback",
  (req, res, next) => {
    console.log("🔹 Entered /auth/google/callback route");
    next();
  },
  passport.authenticate("google", { failureRedirect: "/fail" }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, name: req.user.name, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("🔹 JWT token generated:", token);
    res.redirect(`http://localhost:5173/chat?token=${token}`);
  }
);
app.get("/fail", (req, res) => res.send("Google Auth Failed"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));