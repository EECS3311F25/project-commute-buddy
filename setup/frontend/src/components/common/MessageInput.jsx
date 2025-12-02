import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        padding: 10,
        borderTop: "1px solid #ccc",
      }}
    >
      <input
        style={{ flex: 1, padding: 10, fontSize: 16 }}
        placeholder="Type a message…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button style={{ padding: "0 20px" }}>Send</button>
    </form>
  );
}
