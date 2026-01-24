import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Links to your existing User model
    required: true
  },
  title: {
    type: String,
    required: true // This will be the "PDF name"
  }
}, { timestamps: true }); // Adds createdAt and updatedAt

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
