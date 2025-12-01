// frontend/components/common/Notifications.jsx
import { useNotifications } from "../../contexts/NotificationsContext.jsx";
import { useEffect } from "react";

export default function Notifications() {
  const { notifications, removeNotification } = useNotifications();

  // Auto-remove after 5 seconds
  useEffect(() => {
    const timers = notifications.map((n) =>
      setTimeout(() => removeNotification(n.id), 5000)
    );
    return () => timers.forEach((t) => clearTimeout(t));
    // eslint-disable-next-line
  }, [notifications]);

  if (!notifications.length) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="bg-white border shadow-lg p-3 rounded-lg flex items-center gap-3 w-80 animate-slideIn"
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
            onClick={() => removeNotification(notif.id)}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
