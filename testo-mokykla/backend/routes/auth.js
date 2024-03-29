const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Session } = require("../models");
const { Op } = require("sequelize");

const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "2h" }); // Token expires in 2 hours
};

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, accountType } = req.body;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      accountType,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Check if the user already has a session
    let session = await Session.findOne({ where: { userId: user.id } });

    if (!session) {
      // If no session exists, create a new one
      session = await Session.create({
        userId: user.id,
        ipAddress: req.ip,
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // Expiring in 2 hours
      });
    } else {
      // If session exists, update it
      session.ipAddress = req.ip;
      session.expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // Update expiration time
      await session.save();
    }

    const token = generateToken({ id: user.id, username: user.username });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
