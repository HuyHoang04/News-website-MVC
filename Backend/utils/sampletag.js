import mongoose from "mongoose";
import { Category } from "../Models/category.js";
import { Tag } from "../Models/tag.js";

export const createSampleTags = async () => {
  try {
    const categories = await Category.find();

    if (categories.length === 0) {
      console.error("No categories found to associate with tags.");
      return;
    }

    const tags = [
      { content: "JavaScript", category_id: categories[0]._id }, // Technology
      { content: "Python", category_id: categories[0]._id }, // Technology
      { content: "Machine Learning", category_id: categories[0]._id }, // Technology
      { content: "Physics", category_id: categories[1]._id }, // Science
      { content: "Biology", category_id: categories[1]._id }, // Science
      { content: "Astronomy", category_id: categories[1]._id }, // Science
      { content: "Painting", category_id: categories[2]._id }, // Art
      { content: "Sculpture", category_id: categories[2]._id }, // Art
      { content: "Digital Art", category_id: categories[2]._id }, // Art
      { content: "Online Education", category_id: categories[3]._id }, // Education
      { content: "STEM", category_id: categories[3]._id }, // Education
      { content: "University Courses", category_id: categories[3]._id }, // Education
      { content: "Mental Health", category_id: categories[4]._id }, // Health
      { content: "Yoga", category_id: categories[4]._id }, // Health
      { content: "Nutrition", category_id: categories[4]._id }, // Health
      { content: "Adventure", category_id: categories[5]._id }, // Travel
      { content: "Cultural Tourism", category_id: categories[5]._id }, // Travel
      { content: "Beach Destinations", category_id: categories[5]._id }, // Travel
      { content: "Personal Finance", category_id: categories[6]._id }, // Finance
      { content: "Cryptocurrency", category_id: categories[6]._id }, // Finance
      { content: "Investing", category_id: categories[6]._id }, // Finance
      { content: "Football", category_id: categories[7]._id }, // Sports
      { content: "Basketball", category_id: categories[7]._id }, // Sports
      { content: "Olympics", category_id: categories[7]._id }, // Sports
      { content: "Pop Music", category_id: categories[8]._id }, // Music
      { content: "Classical Music", category_id: categories[8]._id }, // Music
      { content: "Rock Bands", category_id: categories[8]._id }, // Music
      { content: "Healthy Living", category_id: categories[9]._id }, // Lifestyle
      { content: "Minimalism", category_id: categories[9]._id }, // Lifestyle
      { content: "Self Improvement", category_id: categories[9]._id }, // Lifestyle
      { content: "Gourmet", category_id: categories[10]._id }, // Food
      { content: "Vegetarian", category_id: categories[10]._id }, // Food
      { content: "Street Food", category_id: categories[10]._id }, // Food
      { content: "Ancient Civilizations", category_id: categories[11]._id }, // History
      { content: "World War II", category_id: categories[11]._id }, // History
      { content: "Medieval History", category_id: categories[11]._id } // History
    ];

    // Lưu các tags vào cơ sở dữ liệu
    await Tag.insertMany(tags);
    console.log("Sample tags created successfully!");
  } catch (error) {
    console.error("Error creating sample tags:", error);
  }
};
