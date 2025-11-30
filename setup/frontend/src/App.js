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

//Initializing socket
export const socket = io("http://localhost:5001", { withCredentials: true });

function App() {
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      // Join personal room for notifications
      socket.emit("join-room", userId);

      // Incoming commute request notifications
      socket.on("incoming-request", (data) => {
        alert(`New commute request from ${data.senderId}`);
        console.log("Incoming request data:", data);
      });

      // Receive updates on sent requests
      socket.on("request-response", (data) => {
        alert(`Your commute request was ${data.status}`);
        console.log("Request response:", data);
      });

      socket.on("new-match", (data) => {
        console.log("New match received:", data);
        localStorage.setItem("hasNewMatches", "true");
      });

      // Clean up listener on unmount
      return () => {
        socket.off("incoming-request");
        socket.off("request-response");
        socket.off("new-match");
      };
    }
  }, []);

  return (
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
    </Router>
  );
}

export default App;
