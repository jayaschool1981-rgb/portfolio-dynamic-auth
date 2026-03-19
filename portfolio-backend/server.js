// ✅ 1. Load environment variables FIRST
import dotenv from "dotenv";
dotenv.config();

// ✅ 2. Imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./models/User.js";

// ✅ 3. Initialize app
const app = express();

// ✅ 4. Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://portfolio-dynamic-auth.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ✅ 5. MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ✅ 6. Root Route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});


// ==========================
// 🔐 AUTH MIDDLEWARE
// ==========================
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1]; // Bearer TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


// ==========================
// 📝 REGISTER ROUTE
// ==========================
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🔍 Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔍 Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 💾 Save user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // ❌ Remove password from response
    const { password: _, ...userData } = user._doc;

    res.status(201).json({
      message: "User registered successfully",
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


// ==========================
// 🔑 LOGIN ROUTE
// ==========================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔍 Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🎟 Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


// ==========================
// 🔒 PROTECTED ROUTE
// ==========================
app.get("/api/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


// ==========================
// 🚀 START SERVER
// ==========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});