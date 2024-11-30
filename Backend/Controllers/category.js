import mongoose from "mongoose";
import { Category } from "../Models/category.js";
export const CategoryController = {
  createCategory: async (req, res) => {
    try {
      const { content } = req.body;
      const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        content,
      });
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category)
        return res.status(404).json({ message: "Category not found" });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
