import mongoose from "mongoose";
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String },
  content: { type: String, required: true },
  published_at: { type: Date },
  image_url: { type: String },
  video_url: { type: String },
  status: {
    type: String,
    enum: ["draft", "published", "rejected", "pending"],
    default: "draft",
  },
  premium: { type: Boolean, default: false },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Article", articleSchema);
