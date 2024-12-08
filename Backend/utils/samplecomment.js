import mongoose from "mongoose";
import Comment from "../Models/comment.js";
import User from "../Models/user.js";
import Article from "../Models/article.js";

export const createSampleComments = async () => {
  try {
    // Lấy danh sách user và article
    const users = await User.find().limit(5); // Lấy 5 user đầu tiên
    const articles = await Article.find().limit(5); // Lấy 5 article đầu tiên

    if (users.length === 0 || articles.length === 0) {
      console.error("No users or articles found to associate with comments.");
      return;
    }

    // Tạo danh sách comment
    const comments = [
      {
        content: "Great article!",
        user_id: users[0]._id,
        article_id: articles[0]._id
      },
      {
        content: "I found this very useful.",
        user_id: users[1]._id,
        article_id: articles[1]._id
      },
      {
        content: "This needs more detail.",
        user_id: users[2]._id,
        article_id: articles[2]._id
      },
      {
        content: "Very informative!",
        user_id: users[3]._id,
        article_id: articles[3]._id
      },
      {
        content: "I disagree with this point.",
        user_id: users[4]._id,
        article_id: articles[4]._id
      },
      {
        content: "Well written!",
        user_id: users[0]._id,
        article_id: articles[1]._id
      },
      {
        content: "Can you elaborate more?",
        user_id: users[1]._id,
        article_id: articles[2]._id
      },
      {
        content: "Fantastic insights.",
        user_id: users[2]._id,
        article_id: articles[3]._id
      },
      {
        content: "I learned a lot from this.",
        user_id: users[3]._id,
        article_id: articles[4]._id
      },
      {
        content: "Not sure I agree with this.",
        user_id: users[4]._id,
        article_id: articles[0]._id
      }
    ];

    // Lưu danh sách comments vào cơ sở dữ liệu
    await Comment.insertMany(comments);
    console.log("Sample comments created successfully!");
  } catch (error) {
    console.error("Error creating sample comments:", error);
  }
};
