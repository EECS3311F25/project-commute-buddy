import MessageBubble from "./MessageBubble.jsx";
import MessageInput from "./MessageInput.jsx";
import { useEffect, useRef } from "react";

export default function ChatWindow({ messages, onSend }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ height: "90vh", display: "flex", flexDirection: "column" }}>
      
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        {messages.map((msg) => (
          <MessageBubble key={msg._id} message={msg} />
        ))}
        <div ref={bottomRef}></div>
      </div>

      <MessageInput onSend={onSend} />
    </div>
  );
}
