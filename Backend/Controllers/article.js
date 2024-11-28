import { Article } from "../Models/article.js";
import mongoose from "mongoose";
export const ArticleController = {
  createArticle: async (req, res) => {
    try {
      const {
        title,
        summary,
        content,
        published_at,
        image_url,
        video_url,
        status,
        premium,
        user_id,
      } = req.body;
      const article = new Article({
        _id: new mongoose.Types.ObjectId(),
        title,
        summary,
        content,
        published_at,
        image_url,
        video_url,
        status,
        premium,
        user_id,
      });
      await article.save();
      res.status(201).json(article);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getArticle: async (req, res) => {
    try {
      const article = await Article.findById(req.params.id).populate(
        "user_id",
        "username email"
      );
      if (!article)
        return res.status(404).json({ message: "Article not found" });
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateArticle: async (req, res) => {
    try {
      const updates = req.body;
      const article = await Article.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      });
      if (!article)
        return res.status(404).json({ message: "Article not found" });
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteArticle: async (req, res) => {
    try {
      const article = await Article.findByIdAndDelete(req.params.id);
      if (!article)
        return res.status(404).json({ message: "Article not found" });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
