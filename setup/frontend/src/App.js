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

// Component to handle socket events inside provider
function SocketListeners() {
  const { addNotification } = useNotifications();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    // Join personal room for notifications
    socket.emit("join-room", userId);

    // Incoming commute request
    socket.on("incoming-request", (data) => {
      const senderName = data.sender?.name || "Unknown";
      const senderProfile = data.sender?.profileImage || null;

      addNotification({
        message: `New commute request from ${senderName}`,
        profileImage: senderProfile,
      });
    });

    // Request response
    socket.on("request-response", (data) => {
      addNotification({
        message: `Your commute request was ${data.status} by ${
          data.receiver?.name || "Unknown"
        }`,
        profileImage: data.receiver?.profileImage || null,
      });
    });

    // New match
    socket.on("new-match", (data) => {
      const matchedName = data.matchedUser?.name || "Unknown";
      const matchedProfile = data.matchedUser?.profileImage || null;

      addNotification({
        message: `You have a new match: ${matchedName}`,
        profileImage: matchedProfile,
      });

      localStorage.setItem("hasNewMatches", "true");
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off("incoming-request");
      socket.off("request-response");
      socket.off("new-match");
    };
  }, [addNotification]);

  return null;
}

function App() {
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
