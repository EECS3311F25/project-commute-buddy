import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
  user1Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  user2Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//only 1 chat room per pair
chatRoomSchema.index({ user1Id: 1, user2Id: 1 }, { unique: true });

export default mongoose.model("ChatRoom", chatRoomSchema);
