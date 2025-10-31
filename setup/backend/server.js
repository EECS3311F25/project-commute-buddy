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

const app = express();
app.use(cors());
app.use(json());

// Connect to local MongoDB
connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

app.use("/api/users", userRoutes);
app.use("/api/content", contentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
