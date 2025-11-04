import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {generateToken} from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        // check if user exists
        const existingUser = await User.findOne({email});
        if (existingUser)
            return res.status(400).json({message: "User already exists"});

        // hash password and save
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // create JWT
        const token = generateToken(User._id); //this requires an .env file for you to implement. Example is given in '.env.example' file

        res.status(201).json({token});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        // check if user exists
        const user = await User.findOne({email});
        if (!user)
            return res.status(400).json({message: "Invalid credentials"});

        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({message: "Invalid credentials"});

        // create JWT with role
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

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
        res.status(500).json({error: err.message});
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