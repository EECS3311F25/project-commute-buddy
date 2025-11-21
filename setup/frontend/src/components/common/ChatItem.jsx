export default function ChatItem({ name, profilePic, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        borderBottom: "1px solid #ddd",
        cursor: "pointer",
      }}
    >
      <img
        src={profilePic || "/default-profile.png"}
        alt=""
        style={{ width: 40, height: 40, borderRadius: "50%" }}
      />
      <span>{name}</span>
    </div>
  );
}
