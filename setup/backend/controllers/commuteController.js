// backend/controllers/commuteController.js
import CommuteRequest from "../models/CommuteRequest.js";
import User from "../models/User.js";

export const sendRequest = async (req, res) => {
  const { receiver, message } = req.body;
  const receiverIdentifier = receiver; // allow email or username
  const senderId = req.user.id;

  try {
    // find receiver by email or username (case-insensitive)
    const receiver = await User.findOne({
      $or: [
        { email: receiverIdentifier.toLowerCase() },
        { name: new RegExp(`^${receiverIdentifier}$`, "i") },
      ],
    });

    if (!receiver)
      return res.status(404).json({ message: "Receiver not found" });

    if (receiver._id.toString() === senderId)
      return res.status(400).json({ message: "Cannot send request to yourself" });

    const existing = await CommuteRequest.findOne({
      sender: senderId,
      receiver: receiver._id,
      status: "pending",
    });
    if (existing)
      return res.status(400).json({ message: "Request already pending" });

    const newRequest = await CommuteRequest.create({
      sender: senderId,
      receiver: receiver._id,
      message,
    });

    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const respondRequest = async (req, res) => {
  const { requestId, action } = req.body;
  const userId = req.user.id;

  try {
    const request = await CommuteRequest.findById(requestId);
    if (!request)
      return res.status(404).json({ message: "Request not found" });

    if (request.receiver.toString() !== userId)
      return res.status(403).json({ message: "Not authorized" });

    if (request.status !== "pending")
      return res.status(400).json({ message: "Request already handled" });

    request.status = action === "accept" ? "accepted" : "declined";
    await request.save();

    res.json({ message: `Request ${request.status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserRequests = async (req, res) => {
  const userId = req.user.id;

  try {
    const requests = await CommuteRequest.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .sort({ createdAt: -1 });

    // add a type field for frontend clarity
    const formatted = requests.map((r) => ({
      ...r.toObject(),
      type: r.sender._id.toString() === userId ? "sent" : "received",
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error in getUserRequests:", err);
    res.status(500).json({ error: err.message });
  }
};

