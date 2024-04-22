const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  sequelize,
  User,
  Quiz,
  Question,
  Answer,
  Grade,
  Group,
  UserQuiz,
  Category,
} = require("../models");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return next({ status: 401, message: "Missing token" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next({ status: 403, message: "Invalid token" });
    req.userId = decoded.id; // Add user id to request object
    next();
  });
};

router.get("/my-quizzes", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const userQuizzes = await UserQuiz.findAll({
      where: { userId },
      include: [
        {
          model: Quiz,
          include: [
            { model: Category, as: "categoryAlias" },
            { model: User, as: "Creator" },
            {
              model: Question,
              required: false,
            },
          ],
        },
      ],
    });
    res.status(200).json({ success: true, userQuizzes });
  } catch (error) {
    console.error("Error fetching UserQuizes:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
