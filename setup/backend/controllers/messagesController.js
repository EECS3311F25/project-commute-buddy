//import User from "../models/User.js";
import ChatMessage from "../models/ChatMessagesTable.js";
import ChatRoom from "../models/ChatRoom.js";
import mongoose from "mongoose";
import { io, activeChats } from "../server.js";

//create or get the chatroom between 2 users
export const openOrCreateChat = async (req, res) => {
  try {
    const userId = req.user.id; // from authMiddleware
    const friendId = req.params.friendId;

    //check for friendID
    if (!friendId) {
      return res.status(400).json({ message: "Friend ID is required" });
    }
    //validates friendID
    if (!mongoose.Types.ObjectId.isValid(friendId)) {
      return res.status(400).json({ message: "Invalid friend ID" });
    }

    // Always store user1 < user2 for consistency
    const sortedUsers = [userId.toString(), friendId.toString()].sort();

    const user1ObjId = new mongoose.Types.ObjectId(sortedUsers[0]);
    const user2ObjId = new mongoose.Types.ObjectId(sortedUsers[1]);

    console.log("openOrCreateChat:", { userId, friendId });

    let chatRoom = await ChatRoom.findOne({
      user1Id: user1ObjId,
      user2Id: user2ObjId,
    });

    //create a chatroom if none exist
    if (!chatRoom) {
      chatRoom = await ChatRoom.create({
        user1Id: user1ObjId,
        user2Id: user2ObjId,
      });
    }

    return res.json({ success: true, chatRoom });
  } catch (err) {
    console.error("openOrCreateChat ERROR:", err);

    return res.status(500).json({ error: err.message });
  }
};

//get all chatrooms for a logged in user
export const getMyChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const chatRooms = await ChatRoom.find({
      $or: [{ user1Id: userId }, { user2Id: userId }],
    }).populate("user1Id user2Id", "name email profileImage");
    //console.log("getMessage JSON:", chatRooms);
    return res.json({ success: true, chatRooms });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//Get messages in a chat room
export const getMessagesByChatId = async (req, res) => {
  try {
    const { chatRoomId } = req.params;

    const messages = await ChatMessage.find({ chatRoomId })
      .sort({ timeStamp: 1 })
      .populate("senderId", "name profileImage");

    return res.json({ success: true, messages });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Send message
export const sendMessage = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const { messageText } = req.body;

    if (!messageText || messageText.trim() === "") {
      return res.status(400).json({ error: "Message cannot be empty." });
    }

    const newMessage = await ChatMessage.create({
      chatRoomId,
      senderId: req.user.id,
      messageText,
    });

    const populatedMessage = await newMessage.populate(
      "senderId",
      "name profileImage"
    );

    // in future, for push notifications, when we use socket.io we will emit an event here
    // The future is here, lol - Shaun :)
    const chatRoom = await ChatRoom.findById(chatRoomId);
    const senderId = req.user.id;

    const defaultAvatar =
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAoLc-O2PnJl8pHJpVIiHH2M5nH3zzF_MbnnwatNEv0Nv1vCcgO6ZDV6lHaZIBsD0wvDOtFTdD7jVUqWMQq-KRB9giW4fD4oJFdIMPpkZxxcagTRQr5ip5r0cPy0f07UYzwccPkDB0Z5hx5iuG0Dm4W0RUV-hGtHtCVBu9FAiHPAehH2w8eOkOjkuPNpLCXkenU9xqe5-Z5mPtG-7IHUnubMm_so2w7nYqs8b1ozMJ9JEqbps_5abuX6nXMjj5f8_b26g4180Urz4c";

    // Determine receiverId
    const receiverId =
      chatRoom.user1Id.toString() === senderId
        ? chatRoom.user2Id.toString()
        : chatRoom.user1Id.toString();

    // Check if receiver is currently inside this chat
    const isReceiverInChat = activeChats.get(receiverId) === chatRoomId;

    //emit socket event
    io.to(receiverId).emit("new-message", {
      _id: populatedMessage._id,
      chatRoomId: populatedMessage.chatRoomId,
      senderId: populatedMessage.senderId._id,
      senderName: populatedMessage.senderId.name,
      senderPic: populatedMessage.senderId.profileImage || defaultAvatar,
      messageText: populatedMessage.messageText,
      timeStamp: populatedMessage.timeStamp,
      suppressNotification: !!isReceiverInChat,
    });

    return res.json({ success: true, message: newMessage });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
