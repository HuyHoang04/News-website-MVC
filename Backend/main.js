import express from "express";
import { engine } from "express-handlebars";
import { connectDB } from "./utils/db.js";
import { login } from "./Controllers/auth.js";
import { User } from "./Models/user.js";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Set up Handlebars view engine
app.engine("hbs", engine());
app.set("view engine", "hbs");
app.set("views", "./views");
await connectDB();
app.engine(
  "hbs",
  engine({
    extname: "hbs",
  })
);
// async function seedUsers() {
//   try {
//     const users = [
//       {
//         username: "guest_user",
//         password: "password123",
//         email: "guest@example.com",
//         full_name: "Guest User",
//         role: "guest",
//       },
//       {
//         username: "subscriber_user",
//         password: "password123",
//         email: "subscriber@example.com",
//         full_name: "Subscriber User",
//         role: "subscriber",
//         subscription_expiration: new Date(
//           Date.now() + 30 * 24 * 60 * 60 * 1000
//         ), // 30 ngày từ bây giờ
//       },
//       {
//         username: "writer_user",
//         password: "password123",
//         email: "writer@example.com",
//         full_name: "Writer User",
//         pen_name: "Author123",
//         role: "writer",
//       },
//       {
//         username: "editor_user",
//         password: "password123",
//         email: "editor@example.com",
//         full_name: "Editor User",
//         role: "editor",
//       },
//       {
//         username: "admin_user",
//         password: "password123",
//         email: "admin@example.com",
//         full_name: "Administrator User",
//         role: "administrator",
//       },
//     ];

//     for (const user of users) {
//       const hashedPassword = await bcrypt.hash(user.password, 10); // Mã hóa mật khẩu
//       user.password = hashedPassword;
//       await User.create(user);
//     }

//     console.log("Seeded users successfully");
//   } catch (error) {
//     console.error("Error seeding users:", error);
//   }
// }

// await seedUsers();

import { Category } from "./Models/category.js";
import { Tag } from "./Models/tag.js";
import { Article } from "./Models/article.js";

const createCategories = async () => {
  const categories = [
    { name: "Technology", description: "Latest tech trends and news" },
    { name: "Health", description: "Health tips and wellness articles" },
    { name: "Sports", description: "Sports news and updates" },
  ];

  const categoryDocuments = await Category.insertMany(categories);
  return categoryDocuments;
};

const createTags = async () => {
  const tags = [
    { name: "AI" },
    { name: "Fitness" },
    { name: "Football" },
    { name: "Tech" },
    { name: "Nutrition" },
    { name: "Basketball" },
    { name: "Wearables" },
    { name: "Training" },
    { name: "Smartphones" },
    { name: "Workout" },
  ];

  const tagDocuments = await Tag.insertMany(tags);
  return tagDocuments;
};

const createArticles = async (categories, tags) => {
  const articlesData = [];

  // Define specific tags for each category
  const categoryTags = {
    Technology: [tags[0], tags[3], tags[8]], // AI, Tech, Smartphones
    Health: [tags[1], tags[4], tags[7]], // Fitness, Nutrition, Training
    Sports: [tags[2], tags[5], tags[6]], // Football, Basketball, Wearables
  };

  // Define image URLs for each category
  const categoryImages = {
    Technology: [
      "https://via.placeholder.com/600x300?text=Technology+1",
      "https://via.placeholder.com/600x300?text=Technology+2",
    ],
    Health: [
      "https://via.placeholder.com/600x300?text=Health+1",
      "https://via.placeholder.com/600x300?text=Health+2",
    ],
    Sports: [
      "https://via.placeholder.com/600x300?text=Sports+1",
      "https://via.placeholder.com/600x300?text=Sports+2",
    ],
  };

  // Define videos for each category
  const categoryVideos = {
    Technology: [
      "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example YouTube video
      "https://www.youtube.com/embed/3JZ_D3ELwOQ", // Another example YouTube video
    ],
    Health: [
      "https://www.youtube.com/embed/hY2PqU5y8P0", // Example YouTube video
    ],
    Sports: [
      "https://www.youtube.com/embed/ktvTqknDobU", // Example YouTube video
    ],
  };

  for (let category of categories) {
    const articleCount = Math.floor(Math.random() * 3) + 10; // 10-12 articles per category
    for (let i = 0; i < articleCount; i++) {
      const specificTags = categoryTags[category.name];
      const images = categoryImages[category.name];
      const videos = categoryVideos[category.name];

      // Create HTML content with embedded images and videos
      const articleContent = `
        <h1>Article ${category.name} ${i + 1}</h1>
        <p>This is a sample content for the ${
          category.name
        } article. It includes images and videos:</p>
        <div>
          <h2>Images:</h2>
          <img src="${images[i % images.length]}" alt="Image for ${
        category.name
      } article ${i + 1}" width="100%" />
        </div>
        <div>
          <h2>Video:</h2>
          <iframe width="560" height="315" src="${
            videos[i % videos.length]
          }" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      `;

      const article = {
        title: `Article ${category.name} ${i + 1}`,
        content: articleContent,
        category: category._id,
        tags: specificTags.map((tag) => tag._id),
        image_url: [images[i % images.length]], // Cycle through available images
        video_url: [videos[i % videos.length]], // Cycle through available videos
        status: "published",
        author: "6768f1f9ea0ac66458f565ff", // Replace with actual user ID
      };
      articlesData.push(article);
    }
  }

  const articles = await Article.insertMany(articlesData);
  return articles;
};

const seedDatabase = async () => {
  try {
    const categories = await createCategories();
    const tags = await createTags();
    const articles = await createArticles(categories, tags);
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();

app.get("/", function rootHandler(req, res) {
  res.render("home");
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const result = await login(username, password);
    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }

    const { role, token } = result;

    res.cookie("token", token, {
      httpOnly: true, // Không thể truy cập từ JavaScript
      secure: "production", // Chỉ gửi qua HTTPS trong production
      maxAge: 3600000, // Cookie tồn tại 1 giờ
    });

    if (role == "administrator") {
      res.redirect("/administrator");
    } else if (role == "writer") {
      res.redirect("/writer");
    } else if (role == "editor") {
      res.redirect("/editor");
    } else res.redirect("/");
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

app.get("/details", function rootHandler(req, res) {
  res.render("details");
});

app.get("/login", function rootHandler(req, res) {
  res.render("login");
});

app.get("/register", function rootHandler(req, res) {
  res.render("register");
});

app.get("/writer", function rootHandler(req, res) {
  res.render("writer");
});

app.get("/editor", function rootHandler(req, res) {
  res.render("editor");
});

app.get("/administrator", function rootHandler(req, res) {
  res.render("administrator");
});
app.listen(3000, function () {
  console.log("Server started on http://localhost:3000");
});
