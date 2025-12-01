//importing page routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";

//Importing pages and components
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Content from "./pages/Content.jsx";
import Matches from "./pages/Matches.jsx";
import Navbar from "./components/common/Navbar.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import Forbidden from "./pages/Forbidden.jsx";
import CommuteRequests from "./pages/CommuteRequests.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import Messages from "./pages/Messages.jsx";
import ChatWindowPage from "./pages/ChatWindowPage.jsx";

// Notifications context and component
import {
  NotificationsProvider,
  useNotifications,
} from "./contexts/NotificationsContext.jsx";
import Notifications from "./components/common/Notifications.jsx";

// Initialize socket
export const socket = io("http://localhost:5001", { withCredentials: true });

/* ---------------------------------------------
   IDLE LOGOUT + ACTIVITY TRACKER
--------------------------------------------- */
function setupIdleLogout() {
  let timeoutId = null;
  const MAX_IDLE = 60 * 60 * 1000; // 1 hour

  const logoutUser = () => {
    console.log("User inactive for 1 hour. Logging out...");
    localStorage.removeItem("userId");
    document.cookie = "token=; Max-Age=0; path=/;";
    window.location.href = "/login";
  };

  const resetTimer = () => {
    localStorage.setItem("lastActivity", Date.now());
    clearTimeout(timeoutId);
    timeoutId = setTimeout(logoutUser, MAX_IDLE);
  };

  // Listen to all activity
  window.addEventListener("mousemove", resetTimer);
  window.addEventListener("keydown", resetTimer);
  window.addEventListener("click", resetTimer);
  window.addEventListener("scroll", resetTimer);

  resetTimer(); // start timer initially
}

/* ---------------------------------------------
   SILENT TOKEN REFRESH
--------------------------------------------- */
function useSilentTokenRefresh() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const lastActivity = Number(localStorage.getItem("lastActivity") || 0);
      const now = Date.now();
      const isActive = now - lastActivity < 60 * 60 * 1000;

      if (!isActive) return;

      try {
        await fetch("http://localhost:5001/api/auth/refresh", {
          method: "GET",
          credentials: "include",
        });
      } catch (err) {
        console.warn("Refresh failed");
      }
    }, 5 * 60 * 1000); // every 5 minutes

    return () => clearInterval(interval);
  }, []);
}

/* ---------------------------------------------
   SOCKET LISTENERS
--------------------------------------------- */
// Component to handle socket events inside provider
/* ---------------------------------------------
   SOCKET LISTENERS
--------------------------------------------- */
function SocketListeners() {
  const { addNotification } = useNotifications();
  const userId = localStorage.getItem("userId");
  const shouldRestoreAuth = !!userId && document.cookie.includes("token=");

  useSilentTokenRefresh();

  useEffect(() => {
    if (!userId) return;

    socket.emit("register-user", userId);

    // Poll until auth is restored
    const waitForAuth = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/auth/me", {
          credentials: "include",
        });

        const data = await res.json();
        if (data.success && data.user) {
          console.log("Auth restored — joining rooms...");

          socket.emit("join-room", userId);
          fetchChatRooms();
          clearInterval(authInterval);
        }
      } catch {}
    };

    let authInterval = null;
    if (shouldRestoreAuth) {
      authInterval = setInterval(waitForAuth, 500);
    }

    const fetchChatRooms = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/messages/my-chats", {
          credentials: "include",
        });

        if (res.status === 401) return;

        const data = await res.json();
        if (data.success && data.chatRooms) {
          data.chatRooms.forEach((room) => socket.emit("join-room", room._id));
        }
      } catch (err) {
        console.error("Failed to join chat rooms:", err);
      }
    };

    // Notification handlers
    socket.on("incoming-request", (data) => {
      addNotification({
        type: "request",
        message: `New commute request from ${data.sender?.name || "Unknown"}`,
        profileImage: data.sender?.profileImage || null,
      });
    });

    socket.on("request-response", (data) => {
      addNotification({
        type: "response",
        message: `Your commute request was ${data.status} by ${
          data.receiver?.name || "Unknown"
        }`,
        profileImage: data.receiver?.profileImage || null,
      });
    });

    socket.on("new-match", (data) => {
      addNotification({
        type: "match",
        message: `You have a new match: ${data.matchedUser?.name || "Unknown"}`,
        profileImage: data.matchedUser?.profileImage || null,
      });

      localStorage.setItem("hasNewMatches", "true");
    });

    socket.on("new-message", (data) => {
      if (data.senderId === userId || data.suppressNotification) return;

      addNotification({
        type: "message",
        message: `${data.senderName}: ${data.messageText}`,
        profileImage: data.senderPic || null,
        chatRoomId: data.chatRoomId,
      });
    });

    return () => {
      if (authInterval) clearInterval(authInterval);
      socket.off("incoming-request");
      socket.off("request-response");
      socket.off("new-match");
      socket.off("new-message");
    };
    // eslint-disable-next-line
  }, []);

  return null;
}

function App() {
  useEffect(() => {
    setupIdleLogout();
  }, []);

  return (
    <NotificationsProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/403" element={<Forbidden />} />
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <CommuteRequests />
              </ProtectedRoute>
            }
          />

          {/* Protected Pages */}
          <Route
            path="/content"
            element={
              <ProtectedRoute>
                <Content />
              </ProtectedRoute>
            }
          />

          <Route
            path="/matches"
            element={
              <ProtectedRoute>
                <Matches />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages/:chatRoomId"
            element={
              <ProtectedRoute>
                <ChatWindowPage />
              </ProtectedRoute>
            }
          />

          {/* 🔐 Admin-only route */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPage />
              </ProtectedRoute>
            }
          />

          {/* Optional: redirect root ("/") to /home */}
          <Route path="/" element={<Home />} />
        </Routes>

        {/* Socket listener component */}
        <SocketListeners />

        {/* Notifications UI */}
        <Notifications />
      </Router>
    </NotificationsProvider>
  );
}

export default App;
