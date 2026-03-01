import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pdfId: {
    type: String,
    default: null  // links to the uploaded document name / id
  },
  title: {
    type: String,
    required: true
  },
  lastMessagePreview: {
    type: String,
    default: ''
  }
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
