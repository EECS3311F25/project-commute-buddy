//import ChatItem from "./ChatItem.jsx";

export default function ChatList({ chats, unreadChat, onOpenChat }) {
  if (chats.length === 0) return <p>No chats yet.</p>;

  return (
    <div>
      {chats.map((chat) => {
        const otherUser =
          chat.user1Id._id === localStorage.getItem("userId")
            ? chat.user2Id
            : chat.user1Id;

        const isUnread = unreadChat.has(chat._id);

        return (
          <div
            key={chat._id}
            onClick={() => onOpenChat(otherUser._id)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #ddd",
              cursor: "pointer",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={otherUser.profileImage || defaultAvatar}
                alt={otherUser.name}
                style={{ width: 40, height: 40, borderRadius: "50%" }}
              />
              <span>{otherUser.name}</span>
            </div>
            {isUnread && (
              <span
                style={{
                  backgroundColor: "red",
                  color: "white",
                  fontSize: "12px",
                  padding: "2px 6px",
                  borderRadius: "12px",
                }}
              >
                New
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

const defaultAvatar =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAoLc-O2PnJl8pHJpVIiHH2M5nH3zzF_MbnnwatNEv0Nv1vCcgO6ZDV6lHaZIBsD0wvDOtFTdD7jVUqWMQq-KRB9giW4fD4oJFdIMPpkZxxcagTRQr5ip5r0cPy0f07UYzwccPkDB0Z5hx5iuG0Dm4W0RUV-hGtHtCVBu9FAiHPAehH2w8eOkOjkuPNpLCXkenU9xqe5-Z5mPtG-7IHUnubMm_so2w7nYqs8b1ozMJ9JEqbps_5abuX6nXMjj5f8_b26g4180Urz4c";
