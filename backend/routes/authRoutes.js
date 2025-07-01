const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("🔐 Login attempt:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: "User not registered" });
    }

    console.log("✅ User found:", user.email);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🧪 Password match result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("🎫 JWT issued");

    res.status(200).json({
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("💥 Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
