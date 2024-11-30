import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  full_name: { type: String, required: true },
  pen_name: { type: String },
  user_type: {
    type: String,
    enum: ["guest", "subscriber", "writer", "editor", "administrator"],
    required: true,
  },
  subscription_expiration: { type: Date },
});

export const User = mongoose.model("User", userSchema);
