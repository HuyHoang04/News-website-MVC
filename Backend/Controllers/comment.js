import { Comment } from "../Models/comment.js";
import mongoose from "mongoose";
export const CommentController = {
  createComment: async (req, res) => {
    try {
      const { content, user_id, article_id } = req.body;
      const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        content,
        user_id,
        article_id,
      });
      await comment.save();
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCommentsByArticle: async (req, res) => {
    try {
      const comments = await Comment.find({
        article_id: req.params.articleId,
      }).populate("user_id", "username");
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (!comment)
        return res.status(404).json({ message: "Comment not found" });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
