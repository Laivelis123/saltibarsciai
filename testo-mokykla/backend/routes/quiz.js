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
  Student,
  Category,
} = require("../models");

// Middleware to verify JWT token
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
    const { userId } = req; // Access user id from request object
    // Find user's quizzes
    const quizzes = await Quiz.findAll({
      include: [{ model: Category, as: "categoryAlias" }],
    });

    res.status(200).json({ success: true, quizzes });
  } catch (error) {
    console.error("Error retrieving user's quizzes:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.put("/:quizId", verifyToken, async (req, res) => {
  try {
    const { name, category } = req.body; // Ensure the request body contains 'name' and 'category'
    const quizId = req.params.quizId;

    const quiz = await Quiz.findByPk(quizId);

    if (!quiz) {
      return res.status(404).json({ success: false, error: "Quiz not found" });
    }

    quiz.title = name; // Update quiz title
    quiz.categoryId = category; // Update quiz category ID
    await quiz.save();

    res.status(200).json({ success: true, quiz });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.get("/:quizId", verifyToken, async (req, res) => {
  try {
    const quizId = req.params.quizId;

    // Find the quiz by its ID
    const quiz = await Quiz.findByPk(quizId);

    // If quiz is not found, return 404 error
    if (!quiz) {
      return res.status(404).json({ success: false, error: "Quiz not found" });
    }

    // Return the quiz data in the response
    res.status(200).json({ success: true, quiz });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Add Group to Quiz Endpoint
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

// Delete quiz by ID
router.delete("/:quizId", verifyToken, async (req, res) => {
  try {
    const quizId = req.params.quizId;

    // Check if the quiz exists
    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Delete the quiz
    await quiz.destroy();

    res
      .status(200)
      .json({ success: true, message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Remove Group from Quiz Endpoint
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

// Create a new quiz
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, categoryId, groupId, studentId } = req.body;
    const userId = req.userId; // Extracted from middleware

    // Check if the user is authorized to create a quiz
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create the quiz
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

// Add question to a quiz
router.post("/:quizId/questions", verifyToken, async (req, res) => {
  try {
    const { questionText, points } = req.body;
    const quizId = req.params.quizId;

    // Check if the quiz exists
    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Create the question
    const question = await Question.create({
      questionText,
      points,
      quizId,
    });

    res.status(201).json({ success: true, question });
  } catch (error) {
    console.error("Error adding question to quiz:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Grade answers for a quiz
router.post("/:quizId/grade", verifyToken, async (req, res) => {
  try {
    const { answers } = req.body;
    const quizId = req.params.quizId;
    const userId = req.userId;

    // Calculate total score
    let totalScore = 0;
    for (const answer of answers) {
      const question = await Question.findByPk(answer.questionId);
      if (!question) {
        return res.status(400).json({ error: "Question not found" });
      }
      const correctAnswer = await Answer.findOne({
        where: { questionId: answer.questionId, isCorrect: true },
      });
      if (correctAnswer && correctAnswer.answerText === answer.answerText) {
        totalScore += question.points;
      }
    }

    // Save grade
    const grade = await Grade.create({
      userId,
      quizId,
      score: totalScore,
    });

    res.status(201).json({ success: true, grade });
  } catch (error) {
    console.error("Error grading quiz:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Get assigned groups for a quiz
router.get("/:quizId/groups", verifyToken, async (req, res) => {
  try {
    const { quizId } = req.params;

    // Find the quiz by its ID
    const quiz = await Quiz.findByPk(quizId, {
      include: [{ model: Group, as: "groups" }], // Use the correct alias "groups"
    });

    // If quiz is not found, return 404 error
    if (!quiz) {
      return res.status(404).json({ success: false, error: "Quiz not found" });
    }

    // Return the assigned groups for the quiz
    res.status(200).json({ success: true, groups: quiz.groups });
  } catch (error) {
    console.error("Error fetching assigned groups for quiz:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Endpoint to assign quiz to users in a group
router.post("/assign-quiz", verifyToken, async (req, res) => {
  try {
    const { quizId, groupId } = req.body;

    // Find all users belonging to the specified group
    const group = await Group.findByPk(groupId, { include: User });
    if (!group || !group.Users) {
      return res
        .status(404)
        .json({ success: false, error: "Group not found or has no users" });
    }

    // Extract user ids from the group
    const userIds = group.Users.map((user) => user.id);

    // Check if the user is already assigned to the quiz
    const existingAssignments = await UserQuiz.findAll({
      where: { userId: userIds, quizId },
    });

    // Filter out users who are already assigned to the quiz
    const usersToAdd = userIds.filter(
      (userId) => !existingAssignments.some((a) => a.userId === userId)
    );

    // Assign the quiz to each user
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

    // Here, you can fetch assigned users for the quiz using any method you prefer.
    // For example, if the assigned users are stored in a separate UserQuiz model, you can query that model.
    const assignedUsers = await UserQuiz.findAll({
      where: { quizId }, // Query by quizId
      include: [{ model: User }], // Include User model to get user details
    });

    // Extract relevant user information
    const users = assignedUsers.map((userQuiz) => ({
      id: userQuiz.userId,
      username: userQuiz.User.username,
      // Add more user details if needed
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

    // Here, you would remove the user from the UserQuiz table based on quizId and userId
    // For example:
    await UserQuiz.destroy({ where: { quizId, userId } });

    res.status(200).json({ success: true, message: "User removed from quiz" });
  } catch (error) {
    console.error("Error removing user from quiz:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});
module.exports = router;
