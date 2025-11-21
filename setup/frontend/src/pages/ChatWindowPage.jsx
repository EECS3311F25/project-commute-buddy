import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMessages, sendMessage } from "../api/chatApi.jsx";
import ChatWindow from "../components/common/ChatWindow.jsx";

export default function ChatWindowPage() {
  const { chatRoomId } = useParams();
  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    const res = await getMessages(chatRoomId);
    setMessages(res.data.messages);
  };

  const handleSend = async (text) => {
    const res = await sendMessage(chatRoomId, text);
    setMessages((prev) => [...prev, res.data.message]);
  };

  useEffect(() => {
    loadMessages();
  }, [chatRoomId]);

  return (
    <ChatWindow
      messages={messages}
      onSend={handleSend}
    />
  );
}
