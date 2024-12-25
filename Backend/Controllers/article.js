import { Article } from "../Models/article.js"; // Adjust according to your models path
import { Category } from "../Models/category.js";
import { User } from "../Models/user.js";
import { Tag } from "../Models/tag.js";
import mongoose from "mongoose";

export const articleController = {
  getPendingArticlesByUser: async (userId) => {
    if (!userId) {
      console.error("User ID is required");
      return [];
    }

    try {
      // Tìm thông tin người dùng bao gồm avaiCategory
      const user = await User.findById(userId).select("avaiCategory").lean();
      if (!user || !user.avaiCategory || user.avaiCategory.length === 0) {
        console.warn("User not found or avaiCategory is empty");
        return [];
      }

      // Lấy các bài viết ở trạng thái pending thuộc avaiCategory của user
      const articles = await Article.find({
        status: "pending",
        category: { $in: user.avaiCategory },
      })
        .populate("category")
        .populate("tags")
        .populate("author")
        .lean();

      return articles;
    } catch (error) {
      console.error("Error fetching pending articles for user:", error);
      return [];
    }
  },

  getPendingArticles: async () => {
    const articles = await Article.find({ status: "pending" })
      .populate("category")
      .populate("tags")
      .populate("author")
      .lean();

    return articles;
  },
  getPopularArticlesThisWeek: async () => {
    const lastWeekDate = new Date();
    lastWeekDate.setDate(lastWeekDate.getDate() - 7); // 7 days ago

    const articles = await Article.find({
      status: "published",
      createdAt: { $gte: lastWeekDate },
    })
      .sort({ views: -1 }) // Sort by views descending
      .limit(4) // Get top 4 articles
      .populate("category")
      .populate("tags")
      .populate("author")
      .lean();

    return articles;
  },
  getTop10MostViewedArticles: async () => {
    const articles = await Article.find({ status: "published" })
      .sort({ views: -1 }) // Sort by views descending
      .limit(10) // Get top 10 articles
      .populate("category")
      .populate("tags")
      .populate("author")
      .lean();

    return articles;
  },
  getTop10NewestArticles: async () => {
    const articles = await Article.find({ status: "published" })
      .sort({ createdAt: -1 }) // Sort by creation date descending
      .limit(10) // Get top 10 articles
      .populate("category")
      .populate("tags")
      .populate("author")
      .lean();

    return articles;
  },
  getTop5NewestArticles: async () => {
    const articles = await Article.find({ status: "published" })
      .sort({ createdAt: -1 }) // Sort by creation date descending
      .limit(5) // Get top 5 articles
      .populate("category")
      .populate("tags")
      .populate("author")
      .lean();

    return articles;
  },
  getLatestArticleFromEachCategory: async () => {
    const categories = await Category.find();

    const latestArticles = [];

    for (const category of categories) {
      const article = await Article.findOne({
        category: category._id,
        status: "published",
      })
        .sort({ createdAt: -1 }) // Sort by creation date descending
        .populate("category")
        .populate("tags")
        .populate("author")
        .lean();

      if (article) {
        latestArticles.push(article);
      }
    }
    return latestArticles;
  },
  // Get a single article by ID
  getArticleById: async (id) => {
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
    } catch (err) {
      console.error(err);
    }
  },
};
