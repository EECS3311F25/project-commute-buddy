// backend/server.js

//import environment variables
import dotenv from "dotenv";
dotenv.config();

//import modules and routes
import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import commuteRoutes from "./routes/commuteRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();

// CORS configuration - allow requests from frontend
// Must be before other middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from React frontend
    credentials: true, // Allow cookies/credentials
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200, // Support legacy browsers
  })
);

app.use(json());

// Connect to local MongoDB
connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/users", userRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/commute", commuteRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5001; // Changed to 5001 to avoid conflict with macOS AirPlay (port 5000)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
