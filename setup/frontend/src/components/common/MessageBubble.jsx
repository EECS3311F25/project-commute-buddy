export default function MessageBubble({ message }) {
  const myId = localStorage.getItem("userId");
  const isMine = message.senderId._id === myId;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isMine ? "flex-end" : "flex-start",
        marginBottom: 10,
      }}
    >
      <div
        style={{
          padding: "8px 12px",
          borderRadius: 10,
          maxWidth: "60%",
          background: isMine ? "#a3d8ff" : "#eee",
        }}
      >
        {message.messageText}
      </div>
    </div>
  );
}
