import { Article } from "../models/article.js";
import { Category } from "../models/category.js";
import { Tag } from "../models/tag.js";
import mongoose from "mongoose";

// Get articles by category with pagination
export const getArticlesByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10 articles

  try {
    const skip = (page - 1) * limit; // Calculate how many articles to skip based on the page

    // Fetch articles that match the category ID, and paginate them
    const articles = await Article.find({
      category: categoryId,
      status: "published"
    })
      .skip(skip)
      .limit(Number(limit))
      .populate("author", "username") // Optionally populate author details
      .populate("category", "name") // Optionally populate category details
      .populate("tags", "name"); // Optionally populate tag details

    // Count total articles in this category for pagination
    const totalArticles = await Article.countDocuments({
      category: categoryId,
      status: "published"
    });

    res.status(200).json({
      articles,
      totalArticles,
      totalPages: Math.ceil(totalArticles / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get articles by tag with pagination
export const getArticlesByTag = async (req, res) => {
  const { tagId } = req.params;
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10 articles

  try {
    const skip = (page - 1) * limit; // Calculate how many articles to skip based on the page

    // Fetch articles that match the tag ID, and paginate them
    const articles = await Article.find({ tags: tagId, status: "published" })
      .skip(skip)
      .limit(Number(limit))
      .populate("author", "username") // Optionally populate author details
      .populate("category", "name") // Optionally populate category details
      .populate("tags", "name"); // Optionally populate tag details

    // Count total articles with this tag for pagination
    const totalArticles = await Article.countDocuments({
      tags: tagId,
      status: "published"
    });

    res.status(200).json({
      articles,
      totalArticles,
      totalPages: Math.ceil(totalArticles / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single article by ID
export const getArticleById = async (id) => {
  if (!id) {
    console.error("ID is required");
    return null;
  }
  //const objectId = new mongoose.Types.ObjectId(id);
  try {
    const article = await Article.findById(id)
      .populate("author", "username")
      .populate("category", "name") // Optionally populate category details
      .populate("tags", "name") // Optionally populate tag details
      .lean();

    if (!article) {
      console.error("Không có article này:", error);
      return null;
    }
    return article;
    res.status(200).json({ article });
  } catch (err) {
    console.error(err);
  }
};
// Create a new article
export const createArticle = async (req, res) => {
  const {
    title,
    content,
    image_url,
    video_url,
    premium,
    category,
    tags,
    author
  } = req.body;

  try {
    const newArticle = new Article({
      title,
      content,
      image_url,
      video_url,
      premium,
      category,
      tags,
      author,
      status: "draft" // Default to draft status
    });

    const savedArticle = await newArticle.save();
    res
      .status(201)
      .json({ message: "Article created successfully", article: savedArticle });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// Delete an article by ID
export const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// Update the status of an article
export const updateArticleStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // The status should be one of 'draft', 'published', 'rejected', or 'pending'

  try {
    // Validate status
    if (!["draft", "published", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res
      .status(200)
      .json({ message: "Article status updated", article: updatedArticle });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const getArticlesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const articles = await Article.find({ author: userId })
      .populate("category", "name") // Optional: Populate category details
      .populate("tags", "name") // Optional: Populate tag details
      .sort({ createdAt: -1 }); // Sort by newest first

    if (articles.length === 0) {
      return res
        .status(404)
        .json({ message: "No articles found for this user" });
    }

    res.status(200).json({ articles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
