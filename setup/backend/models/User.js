// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }, //users have a user role by default
  preferredRoutes: [String], //every user has their own preferred route
  
  // Phase 1: Additional fields for matching feature
  startArea: { type: String, default: null }, // e.g., "Richmond Hill", "Markham", "North York"
  transportMode: { 
    type: String, 
    enum: ["TTC", "YRT", "GO Train", "GO Bus", "Mixed", null],
    default: null
  },
  profileImage: { 
    type: String, 
    default: null // URL to profile image (can use placeholder initially)
  },
  // Optional filters for future filtering features
  gender: { 
    type: String, 
    enum: ["Male", "Female", "Non-binary", "Prefer not to say", null],
    default: null
  },
  interests: { 
    type: [String], 
    default: [] // Array of interest tags
  },
},
  {timestamps: true}
);

// Index for faster route matching queries
userSchema.index({ preferredRoutes: 1 });

const User = mongoose.model("User", userSchema);
export default User;
