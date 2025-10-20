// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/User.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173", // ✅ Local dev
      "https://portfolio-dynamic-auth-qimahzwqm-jayaschool1981-rgbs-projects.vercel.app", // ✅ Your Vercel domain
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);


// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

/* ===============================
   🔐 REGISTER ROUTE
================================= */
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log("📩 Register request:", username);

    // check existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({ username, passwordHash });
    await newUser.save();

    res.json({ success: true, message: "User registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ===============================
   🔑 LOGIN ROUTE
================================= */
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("🔐 Login attempt:", username);
    const user = await User.findOne({ username });

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ success: true, token, username });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ===============================
   🧠 PROTECTED ROUTE (for testing)
================================= */
app.get("/api/user", verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

function verifyToken(req, res, next) {
  const header = req.headers.authorization;
  if (!header)
    return res.status(403).json({ message: "No token provided" });

  try {
    const token = header.split(" ")[1];
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
