// frontend/components/common/Notifications.jsx
import { useNotifications } from "../../contexts/NotificationsContext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const { notifications, removeNotification } = useNotifications();
  const navigate = useNavigate();

  // Auto-remove after 5 seconds
  useEffect(() => {
    const timers = notifications.map((n) =>
      setTimeout(() => removeNotification(n.id), 5000)
    );
    return () => timers.forEach((t) => clearTimeout(t));
    // eslint-disable-next-line
  }, [notifications]);

  if (!notifications.length) return null;

  const handleClick = (notif) => {
    if (notif.type === "request") {
      navigate("/requests");
    } else if (notif.type === "match") {
      navigate("/matches");
    } else if (notif.type === "response" && notif.chatRoomId) {
      navigate(`/messages/${notif.chatRoomId}`);
    }
    removeNotification(notif.id);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          onClick={() => handleClick(notif)}
          className="bg-white border shadow-lg p-3 rounded-lg flex items-center gap-3 w-80 animate-slideIn cursor-pointer hover:bg-gray-100"
        >
          {notif.profileImage && (
            <img
              src={notif.profileImage}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div>
            <p className="text-sm font-medium">{notif.message}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent click from navigating
              removeNotification(notif.id);
            }}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
