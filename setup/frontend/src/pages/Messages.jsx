import { useEffect, useState } from "react";
import { getMyChats, openOrCreateChat } from "../api/chatApi.jsx";
import ChatList from "../components/common/ChatList.jsx";
import { useNavigate } from "react-router-dom";
import { socket } from "../App.js";

export default function Messages() {
  const [chats, setChats] = useState([]);
  const [unreadChat, setUnreadChats] = useState(new Set()); // To track unread messages
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    loadChats();

    //Listen for new messages
    socket.on("new-message", (msg) => {
      if (msg.senderId !== userId) {
        setUnreadChats((prev) => new Set(prev).add(msg.chatRoomId));
      }
    });

    return () => socket.off("new-message");
    //eslint-disable-next-line
  }, []);

  const loadChats = async () => {
    try {
      const res = await getMyChats();
      setChats(res.data.chatRooms);
    } catch (err) {
      console.error("Failed to load chats", err);
    }
  };

  const handleOpenChat = async (friendId) => {
    try {
      const res = await openOrCreateChat(friendId);

      //Remove unread badge
      setUnreadChats((prev) => {
        const copy = new Set(prev);
        copy.delete(res.data.chatRoom._id);
        return copy;
      });
      navigate(`/messages/${res.data.chatRoom._id}`);
    } catch (err) {
      console.error("Failed to open chat", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Chats</h2>
      <ChatList
        chats={chats}
        unreadChat={unreadChat}
        onOpenChat={handleOpenChat}
      />
    </div>
  );
}
