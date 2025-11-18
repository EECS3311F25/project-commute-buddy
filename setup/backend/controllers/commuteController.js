// backend/controllers/commuteController.js
import mongoose from "mongoose";
import CommuteRequest from "../models/CommuteRequest.js";
import User from "../models/User.js";
import { calculateCommonRoutePercentage } from "../utils/matchCalculator.js";

export const sendRequest = async (req, res) => {
  const { receiver, message } = req.body;
  const receiverIdentifier = receiver; // allow email or username
  const senderId = req.user.id;

  try {
    // find receiver by email or username (case-insensitive)
    const receiver = await User.findOne({
      $or: [
        { email: receiverIdentifier.toLowerCase() },
        { name: new RegExp(`^${receiverIdentifier}$`, "i") },
      ],
    });

    if (!receiver)
      return res.status(404).json({ message: "Receiver not found" });

    if (receiver._id.toString() === senderId)
      return res.status(400).json({ message: "Cannot send request to yourself" });

    const existing = await CommuteRequest.findOne({
      sender: senderId,
      receiver: receiver._id,
      status: "pending",
    });
    if (existing)
      return res.status(400).json({ message: "Request already pending" });

    const newRequest = await CommuteRequest.create({
      sender: senderId,
      receiver: receiver._id,
      message,
    });

    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const respondRequest = async (req, res) => {
  const { requestId, action } = req.body;
  const userId = req.user.id;

  try {
    const request = await CommuteRequest.findById(requestId);
    if (!request)
      return res.status(404).json({ message: "Request not found" });

    if (request.receiver.toString() !== userId)
      return res.status(403).json({ message: "Not authorized" });

    if (request.status !== "pending")
      return res.status(400).json({ message: "Request already handled" });

    request.status = action === "accept" ? "accepted" : "declined";
    await request.save();

    res.json({ message: `Request ${request.status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserRequests = async (req, res) => {
  const userId = req.user.id;

  try {
    const requests = await CommuteRequest.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .sort({ createdAt: -1 });

    // add a type field for frontend clarity
    const formatted = requests.map((r) => ({
      ...r.toObject(),
      type: r.sender._id.toString() === userId ? "sent" : "received",
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error in getUserRequests:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Find potential commute matches based on shared routes
 * Excludes users with existing pending/accepted requests
 */
export const findMatches = async (req, res) => {
  const userId = req.user.id;
  const {
    limit = 20,
    minPercentage = 0,
    transportMode,
    startArea,
    route,
    commuteWindow,
  } = req.query;

  try {
    // Get current user with their preferred routes
    const currentUser = await User.findById(userId).select("-password");
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user has any routes
    if (!currentUser.preferredRoutes || currentUser.preferredRoutes.length === 0) {
      return res.status(200).json({
        matches: [],
        totalMatches: 0,
        userHasRoutes: false,
        message: "Add routes in your profile to find matches",
      });
    }

    // Get all users with existing requests (pending or accepted) to exclude
    const existingRequests = await CommuteRequest.find({
      $or: [
        { sender: userId, status: { $in: ["pending", "accepted"] } },
        { receiver: userId, status: { $in: ["pending", "accepted"] } },
      ],
    }).select("sender receiver");

    // Extract user IDs to exclude (excluding self)
    const userIdStr = userId.toString();
    const excludedUserIds = new Set([userIdStr]);
    existingRequests.forEach((req) => {
      // Only exclude the OTHER user (not the current user)
      if (req.sender.toString() !== userIdStr) {
        excludedUserIds.add(req.sender.toString());
      }
      if (req.receiver.toString() !== userIdStr) {
        excludedUserIds.add(req.receiver.toString());
      }
    });

    // Build query for users with overlapping routes
    const matchQuery = {
      _id: { $nin: Array.from(excludedUserIds).map(id => new mongoose.Types.ObjectId(id)) },
    };

    if (route) {
      matchQuery.preferredRoutes = route;
    } else {
      matchQuery.preferredRoutes = { $in: currentUser.preferredRoutes };
    }

    // Apply optional filters
    if (transportMode) {
      matchQuery.transportMode = transportMode;
    }
    if (startArea) {
      matchQuery.startArea = startArea;
    }
    if (commuteWindow) {
      matchQuery.commuteWindow = commuteWindow;
    }

    // Find potential matches
    const potentialMatches = await User.find(matchQuery)
      .select("-password -__v")
      .lean();

    // Calculate match details for each user
    const matchesWithDetails = potentialMatches
      .map((match) => {
        // Calculate shared routes
        const sharedRoutes = currentUser.preferredRoutes.filter((route) =>
          match.preferredRoutes.includes(route)
        );

        // Calculate percentage
        const commonRoutePercentage = calculateCommonRoutePercentage(
          currentUser.preferredRoutes,
          match.preferredRoutes
        );

        return {
          userId: match._id,
          name: match.name,
          startArea: match.startArea || null,
          transportMode: match.transportMode || null,
          profileImage: match.profileImage || null,
          sharedRoutes: sharedRoutes,
          totalSharedRoutes: sharedRoutes.length,
          commonRoutePercentage: commonRoutePercentage,
          gender: match.gender || null,
          interests: match.interests || [],
        };
      })
      // Filter by minimum percentage
      .filter((match) => match.commonRoutePercentage >= parseInt(minPercentage))
      // Sort by: 1) Common route percentage (desc), 2) Number of shared routes (desc), 3) Transport mode match (bonus)
      .sort((a, b) => {
        // 1: Common route percentage
        if (b.commonRoutePercentage !== a.commonRoutePercentage) {
          return b.commonRoutePercentage - a.commonRoutePercentage;
        }
        // 2: Number of shared routes
        if (b.totalSharedRoutes !== a.totalSharedRoutes) {
          return b.totalSharedRoutes - a.totalSharedRoutes;
        }
        // 3: Transport mode match (bonus if same transport mode as current user)
        const aTransportMatch = currentUser.transportMode && 
          a.transportMode === currentUser.transportMode ? 1 : 0;
        const bTransportMatch = currentUser.transportMode && 
          b.transportMode === currentUser.transportMode ? 1 : 0;
        return bTransportMatch - aTransportMatch;
      })
      // Limit results
      .slice(0, parseInt(limit));

    res.status(200).json({
      matches: matchesWithDetails,
      totalMatches: matchesWithDetails.length,
      userHasRoutes: true,
    });
  } catch (err) {
    console.error("Error in findMatches:", err);
    res.status(500).json({ error: err.message });
  }
};

