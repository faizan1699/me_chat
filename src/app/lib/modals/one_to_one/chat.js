import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    reciever: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.models.chat || mongoose.model("chat", ChatSchema);
export default Chat;
