const {
  sequelize,
  User,
  Quiz,
  Question,
  Group,
  Answer,
  Grade,
  UserAnswer,
  UserQuiz,
  Category,
} = require("../models");

//StudentAverages

const getMyQuizzes = async (req, res) => {
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
    console.error("Klaida gaunant priskirtus testus:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
};
const getMyAllAverages = async (req, res) => {
  try {
    const userId = req.userId;
    const userAveragesByCategories = await Grade.findAll({
      where: {
        userId,
      },
      attributes: [
        "quizId",
        [sequelize.fn("AVG", sequelize.col("score")), "average"],
      ],
      include: [
        {
          model: Quiz,
          include: [{ model: Category, as: "categoryAlias" }],
        },
      ],
      group: ["quizId"],
    });
    res.status(200).json({ success: true, userAveragesByCategories });
  } catch (error) {
    console.error("Klaida gaunant visus vidurkius:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
};

const getMyAverage = async (req, res) => {
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

    const average =
      userGrades.reduce((acc, grade) => acc + grade.score, 0) /
      userGrades.length;

    res.status(200).json({ success: true, average });
  } catch (error) {
    console.error("Klaida gaunant bendrą vidurkį:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
};

const getDoneQuizzes = async (req, res) => {
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
    console.error("Klaida gaunant vartotojo baigtus testus:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
};
//TeacherRoutes
// Mokytojas gali pašalinti pažymį, gali gauti visus savo sukurtus testus
const removeStudentGradeFromQuiz = async (req, res) => {
  try {
    const { quizId, userId } = req.params;
    const user = req.userId;
    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Testas nerastas" });
    }
    if (quiz.userId !== user) {
      return res
        .status(403)
        .json({ message: "Neturite teisių pašalinti vartotojo pažymio" });
    }
    await Grade.destroy({ where: { quizId, userId } });
    await UserAnswer.destroy({ where: { quizId, userId } });
    const userQuiz = await UserQuiz.findOne({
      where: { userId, quizId, submitted: true },
    });
    if (userQuiz) {
      await userQuiz.update({ submitted: false });
    } else {
      return res.status(400).json({ message: "Testas nebuvo priduotas" });
    }
    res.status(200).json({ message: "Pažymys sėkmingai pašalintas" });
  } catch (error) {
    console.error("Klaida šalinant pažymį:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
};
const getMyCreatedQuizzes = async (req, res) => {
  try {
    const userId = req.userId;
    const quizzes = await Quiz.findAll({
      where: { userId },
      include: [
        {
          model: UserQuiz,
          where: { submitted: true },
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
    console.error("Klaida gaunant mokytojo testus:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
};
const getAllUsersAverage = async (req, res) => {
  try {
    const userId = req.userId;
    const groups = await Group.findAll({
      where: { userId },
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });

    if (!groups || groups.length === 0) {
      return res.status(404).json({ success: false, error: "Grupės nerastos" });
    }

    const result = [];

    for (const group of groups) {
      const userIds = group.Users.map((user) => user.id);
      const userGrades = await Grade.findAll({
        where: { userId: userIds },
        include: [
          {
            model: Quiz,
            include: [
              { model: Category, as: "categoryAlias", attributes: ["name"] },
            ],
            attributes: ["id", "categoryId"],
          },
        ],
      });

      const categoryAverages = {};

      for (const grade of userGrades) {
        const categoryId = grade.Quiz.categoryId;
        const categoryName = grade.Quiz.categoryAlias.name;

        const score = grade.score;

        if (!categoryAverages[categoryId]) {
          categoryAverages[categoryId] = {
            name: categoryName,
            totalScore: 0,
            totalCount: 0,
          };
        }

        categoryAverages[categoryId].totalScore += score;
        categoryAverages[categoryId].totalCount++;
      }

      const userAverages = group.Users.map((user) => {
        const userGradesFiltered = userGrades.filter(
          (grade) => grade.userId === user.id
        );

        const userAverage =
          userGradesFiltered.reduce((acc, grade) => acc + grade.score, 0) /
          userGradesFiltered.length;

        return {
          id: user.id,
          username: user.username,
          averageGrade: userAverage,
        };
      });

      const groupCategoryAverages = Object.entries(categoryAverages).map(
        ([categoryId, categoryData]) => ({
          categoryId,
          categoryName: categoryData.name,
          averageGrade:
            categoryData.totalCount !== 0
              ? categoryData.totalScore / categoryData.totalCount
              : 0,
        })
      );

      const groupAverage =
        userAverages.reduce((acc, user) => acc + user.averageGrade, 0) /
        userAverages.length;

      result.push({
        id: group.id,
        name: group.name,
        users: userAverages,
        groupCategoryAverages,
        averageGrade: groupAverage,
      });
    }

    res.status(200).json({ success: true, groups: result });
  } catch (error) {
    console.error("Klaida gaunant mokinių vidurkius:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
};

//StudentRoutes
//Studentai galės gauti testą, jį atlikti ir pateikti, gauti pažymį, gauti visų kategorijų vidurkius,
//gauti visų testų vidurkį, gauti visus atliktus testus
const getQuizForTake = async (req, res) => {
  try {
    const userId = req.userId;
    const quizId = req.params.quizId;
    const userQuiz = await UserQuiz.findOne({
      where: { userId, quizId, submitted: false },
    });
    if (!userQuiz) {
      return res.status(400).json({ message: "Testas jau buvo užbaigtas" });
    }

    const quiz = await Quiz.findByPk(quizId, {
      include: {
        model: Question,
        include: Answer,
      },
    });
    if (!quiz) {
      return res.status(404).json({ success: false, error: "Testas nerastas" });
    }
    const questions = quiz.Questions.map((question) => {
      const { id, questionText, Answers } = question;
      const answers = Answers.map((answer) => ({
        id: answer.id,
        answerText: answer.answerText,
      }));
      return { id, questionText, answers };
    });

    res.status(200).json({
      success: true,
      quiz: { id: quiz.id, title: quiz.title, questions },
    });
  } catch (error) {
    console.error("Klaida gaunant testą:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
};

const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const userId = req.userId;
    const userQuiz = await UserQuiz.findOne({
      where: { userId, quizId, submitted: false },
    });

    if (!userQuiz) {
      return res.status(400).json({
        message:
          "Testas jau priteiktas, nerastas arba neturite teisių priduoti testo ",
      });
    }

    const quiz = await Quiz.findByPk(quizId, {
      include: {
        model: Question,
        include: Answer,
      },
    });

    if (!quiz) {
      return res.status(404).json({ success: false, error: "Testas nerastas" });
    }

    const questions = quiz.Questions;

    if (!questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Netinkami testo duomenys" });
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
        if (selectedAnswerIds.includes(answer.id)) {
          questionScore += answer.points;
          await UserAnswer.create({
            userId,
            quizId,
            questionId: question.id,
            answerId: answer.id,
          });
        }
        if (answer.points > 0) {
          maxPoints += answer.points;
        }
      }

      totalScore += questionScore;
      totalMaxPoints += maxPoints;
    }
    totalScore = totalScore < 0 ? 0 : totalScore;
    const grade = (totalScore / totalMaxPoints) * 100;

    await Grade.create({
      userId,
      quizId,
      score: grade,
    });

    userQuiz.submitted = true;
    await userQuiz.save();

    res.status(200).json({ message: "Testas sėkmingai priduotas", grade });
  } catch (error) {
    console.error("Klaida priduodant testą:", error);
    res.status(500).json({ message: "Vidinė serverio klaida" });
  }
};
//TeacherStudentRoutes
//Abu gali peržiūrėti baigtą testą
const getQuizPreview = async (req, res) => {
  try {
    const { quizId, userId } = req.params;
    const user = req.userId;
    const userAnswers = await UserAnswer.findAll({
      where: { userId, quizId },
      include: Answer,
    });
    const userQuiz = await UserQuiz.findOne({
      where: { userId, quizId },
    });
    if (!userQuiz || !userQuiz.submitted) {
      return res
        .status(400)
        .json({ message: "Testas nebaigtas arba nerastas" });
    }
    const quiz = await Quiz.findByPk(quizId, {
      include: {
        model: Question,
        include: Answer,
      },
    });
    if (!quiz) {
      return res.status(404).json({ success: false, error: "Testas nerastas" });
    }
    if (quiz.userId !== user && userQuiz.userId !== user) {
      return res
        .status(403)
        .json({ message: "Neturite teisių peržiūrėti šio testo" });
    }

    const userGrade = await Grade.findOne({
      where: { userId, quizId },
      include: [{ model: User, attributes: ["id", "username"] }],
    });
    const quizData = {
      id: quiz.id,
      title: quiz.title,
      questions: quiz.Questions.map((question) => {
        const allAnswers = question.Answers.map((answer) => ({
          id: answer.id,
          answerText: answer.answerText,
          points: answer.points,
        }));
        const allUserAnswers = userAnswers
          .filter((userAnswer) => userAnswer.questionId === question.id)
          .map((userAnswer) => userAnswer.Answer);
        return {
          id: question.id,
          questionText: question.questionText,
          allAnswers,
          allUserAnswers,
        };
      }),
      grade: userGrade.score,
      user: userGrade.User.username,
    };
    res.status(200).json({ success: true, quiz: quizData });
  } catch (error) {
    console.error("Klaida gaunant baigtą testą:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
};
module.exports = {
  getMyQuizzes,
  getMyAllAverages,
  getMyAverage,
  getDoneQuizzes,
  removeStudentGradeFromQuiz,
  getMyCreatedQuizzes,
  getQuizForTake,
  submitQuiz,
  getQuizPreview,
  getAllUsersAverage,
};
