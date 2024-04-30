const express = require("express");
const router = express.Router();
const { User, Quiz, Group, UserQuiz, Category } = require("../models");
const verifyToken = require("./verifyToken");

//TeacherRoutes
//Mokytojas gali sukurti, atnaujinti, ištrinti testą, priskirti testą grupės nariams, peržiūrėti savo testus, pašalinti vartotoją nuo testo
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
    console.error("Klaida gaunant vartotojo sukurtus testus:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

router.post("/create", verifyToken, async (req, res) => {
  try {
    const { title, categoryId, groupId, studentId } = req.body;
    const userId = req.userId;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Vartotojas nerastas" });
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
    console.error("Klaida kuriant testą:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

router.delete("/:quizId", verifyToken, async (req, res) => {
  try {
    const quizId = req.params.quizId;

    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Testas nerastas" });
    }
    if (quiz.userId !== req.userId) {
      return res
        .status(403)
        .json({ error: "Neturite teisių ištrinti šio testo" });
    }
    await quiz.destroy();

    res
      .status(200)
      .json({ success: true, message: "Testas sėkmingai pašalintas", quiz });
  } catch (error) {
    console.error("Klaida šalinant testą:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

router.put("/:quizId", verifyToken, async (req, res) => {
  try {
    const { name, category } = req.body;
    const quizId = req.params.quizId;

    const quiz = await Quiz.findByPk(quizId);

    if (!quiz) {
      return res.status(404).json({ success: false, error: "Testas nerastas" });
    }
    if (quiz.userId !== req.userId) {
      return res
        .status(403)
        .json({ error: "Neturite teisių redaguoti šio testo" });
    }
    quiz.title = name;
    quiz.categoryId = category;
    await quiz.save();

    res.status(200).json({ success: true, quiz });
  } catch (error) {
    console.error("Klaida atnaujinant testą:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

router.post("/assign-quiz", verifyToken, async (req, res) => {
  try {
    const { quizId, groupId } = req.body;

    const group = await Group.findByPk(groupId, { include: User });
    if (!group || !group.Users) {
      return res.status(404).json({
        success: false,
        error: "Grupė nerastas arba ji neturi vartotojų",
      });
    }
    if (group.userId !== req.userId) {
      return res
        .status(403)
        .json({ error: "Neturite teisių priskirti šio testo grupės nariams" });
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
      .json({ success: true, message: "Testas priskirtas grupės vartotojam" });
  } catch (error) {
    console.error("Klaida priskiriant testą grupės nariams:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

router.get("/:quizId/users", verifyToken, async (req, res) => {
  try {
    const { quizId } = req.params;
    const { userId } = req;

    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, error: "Testas nerastas" });
    }

    if (quiz.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Neturite teisių peržiūrėti šio testo grupės narių" });
    }

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
    console.error("Klaida gaunant testui priskirtus vartotojus:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});
router.delete("/:quizId/users/:userId", verifyToken, async (req, res) => {
  try {
    const { quizId, userId } = req.params;

    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ success: false, error: "Testas nerastas" });
    }

    if (quiz.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Neturite teisių pašalinti vartotojo nuo testo" });
    }

    await UserQuiz.destroy({ where: { quizId, userId } });

    res
      .status(200)
      .json({ success: true, message: "Vartotojas pašalintas nuo testo" });
  } catch (error) {
    console.error("Klaida pašalinant vartotoją nuo testo:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});
module.exports = router;
