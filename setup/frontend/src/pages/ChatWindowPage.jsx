import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getMessages, sendMessage } from "../api/chatApi.jsx";
import ChatWindow from "../components/common/ChatWindow.jsx";

const socket = io("http://localhost:5001");

export default function ChatWindowPage() {
  const { chatRoomId } = useParams();
  const [messages, setMessages] = useState([]);

  const loadMessages = async () => {
    const res = await getMessages(chatRoomId);
    setMessages(res.data.messages);
  };

  useEffect(() => {
    loadMessages();

    //Join socket room
    socket.emit("joinRoom", chatRoomId);

    //Listen for new incoming messages
    socket.on("newMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("newMessage");
    };
    // eslint-disable-next-line
  }, [chatRoomId]);

  const handleSend = async (text) => {
    await sendMessage(chatRoomId, text);
  };

  return <ChatWindow messages={messages} onSend={handleSend} />;
}
