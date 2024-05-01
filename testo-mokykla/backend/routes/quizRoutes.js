const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const quizController = require("../controllers/quizController");

router.get("/my-quizzes", verifyToken, quizController.getTeacherQuizzes);
router.post("/create", verifyToken, quizController.createQuiz);
router.delete("/:quizId", verifyToken, quizController.deleteQuiz);
router.put("/:quizId", verifyToken, quizController.updateQuiz);
router.post("/assign-quiz", verifyToken, quizController.assignQuizToGroupUsers);
router.get("/:quizId/users", verifyToken, quizController.getAssignedQuizUsers);
router.delete(
  "/:quizId/users/:userId",
  verifyToken,
  quizController.removeUserFromAssignedQuiz
);

module.exports = router;
