import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Google login
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);


// Callback
router.get(
  "/google/callback",
  (req, res, next) => {
    next();
  },
  passport.authenticate("google", { failureRedirect: "/fail" }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, name: req.user.name, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.redirect(`http://localhost:5173/chat?token=${token}`);
  }
);
app.get("/fail", (req, res) => res.send("Google Auth Failed"));

export default router;