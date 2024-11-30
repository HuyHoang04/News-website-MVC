import { User } from "../Models/user.js";
import mongoose from "mongoose";
export const UserController = {
  createUser: async (req, res) => {
    try {
      const {
        username,
        password,
        email,
        full_name,
        pen_name,
        user_type,
        subscription_expiration,
      } = req.body;
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username,
        password,
        email,
        full_name,
        pen_name,
        user_type,
        subscription_expiration,
      });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const updates = req.body;
      const user = await User.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
