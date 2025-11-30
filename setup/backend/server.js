// backend/server.js
import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import http from "http"; // needed for socket.io
import { Server } from "socket.io";

import userRoutes from "./routes/userRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import commuteRoutes from "./routes/commuteRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();

// --- CORS middleware ---
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

app.use(json());

// --- MongoDB connection ---
connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// --- Routes ---
app.use("/api/users", userRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/commute", commuteRoutes);
app.use("/api/messages", messageRoutes);

// --- Create HTTP server & attach Socket.io ---
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// --- Socket.io connection ---
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("register-user", (userId) => {
    socket.join(userId);
  });

  // --- Join personal room for notifications ---
  socket.on("join-room", (userId) => {
    console.log(`User ${userId} joined personal room`);
    socket.join(userId); // Now emits to io.to(userId) will reach them
  });

  // Chat room handling
  socket.on("join-chat", (chatRoomId) => {
    socket.join(chatRoomId);
    console.log(`Socket ${socket.id} joined chat room ${chatRoomId}`);
  });

  socket.on("send-message", (data) => {
    const { chatRoomId, message } = data;
    socket.to(chatRoomId).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// --- Start server ---
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//export { io };
