import express from "express";
import passport from "passport";
import { signup, login, googleCallback } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Start Google OAuth
router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google redirect URI (must match Google console)
router.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleCallback
);

export default router;