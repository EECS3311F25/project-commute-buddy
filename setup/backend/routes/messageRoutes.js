import { Router } from "express";
import { protect, verifyToken } from "../middleware/authMiddleware";
import {
  openOrCreateChat,
  getMyChats,
  getMessagesByChatId,
  sendMessage,
} from "../controllers/messageController.js";

const router = Router();

//create or get a chat room with a specific user
router.post("/open-or-create/:friendID", protect, verifyToken);

//get all chatroom for a loggedin user
router.get("/my-chats", protect, verifyToken);

//get all messages for a specific chatRoom
router.get("/:chatRoomId/messages", protect, verifyToken);

//send a message in a chat
router.post("/:chatRoomId/send", protect, verifyToken);

export default router;
