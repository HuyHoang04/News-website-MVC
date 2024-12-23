import express from "express";
import { engine } from "express-handlebars";
import { connectDB } from "./utils/db.js";
import { login } from "./Controllers/auth.js";
import { User } from "./Models/user.js";
import bcrypt from "bcryptjs";
const app = express();

// Serve static files from the 'public' folder
app.use(express.static("public"));
const JWT_SECRET = "secret";
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

app.get("/", function rootHandler(req, res) {
  res.render("home");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await login(username, password);
    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }

    const { role, token } = result;
    res.json({ token });

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
