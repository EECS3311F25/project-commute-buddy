import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//import { io } from "socket.io-client";
import { socket } from "../App.js";
import { getMessages, sendMessage } from "../api/chatApi.jsx";
import ChatWindow from "../components/common/ChatWindow.jsx";

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
    socket.emit("join-chat", chatRoomId);

    //Let everyone know chat is open
    socket.emit("chat-open", chatRoomId);

    //Listen for new incoming messages
    socket.on("receive-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receive-message");
      socket.emit("chat-close", chatRoomId);
    };
    // eslint-disable-next-line
  }, [chatRoomId]);

  const handleSend = async (text) => {
    const res = await sendMessage(chatRoomId, text); // save to DB
    const message = res.data.message;

    // Push locally for sender
    setMessages((prev) => [...prev, message]);

    // Broadcast to others in the room
    socket.emit("send-message", { chatRoomId, message });
  };

  return <ChatWindow messages={messages} onSend={handleSend} />;
}
