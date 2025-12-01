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

    // --- Join personal room for notifications ---
    socket.emit("join-room", userId);

    // --- Join all chat rooms ---
    const fetchChatRooms = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/messages/my-chats", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success && data.chatRooms) {
          data.chatRooms.forEach((room) => {
            socket.emit("join-room", room._id);
          });
        }
      } catch (err) {
        console.error("Failed to join chat rooms:", err);
      }
    };
    fetchChatRooms();

    //Join register-user
    socket.emit("register-user", userId);

    // --- Handlers ---
    const handleIncomingRequest = (data) => {
      const senderName = data.sender?.name || "Unknown";
      const senderProfile = data.sender?.profileImage || null;

      addNotification({
        type: "request",
        message: `New commute request from ${senderName}`,
        profileImage: senderProfile,
      });
    };

    const handleRequestResponse = (data) => {
      addNotification({
        type: "response",
        message: `Your commute request was ${data.status} by ${
          data.receiver?.name || "Unknown"
        }`,
        profileImage: data.receiver?.profileImage || null,
      });
    };

    const handleNewMatch = (data) => {
      const matchedName = data.matchedUser?.name || "Unknown";
      const matchedProfile = data.matchedUser?.profileImage || null;

      addNotification({
        type: "match",
        message: `You have a new match: ${matchedName}`,
        profileImage: matchedProfile,
      });

      localStorage.setItem("hasNewMatches", "true");
    };

    const handleNewMessage = (data) => {
      // Only notify if the current user is NOT the sender
      if (data.senderId === userId) return;
      console.log("SOCKET RECEIVED:", data);

      if (data.suppressNotification) return;

      addNotification({
        type: "message",
        message: `${data.senderName}: ${data.messageText}`,
        profileImage: data.senderPic || null,
        chatRoomId: data.chatRoomId,
      });
    };

    // --- Register socket listeners ---
    socket.on("incoming-request", handleIncomingRequest);
    socket.on("request-response", handleRequestResponse);
    socket.on("new-match", handleNewMatch);
    socket.on("new-message", handleNewMessage);

    // --- Cleanup ---
    return () => {
      socket.off("incoming-request", handleIncomingRequest);
      socket.off("request-response", handleRequestResponse);
      socket.off("new-match", handleNewMatch);
      socket.off("new-message", handleNewMessage);
    };
    // eslint-disable-next-line
  }, []); // run only once on mount

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
