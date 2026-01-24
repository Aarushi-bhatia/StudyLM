import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'Chat', // Links to the Chat model
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'model'], // Role must be one of these
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
export default Message;