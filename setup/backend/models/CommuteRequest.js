import mongoose from "mongoose";

const commuteRequestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined", "expired"],
    default: "pending",
  },
  message: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: () => Date.now() + 24 * 60 * 60 * 1000 } // 24h expiry
});

commuteRequestSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // auto delete expired docs

export default mongoose.model("CommuteRequest", commuteRequestSchema);
