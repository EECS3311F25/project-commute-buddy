//import User from "../models/User.js";
//import ChatMessagesTable from "../models/ChatMessagesTable.js";
import ChatRoom from "../models/ChatRoom.js";

//create or get the chatroom between 2 users
export const openOrCreateChat = async (req, res) => {
  try {
    const userId = req.user.id; // from authMiddleware 
    const friendId = req.params.friendId;

    // Always store user1 < user2 for consistency
    const sortedUsers = [userId, friendId].sort();

    let chatRoom = await ChatRoom.findOne({
      user1Id: sortedUsers[0],
      user2Id: sortedUsers[1],
    });

    // If not exists -> create it
    if (!chatRoom) {
      chatRoom = await ChatRoom.create({
        user1Id: sortedUsers[0],
        user2Id: sortedUsers[1],
      });
    }

    return res.json({ success: true, chatRoom });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//get all chatrooms for a logged in user
export const getMyChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const chatRooms = await ChatRoom.find({
      $or: [{ user1Id: userId }, { user2Id: userId }],
    }).populate("user1Id user2Id", "name email profilePic");

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
      .populate("senderId", "name profilePic");

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

    // in future, for push notifications, when we use socket.io we will emit an event here
    // io.to(chatRoomId).emit("new-message", newMessage);

    return res.json({ success: true, message: newMessage });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
