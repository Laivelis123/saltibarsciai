const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Quiz, Question, Answer } = require("../models");
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
// Add question to a quiz

router.post("/:quizId", verifyToken, async (req, res) => {
  try {
    const { questionText } = req.body;
    const quizId = req.params.quizId;
    // Check if the quiz exists
    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    // Create the question
    const question = await Question.create({
      questionText,
      quizId,
    });
    res.status(201).json({ success: true, question });
  } catch (error) {
    console.error("Error adding question to quiz:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});
router.get("/:quizId/all", verifyToken, async (req, res) => {
  try {
    const quizId = req.params.quizId;

    // Find the quiz by its ID
    const quiz = await Quiz.findByPk(quizId, {
      include: {
        model: Question,
        include: Answer, // Include answers for each question
      },
    });

    // If quiz is not found, return 404 error
    if (!quiz) {
      return res.status(404).json({ success: false, error: "Quiz not found" });
    }

    // Extract questions with their associated answers
    const questions = quiz.Questions.map((question) => {
      const { id, questionText, Answers } = question;
      // Extract answers for each question
      const answers = Answers.map((answer) => ({
        id: answer.id,
        answerText: answer.answerText,
        points: answer.points,
      }));
      return { id, questionText, answers };
    });
    // Return the questions with their associated answers
    res.status(200).json({ success: true, questions });
  } catch (error) {
    console.error("Error fetching questions for quiz:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.put("/:quizId/all/:questionId", verifyToken, async (req, res) => {
  try {
    const { questionText } = req.body;
    const quizId = req.params.quizId;
    const questionId = req.params.questionId;
    // Check if the quiz exists
    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }
    // Update the question text
    await Question.update(
      { questionText },
      { where: { id: questionId, quizId } }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});
router.delete("/:quizId/all/:questionId", verifyToken, async (req, res) => {
  try {
    const { quizId, questionId } = req.params;

    // Check if the question exists
    const question = await Question.findByPk(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    // Delete associated answers first
    await Answer.destroy({ where: { questionId } });

    // Now delete the question
    await question.destroy();

    res
      .status(200)
      .json({ success: true, message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post(
  "/:quizId/all/:questionId/answers",
  verifyToken,
  async (req, res) => {
    try {
      const { quizId, questionId } = req.params;
      const { answerText, points } = req.body;
      // Check if the quiz exists
      const quiz = await Quiz.findByPk(quizId);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      // Check if the question exists in the quiz
      const question = await Question.findOne({
        where: { id: questionId, quizId },
      });
      if (!question) {
        return res
          .status(404)
          .json({ error: "Question not found in the quiz" });
      }

      // Create the answer
      const answer = await Answer.create({
        answerText,
        points,
        questionId,
      });

      res.status(201).json({ success: true, answer });
    } catch (error) {
      console.error("Error adding answer to question:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
);
router.delete(
  "/:quizId/all/:questionId/answers/:answerId",
  verifyToken,
  async (req, res) => {
    try {
      const { quizId, questionId, answerId } = req.params;

      // Check if the quiz exists
      const quiz = await Quiz.findByPk(quizId);
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      // Check if the question exists in the quiz
      const question = await Question.findOne({
        where: { id: questionId, quizId },
      });
      if (!question) {
        return res
          .status(404)
          .json({ error: "Question not found in the quiz" });
      }

      // Check if the answer exists in the question
      const answer = await Answer.findOne({
        where: { id: answerId, questionId },
      });
      if (!answer) {
        return res
          .status(404)
          .json({ error: "Answer not found in the question" });
      }

      // Delete the answer
      await answer.destroy();

      res
        .status(200)
        .json({ success: true, message: "Answer deleted successfully" });
    } catch (error) {
      console.error("Error removing answer:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
);
module.exports = router;
