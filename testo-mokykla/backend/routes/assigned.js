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
    req.userId = decoded.id;
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
router.post("/:quizId/submit", verifyToken, async (req, res) => {
  try {
    const { quizId } = req.params;
    const userId = req.userId;
    const userQuiz = await UserQuiz.findOne({
      where: { userId, quizId, submitted: false },
    });
    if (!userQuiz) {
      return res
        .status(400)
        .json({ message: "Quiz has already been submitted" });
    }
    const quiz = await Quiz.findByPk(quizId, {
      include: {
        model: Question,
        include: Answer,
      },
    });
    if (!quiz) {
      return res.status(404).json({ success: false, error: "Quiz not found" });
    }
    const questions = quiz.Questions.map((question) => {
      const { id, questionText, Answers } = question;
      const answers = Answers.map((answer) => ({
        id: answer.id,
        answerText: answer.answerText,
        points: answer.points,
      }));
      return { id, questionText, answers };
    });
    if (!questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Invalid quiz data" });
    }

    let totalScore = 0;
    let totalMaxPoints = 0;
    for (const question of questions) {
      const selectedAnswerIds = req.body.answers[question.id] || [];
      const answers = await Answer.findAll({
        where: { questionId: question.id },
      });

      let questionScore = 0;
      let maxPoints = 0;

      for (const answer of answers) {
        if (answer.points > 0) {
          maxPoints += answer.points;
          if (selectedAnswerIds.includes(answer.id)) {
            questionScore += answer.points;
          }
        }
      }

      totalScore += questionScore;
      totalMaxPoints += maxPoints;
    }
    const grade = (totalScore / totalMaxPoints) * 100;
    await Grade.create({
      userId,
      quizId,
      score: grade,
    });

    userQuiz.submitted = true;
    await userQuiz.save();

    res.status(200).json({ message: "Quiz submitted successfully", grade });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/done-quizzes", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const userGrades = await Grade.findAll({
      where: { userId },
      include: [
        {
          model: Quiz,
          include: [
            { model: Category, as: "categoryAlias" },
            { model: User, as: "Creator" },
          ],
        },
      ],
    });

    res.status(200).json({ success: true, userGrades });
  } catch (error) {
    console.error("Error fetching user grades:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});
router.get("/teacher-quizzes", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const quizzes = await Quiz.findAll({
      where: { userId },
      include: [
        {
          model: UserQuiz,
          attributes: ["userId", "quizId", "submitted"],
        },
      ],
    });

    const quizIds = quizzes.map((quiz) => quiz.id);

    const grades = await Grade.findAll({
      where: { quizId: quizIds },
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Quiz, attributes: ["id", "title"] },
      ],
    });

    res.status(200).json({ quizzes, grades });
  } catch (error) {
    console.error("Error fetching teacher quizzes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/remove-grade/:quizId/:userId", verifyToken, async (req, res) => {
  try {
    const { quizId, userId } = req.params;
    await Grade.destroy({ where: { quizId, userId } });
    const userQuiz = await UserQuiz.findOne({
      where: { userId, quizId, submitted: true },
    });
    if (userQuiz) {
      await userQuiz.update({ submitted: false });
    } else {
      return res
        .status(400)
        .json({ message: "Quiz has already been submitted" });
    }
    res.status(200).json({ message: "Grade removed successfully" });
  } catch (error) {
    console.error("Error removing grade:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
