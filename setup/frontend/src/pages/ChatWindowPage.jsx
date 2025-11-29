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
    try {
      await sendMessage(chatRoomId, text);

      // 🔥 Re-fetch full list to reflect timestamps, ordering, etc.
      await loadMessages();
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  // Reload whenever chatRoomId changes
  useEffect(() => {
    loadMessages();
    // eslint-disable-next-line
  }, [chatRoomId]);

  // OPTIONAL: Live updating every 2s
  useEffect(() => {
    const interval = setInterval(loadMessages, 2000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [chatRoomId]);

  return <ChatWindow messages={messages} onSend={handleSend} />;
}
