import User from "../models/User.js";
import { JwtSign } from '../config/jwt/JwtToken.js';

// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = JwtSign(user._id, user.email);

        res.status(200).json({
            success: true,
            token,
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }
            }
        });
    } catch {
        res.status(500).json({
            success: false,
            message: "An internal error occurred. Please try again later."
        });
    }
};


// Register User
export const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        const newUser = await User.create({ email, password });

        const userResponse = newUser.toObject();

        delete userResponse.password;

        res.status(201).json({
            success: true,
            data: { user: userResponse }
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "A User with this email already exists."
            });
        }

        res.status(500).json({ success: false, message: "Internal server error" });
    }
};







// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password
        res.status(200).json({
            success: true,
            results: users.length,
            data: { users }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An internal error occurred. Please try again later."
        });
    }
};