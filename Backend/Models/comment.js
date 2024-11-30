import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  article_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
