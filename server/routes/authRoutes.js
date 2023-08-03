const express = require("express");
const router = express.Router();
const User = require("../models/user");
const generateColor = require("../utils/generateColor");

router.post("/register", async (req, res) => {
  try {
    const { username } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Generate the user's unique color based on the username
    const color = generateColor();

    // Create a new user with the provided details and the generated color
    const newUser = new User({
      username,
      color,
    });

    await newUser.save();

    req.session.user = {
      id: newUser._id,
      username: newUser.username,
      color: newUser.color,
    };

    res.status(201).json({ message: "User registered successfully", color });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
