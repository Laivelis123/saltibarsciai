const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const assignedController = require("../controllers/assignedController");

//StudentAverages

router.get("/done-quizzes", verifyToken, assignedController.getDoneQuizzes);
router.get("/take/:quizId", verifyToken, assignedController.getQuizForTake);

router.get("/my-quizzes", verifyToken, assignedController.getMyQuizzes);
router.get(
  "/average-all-categories",
  verifyToken,
  assignedController.getMyAllAverages
);

router.get(
  "/students-averages",
  verifyToken,
  assignedController.getAllUsersAverage
);
router.get("/average-all", verifyToken, assignedController.getMyAverage);

//TeacherRoutes
// Mokytojas gali pašalinti pažymį, gali gauti visus savo sukurtus testus

router.delete(
  "/remove-grade/:quizId/:userId",
  verifyToken,
  assignedController.removeStudentGradeFromQuiz
);

router.get(
  "/teacher-quizzes",
  verifyToken,
  assignedController.getMyCreatedQuizzes
);

//StudentRoutes
//Studentai galės gauti testą, jį atlikti ir pateikti, gauti pažymį, gauti visų kategorijų vidurkius,
//gauti visų testų vidurkį, gauti visus atliktus testus

router.post("/submit/:quizId", verifyToken, assignedController.submitQuiz);
//TeacherStudentRoutes
//Abu gali peržiūrėti baigtą testą
router.get(
  "/review/:quizId/:userId",
  verifyToken,
  assignedController.getQuizPreview
);
module.exports = router;
