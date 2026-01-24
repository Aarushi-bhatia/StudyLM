import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/fail" }),
  async (req, res) => { // Make this async
    try {
      // req.user is currently the profile object. 
      // We need the MongoDB document to get the correct _id.
      
      // Ensure your passportConfig.js is returning the user from the DB.
      // If it is, then the ID you want is req.user._id
      const mongoId = req.user._id || req.user.id;

      const token = jwt.sign(
        { 
          id: mongoId.toString(), // This must be the 24-char hex string
          name: req.user.name, 
          email: req.user.email 
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      
      res.redirect(`${process.env.FRONTEND_URL}/chat?token=${token}`);
    } catch (err) {
      console.error("Token Signing Error:", err);
      res.redirect(`${process.env.FRONTEND_URL}/fail`);
    }
  }
);

router.get("/fail", (req, res) => res.send("Google Auth Failed"));

export default router;
