import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // hash password and save
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      preferredRoutes: [],
    });

    // create JWT
    const token = generateToken(newUser._id); // Fixed: use newUser._id instead of User._id

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" }); //should we differentiate between invalid username and incorrect pass?

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" }); //would this be a security risk? (reffering to the up comment)

    // create JWT with role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, //include role now
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getContent = (req, res) => {
  res.json({
    message: "Secret content accessible only to authenticated users!",
  });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

//sends all preferred user routes
export const getUserRoutes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.preferredRoutes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching User Preffered Routes :(" });
  }
};

//updates new preferred user routes
export const updateUserRoutes = async (req, res) => {
  try {
    const { routes } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { preferredRoutes: routes },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ preferredRoutes: updatedUser.preferredRoutes });
  } catch (error) {
    res.status(500).json({ message: "Error Updating User Preffered Routes" });
  }
};

//Get all available routes || TODO: Must fetch transit info from a seperate database in the future. For now it returns a predefined value.
export const getAllRoutes = async (req, res) => {
  try {
    const dummyRoutes = [
      "Route 101 - Downtown Express",
      "Route 202 - Airport Shuttle",
      "Route 303 - Northside Loop",
      "Route 404 - University Connector",
      "Route 505 - East-West Line",
    ];

    res.status(200).json(dummyRoutes);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Transit Routes" });
  }
};

//send this users details
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
  }
};

//sets this users details for the 1st time // TODO: DO WE NEED THIS? NOT USED ANYWHERE AT THE MOMENT ? BELOW DOES THE SAME... ALMOST
export const setUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

//UPDATES user's profile
export const updateUserProfile = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      startArea, 
      transportMode, 
      profileImage, 
      gender, 
      interests 
    } = req.body;
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the email is already taken (excluding the current user)
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.user.id) {
        return res.status(409).json({ message: "Email already exists" });
      }
      user.email = email;
    }

    // Update basic fields
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    
    // Update new matching fields
    if (startArea !== undefined) user.startArea = startArea;
    if (transportMode !== undefined) user.transportMode = transportMode;
    if (profileImage !== undefined) user.profileImage = profileImage;
    if (gender !== undefined) user.gender = gender;
    if (interests !== undefined) user.interests = Array.isArray(interests) ? interests : [];

    const updatedUser = await user.save();

    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      preferredRoutes: updatedUser.preferredRoutes,
      startArea: updatedUser.startArea,
      transportMode: updatedUser.transportMode,
      profileImage: updatedUser.profileImage,
      gender: updatedUser.gender,
      interests: updatedUser.interests,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating user profile" });
  }
};

//Resets Logged in users password // TODO: In the future we need to include a way to allow users who can't log in to change their password via email
export const changeUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    //Verify Current Password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current Password is incorrect" });
    }

    //Hash newPassword
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error Resetting Password:" }, error);
  }
};
