import ChatItem from "./ChatItem.jsx";

export default function ChatList({ chats, onOpenChat }) {
  if (chats.length === 0) return <p>No chats yet.</p>;

  return (
    <div>
      {chats.map((chat) => {
        const otherUser =
          chat.user1Id._id === localStorage.getItem("userId")
            ? chat.user2Id
            : chat.user1Id;

        return (
          <ChatItem
            key={chat._id}
            chatId={chat._id}
            name={otherUser.name}
            profilePic={otherUser.profileImage}
            onClick={() => onOpenChat(otherUser._id)}
          />
        );
      })}
    </div>
  );
}
