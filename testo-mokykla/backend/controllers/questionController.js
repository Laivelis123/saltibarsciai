const { Quiz, Question, Answer, UserQuiz } = require("../models");
//Testo klausimų/atsakymų CRUD operacijos
const addQuestionToQuiz = async (req, res) => {
  try {
    const { questionText } = req.body;
    const quizId = req.params.quizId;
    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Testas nerastas" });
    }
    if (quiz.userId !== req.userId) {
      return res
        .status(403)
        .json({ error: "Neturite teisių pridėti klausimą prie šio testo" });
    }

    const question = await Question.create({
      questionText,
      quizId,
    });
    res.status(201).json({ success: true, question });
  } catch (error) {
    console.error("Klaida pridedant klausimą prie testo:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
};
const addAnswerToQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const { answerText, points } = req.body;
    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Testas nerastas" });
    }
    if (quiz.userId !== req.userId) {
      return res
        .status(403)
        .json({ error: "Neturite teisių pridėti atsakymą prie šio testo" });
    }

    const question = await Question.findOne({
      where: { id: questionId, quizId },
    });
    if (!question) {
      return res.status(404).json({ error: "Klausimas nerastas teste" });
    }

    const answer = await Answer.create({
      answerText,
      points,
      questionId,
    });

    res.status(201).json({ success: true, answer });
  } catch (error) {
    console.error("Klaida pridedant atsakymą prie klausimo:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
};
const updateQuizQuestion = async (req, res) => {
  try {
    const { questionText } = req.body;
    const quizId = req.params.quizId;
    const questionId = req.params.questionId;
    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Testas nerastas" });
    }
    if (quiz.userId !== req.userId) {
      return res
        .status(403)
        .json({ error: "Neturite teisių atnaujinti šio klausimo" });
    }

    await Question.update(
      { questionText },
      { where: { id: questionId, quizId } }
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Klaida atnaujinant klausimą:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
};
const removeQuizQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;

    const question = await Question.findByPk(questionId);
    if (!question) {
      return res.status(404).json({ error: "Klausimas nerastas" });
    }
    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Testas nerastas" });
    }
    if (quiz.userId !== req.userId) {
      return res
        .status(403)
        .json({ error: "Neturite teisių ištrinti šio klausimo" });
    }
    await Answer.destroy({ where: { questionId } });

    await question.destroy();

    res
      .status(200)
      .json({ success: true, message: "Klausimas sėkmingai pašalintas" });
  } catch (error) {
    console.error("Klaida šalinant klausimą:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
};
const removeQuestionAnswer = async (req, res) => {
  try {
    const { quizId, questionId, answerId } = req.params;

    const quiz = await Quiz.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Testas nerastas" });
    }
    if (quiz.userId !== req.userId) {
      return res
        .status(403)
        .json({ error: "Neturite teisių pašalinti šio atsakymo" });
    }
    const question = await Question.findOne({
      where: { id: questionId, quizId },
    });
    if (!question) {
      return res.status(404).json({ error: "Klausimas nerastas teste" });
    }

    const answer = await Answer.findOne({
      where: { id: answerId, questionId },
    });
    if (!answer) {
      return res.status(404).json({ error: "Atsakymas nerastas klausime" });
    }

    await answer.destroy();

    res
      .status(200)
      .json({ success: true, message: "Atsakymas sėkmingai pašalintas" });
  } catch (error) {
    console.error("Klaida šalinant atsakymą:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
};
//Testo klausimų gavimas
const getQuizQuestAnswers = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const userId = req.userId;

    const quiz = await Quiz.findByPk(quizId, {
      include: {
        model: Question,
        include: Answer,
      },
    });

    if (!quiz) {
      return res.status(404).json({ success: false, error: "Testas nerastas" });
    }
    const userQuiz = await UserQuiz.findOne({
      where: { userId, quizId },
    });

    if (quiz.userId !== userId && !userQuiz) {
      return res
        .status(403)
        .json({ error: "Neturite teisių peržiūrėti šio testo klausimų" });
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
    res.status(200).json({ success: true, questions });
  } catch (error) {
    console.error("Klaida gaunant testo klausimus:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
};
module.exports = {
  addQuestionToQuiz,
  addAnswerToQuestion,
  updateQuizQuestion,
  removeQuizQuestion,
  removeQuestionAnswer,
  getQuizQuestAnswers,
};
