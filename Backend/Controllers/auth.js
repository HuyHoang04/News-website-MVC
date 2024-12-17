import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./models/User.js"; // Đường dẫn model User

// Cấu hình các hằng số
const GOOGLE_CLIENT_ID = "your_google_client_id";
const GOOGLE_CLIENT_SECRET = "your_google_client_secret";
const JWT_SECRET = "your_jwt_secret_key"; // Thay thế bằng một chuỗi bảo mật an toàn

// Cấu hình Passport Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return done(null, false, { message: "Incorrect password" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Cấu hình Passport Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });
        if (!user) {
          user = new User({
            username: profile.displayName,
            email,
            full_name: profile.displayName,
            user_type: "guest", // Mặc định cho người dùng mới
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize và Deserialize User
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Helper để băm mật khẩu
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Đăng ký tài khoản thông thường
export const registerUser = async (req, res) => {
  try {
    const { username, password, email, full_name, pen_name, user_type } =
      req.body;

    if (await User.findOne({ username })) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      full_name,
      pen_name,
      user_type,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Đăng nhập tài khoản thông thường
export const loginUser = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err)
      return res.status(500).json({ message: "Server error", error: err });
    if (!user) return res.status(400).json({ message: info.message });

    const token = jwt.sign(
      { id: user.id, user_type: user.user_type },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ message: "Login successful", token });
  })(req, res, next);
};

// Google OAuth: Đăng nhập
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Google OAuth: Callback
export const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err)
      return res.status(500).json({ message: "Server error", error: err });
    if (!user)
      return res.status(400).json({ message: "Authentication failed" });

    const token = jwt.sign(
      { id: user.id, user_type: user.user_type },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ message: "Login successful", token, user });
  })(req, res, next);
};

// Middleware kiểm tra quyền
export const verifyRole = (roles) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!roles.includes(decoded.user_type)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error });
  }
};

// Route bảo vệ ví dụ
export const protectedRoute = (req, res) => {
  res
    .status(200)
    .json({ message: `Hello, ${req.user.user_type}!`, user: req.user });
};
