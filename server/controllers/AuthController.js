import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import validator from "validator";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }
  const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
  if (!strongPassword.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 6 characters and include at least one letter and one number.",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      passwordHash: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  // console.log("Login request:", email, password); // 👈 log input

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // console.log("No user found for email:", email);
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      // console.log("Password does not match for user:", user.username);
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    // console.log("Login successful for:", user.username);
    res.status(200).json({
      token,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    // console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const googleCallback = async (req, res) => {
  console.log("req.user exists:", !!req.user);
  
  try {
    if (!req.user) {
      console.log("❌ No req.user found");
    
    }

    // Passport has attached Google profile info to req.user
    const googleUser = req.user;
    
    // Debug: Log the Google user object to see its structure
    console.log("🔍 Google User Object:", JSON.stringify(googleUser, null, 2));

    // Handle different ways email might be provided
    let email;
    if (googleUser.emails && googleUser.emails.length > 0) {
      email = googleUser.emails[0].value;
      console.log("📧 Email from emails array:", email);
    } else if (googleUser.email) {
      email = googleUser.email;
      console.log("📧 Email from email property:", email);
    } else if (googleUser._json && googleUser._json.email) {
      email = googleUser._json.email;
      console.log("📧 Email from _json:", email);
    } else {
      console.error("❌ No email found in Google profile:", googleUser);
      
    }

    // Validate email
    if (!email || !email.includes('@')) {
      console.log("❌ Invalid email:", email);

    }

    console.log("✅ Valid email extracted:", email);

    // Check if user already exists in DB
    let user = await User.findOne({ email });
    console.log("🔍 Existing user found:", !!user);

    if (!user) {
      // If not, create a new user from Google profile
      const userData = {
        username: googleUser.displayName || googleUser.name?.givenName || "Google User",
        email,
        passwordHash: null, // no password for google login
        googleId: googleUser.id,
      };
      
      console.log("👤 Creating new user:", userData);
      user = new User(userData);
      await user.save();
      console.log("✅ Created new user:", user.username);
    } else if (!user.googleId) {
      // Link Google account to existing user
      user.googleId = googleUser.id;
      await user.save();
      console.log("🔗 Linked Google account to existing user:", user.username);
    } else {
      console.log("👍 User already exists with Google ID:", user.username);
    }

    // Generate JWT
    console.log("🔐 Generating JWT token...");
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    console.log("✅ JWT generated successfully");

    // Send success response with popup message
    // Replace your success res.send() with this:
res.redirect(`${process.env.FRONTEND_URL}/auth-popup?token=${token}&username=${encodeURIComponent(user.username)}&email=${encodeURIComponent(user.email)}`);
    
  } catch (err) {
    console.error("💥 Google OAuth Error:", err);
   
  }
};