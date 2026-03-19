const { connect } = require("../lib/db");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async function (req, res) {
  // ==========================
  // METHOD CHECK
  // ==========================
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const { email, password } = req.body || {};

  // ==========================
  // VALIDATION
  // ==========================
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // ==========================
    // DB CONNECT
    // ==========================
    await connect(process.env.MONGODB_URI);

    // ==========================
    // FIND USER
    // ==========================
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ==========================
    // PASSWORD CHECK
    // ==========================
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ==========================
    // TOKEN GENERATION
    // ==========================
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ==========================
    // RESPONSE (VERY IMPORTANT)
    // ==========================
    const response = {
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };

    console.log("✅ LOGIN RESPONSE:", response); // 🔥 DEBUG

    return res.status(200).json(response);

  } catch (error) {
    console.error("❌ LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};