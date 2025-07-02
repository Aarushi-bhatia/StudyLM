import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      passwordHash: hashedPassword
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
