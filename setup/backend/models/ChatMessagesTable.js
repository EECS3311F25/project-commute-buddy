import mongoose from "mongoose";

const chatMessagesSchema = new mongoose.Schema({
  chatRoomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatRoom",
    required: true,
  },

  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  messageText: {
    type: String,
    required: true,
  },

  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

chatMessagesSchema.index({ chatRoomId: 1 });

//find({ chatRoomId }).sort({ timeStamp: 1 }); how to find a unique chatroom

export default mongoose.model("ChatMessagesTable", chatMessagesSchema);
