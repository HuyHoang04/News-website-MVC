import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: { type: String, required: true, unique: true },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }
});

export const Tag = mongoose.model("Tag", tagSchema);
