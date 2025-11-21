import { useEffect, useState } from "react";
import { getMyChats, openOrCreateChat } from "../api/chatApi.jsx";
import ChatList from "../components/common/ChatList.jsx";
import { useNavigate } from "react-router-dom";

export default function Messages() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadChats();
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
    const res = await openOrCreateChat(friendId);
    navigate(`/messages/${res.data.chatRoom._id}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Chats</h2>
      <ChatList chats={chats} onOpenChat={handleOpenChat} />
    </div>
  );
}
