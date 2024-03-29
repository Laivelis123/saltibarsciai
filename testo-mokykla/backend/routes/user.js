const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models");

router.get("/user", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      console.log("Session expired or invalid token. User disconnected.");
      return res
        .status(401)
        .json({ error: "Session expired or invalid token." });
    }
    const user = await User.findOne({ where: { username: decoded.username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      username: user.username,
      email: user.email,
      accountType: user.accountType,
    });
  } catch (error) {
    console.error("Error finding user:", error);
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      console.log("Session expired or invalid token. User disconnected.");
      return res
        .status(401)
        .json({ error: "Session expired or invalid token." });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
