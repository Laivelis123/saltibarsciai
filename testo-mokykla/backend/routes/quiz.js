const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
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
    req.userId = decoded.id;
    next();
  });
};

router.get("/my-quizzes", verifyToken, async (req, res) => {
  try {
    const { userId } = req;
    const quizzes = await Quiz.findAll({
      where: { userId },
      include: [
        {
          model: Category,
          as: "categoryAlias",
        },
      ],
    });
    res.status(200).json({ success: true, quizzes });
  } catch (error) {
    console.error("Error retrieving user's quizzes:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.put("/:quizId", verifyToken, async (req, res) => {
  try {
    const { name, category } = req.body;
    const quizId = req.params.quizId;

    const quiz = await Quiz.findByPk(quizId);

    if (!quiz) {
      return res.status(404).json({ success: false, error: "Quiz not found" });
    }

    quiz.title = name;
    quiz.categoryId = category;
    await quiz.save();

    res.status(200).json({ success: true, quiz });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.get("/:quizId", verifyToken, async (req, res) => {
  try {
    const { quizId } = req.params;
    const userId = req.userId;

    const userQuiz = await UserQuiz.findOne({
      where: { userId, quizId },
    });

    if (!userQuiz || userQuiz.submitted) {
      return res
        .status(400)
        .json({ message: "Quiz already submitted or not found" });
    }

    const quiz = await Quiz.findByPk(quizId);

    if (!quiz) {
      return res.status(404).json({ success: false, error: "Quiz not found" });
    }

    const quizData = {
      ...quiz.toJSON(),
      submitted: userQuiz.submitted,
    };

    res.status(200).json({ success: true, quiz: quizData });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/:quizId/groups/:groupId", verifyToken, async (req, res) => {
  try {
    const { quizId, groupId } = req.params;

    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, error: "Quiz not found" });
    }

    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ success: false, error: "Group not found" });
    }

    await quiz.addGroup(group);

    res.status(200).json({ success: true, message: "Group added to quiz" });
  } catch (error) {
    console.error("Error adding group to quiz:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.delete("/:quizId", verifyToken, async (req, res) => {
  try {
    const quizId = req.params.quizId;

    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    await quiz.destroy();

    res
      .status(200)
      .json({ success: true, message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.delete("/:quizId/groups/:groupId", verifyToken, async (req, res) => {
  try {
    const { quizId, groupId } = req.params;

    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, error: "Quiz not found" });
    }

    const group = await Group.findByPk(groupId);
    if (!group) {
      return res.status(404).json({ success: false, error: "Group not found" });
    }

    await quiz.removeGroup(group);

    res.status(200).json({ success: true, message: "Group removed from quiz" });
  } catch (error) {
    console.error("Error removing group from quiz:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, categoryId, groupId, studentId } = req.body;
    const userId = req.userId;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const quiz = await Quiz.create({
      title,
      categoryId,
      userId,
      groupId,
      studentId,
    });

    res.status(201).json({ success: true, quiz });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.get("/:quizId/groups", verifyToken, async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findByPk(quizId, {
      include: [{ model: Group, as: "groups" }],
    });

    if (!quiz) {
      return res.status(404).json({ success: false, error: "Quiz not found" });
    }

    res.status(200).json({ success: true, groups: quiz.groups });
  } catch (error) {
    console.error("Error fetching assigned groups for quiz:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/assign-quiz", verifyToken, async (req, res) => {
  try {
    const { quizId, groupId } = req.body;

    const group = await Group.findByPk(groupId, { include: User });
    if (!group || !group.Users) {
      return res
        .status(404)
        .json({ success: false, error: "Group not found or has no users" });
    }

    const userIds = group.Users.map((user) => user.id);

    const existingAssignments = await UserQuiz.findAll({
      where: { userId: userIds, quizId },
    });

    const usersToAdd = userIds.filter(
      (userId) => !existingAssignments.some((a) => a.userId === userId)
    );

    await Promise.all(
      usersToAdd.map(async (userId) => {
        await UserQuiz.create({ userId, quizId });
      })
    );

    res
      .status(200)
      .json({ success: true, message: "Quiz assigned to users in the group" });
  } catch (error) {
    console.error("Error assigning quiz to users:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.get("/:quizId/users", verifyToken, async (req, res) => {
  try {
    const { quizId } = req.params;

    const assignedUsers = await UserQuiz.findAll({
      where: { quizId },
      include: [{ model: User }],
    });

    const users = assignedUsers.map((userQuiz) => ({
      id: userQuiz.userId,
      username: userQuiz.User.username,
    }));

    res.status(200).json({ success: true, assignedUsers: users });
  } catch (error) {
    console.error("Error fetching assigned users:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});
router.delete("/:quizId/users/:userId", verifyToken, async (req, res) => {
  try {
    const { quizId, userId } = req.params;

    await UserQuiz.destroy({ where: { quizId, userId } });

    res.status(200).json({ success: true, message: "User removed from quiz" });
  } catch (error) {
    console.error("Error removing user from quiz:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
