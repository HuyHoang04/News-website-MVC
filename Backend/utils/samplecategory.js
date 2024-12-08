import mongoose from "mongoose";
import { Category } from "../Models/category.js";

export const createSampleCategories = async () => {
  try {
    // Tạo các sample category
    const categories = [
      { _id: new mongoose.Types.ObjectId(), content: "Technology" }, //0
      { _id: new mongoose.Types.ObjectId(), content: "Science" }, //1
      { _id: new mongoose.Types.ObjectId(), content: "Art" }, //2
      { _id: new mongoose.Types.ObjectId(), content: "Education" }, //3
      { _id: new mongoose.Types.ObjectId(), content: "Health" }, //4
      { _id: new mongoose.Types.ObjectId(), content: "Travel" }, //5
      { _id: new mongoose.Types.ObjectId(), content: "Finance" }, //6
      { _id: new mongoose.Types.ObjectId(), content: "Sports" }, //7
      { _id: new mongoose.Types.ObjectId(), content: "Music" }, //8
      { _id: new mongoose.Types.ObjectId(), content: "Lifestyle" }, //9
      { _id: new mongoose.Types.ObjectId(), content: "Food" }, //10
      { _id: new mongoose.Types.ObjectId(), content: "History" } //11
    ];

    // Lưu các categories vào cơ sở dữ liệu
    await Category.insertMany(categories);
    console.log("Sample categories created successfully!");
  } catch (error) {
    console.error("Error creating sample categories:", error);
  }
};
