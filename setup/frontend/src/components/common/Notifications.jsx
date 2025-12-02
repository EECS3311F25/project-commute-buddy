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
  }, [notifications, removeNotification]);

  if (!notifications.length) return null;

  const handleClick = (notif) => {
    if (notif.type === "request") {
      navigate("/requests");
    } else if (notif.type === "match") {
      navigate("/matches");
    } else if (notif.type === "message" && notif.chatRoomId) {
      navigate(`/messages/${notif.chatRoomId}`);
    }
    removeNotification(notif.id);
  };

  const defaultAvatar =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAoLc-O2PnJl8pHJpVIiHH2M5nH3zzF_MbnnwatNEv0Nv1vCcgO6ZDV6lHaZIBsD0wvDOtFTdD7jVUqWMQq-KRB9giW4fD4oJFdIMPpkZxxcagTRQr5ip5r0cPy0f07UYzwccPkDB0Z5hx5iuG0Dm4W0RUV-hGtHtCVBu9FAiHPAehH2w8eOkOjkuPNpLCXkenU9xqe5-Z5mPtG-7IHUnubMm_so2w7nYqs8b1ozMJ9JEqbps_5abuX6nXMjj5f8_b26g4180Urz4c";

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          onClick={() => handleClick(notif)}
          className="bg-white border shadow-lg p-3 rounded-lg flex items-start gap-3 w-80 animate-slideIn cursor-pointer hover:bg-gray-100"
        >
          {/* Avatar */}
          {notif.profileImage ? (
            <img
              src={notif.profileImage || defaultAvatar}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover mt-1"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 mt-1" />
          )}

          {/* Message content */}
          <div className="flex flex-col">
            {/* For messages, show sender name bold */}
            {notif.type === "message" ? (
              <>
                <span className="text-sm font-semibold">
                  {notif.message.split(":")[0]}
                </span>
                <span className="text-sm text-gray-700">
                  {notif.message.split(":").slice(1).join(":").trim()}
                </span>
              </>
            ) : (
              <p className="text-sm font-medium">{notif.message}</p>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
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
