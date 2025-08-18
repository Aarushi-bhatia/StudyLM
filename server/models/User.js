import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  googleId: { type: String, index: true },
  username: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  passwordHash: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", UserSchema);
