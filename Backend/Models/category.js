import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: { type: String, required: true, unique: true },
});

export const Category = mongoose.model("Category", categorySchema);
