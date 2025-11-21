import { Router } from "express";
import { protect, verifyToken } from "../middleware/authMiddleware.js";
import {
  openOrCreateChat,
  getMyChats,
  getMessagesByChatId,
  sendMessage,
} from "../controllers/messagesController.js";

const router = Router();

//create or get a chat room with a specific user
router.post("/open-or-create/:friendID", protect, verifyToken, openOrCreateChat);

//get all chatroom for a loggedin user
router.get("/my-chats", protect, verifyToken, getMyChats);

//get all messages for a specific chatRoom
router.get("/:chatRoomId/messages", protect, verifyToken, getMessagesByChatId);

//send a message in a chat
router.post("/:chatRoomId/send", protect, verifyToken, sendMessage);

export default router;
