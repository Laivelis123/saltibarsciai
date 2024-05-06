const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const questionController = require("../controllers/questionController");

router.post("/:quizId", verifyToken, questionController.addQuestionToQuiz);
router.post(
  "/:quizId/all/:questionId/answers",
  verifyToken,
  questionController.addAnswerToQuestion
);
router.get("/:quizId/all", verifyToken, questionController.getQuizQuestAnswers);

router.put(
  "/:quizId/all/:questionId",
  verifyToken,
  questionController.updateQuizQuestion
);
router.delete(
  "/:quizId/all/:questionId",
  verifyToken,
  questionController.removeQuizQuestion
);
router.delete(
  "/:quizId/all/:questionId/answers/:answerId",
  verifyToken,
  questionController.removeQuestionAnswer
);

module.exports = router;
