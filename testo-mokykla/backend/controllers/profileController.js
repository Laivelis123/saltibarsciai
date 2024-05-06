const axios = require("axios");
const {
  User,
  UserQuiz,
  UserAnswer,
  UserGroup,
  Session,
  Quiz,
  Question,
  Group,
  Grade,
  Category,
  Answer,
} = require("../models");
const uploadPicture = async (req, res) => {
  try {
    const imgData = req.body.image;
    const userId = req.body.userId;
    const apiKey = process.env.IMGBB_KEY;

    //Patikrinti reiksmes
    // console.log(userId);
    // console.log(apiKey);
    // console.log(imgData);

    if (!imgData || !apiKey || !userId) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    let body = new FormData();
    body.append("key", apiKey);
    body.append("image", imgData.split(",").pop());
    body.append("name", userId);

    const response = await axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload",
      data: body,
      headers: { "Content-Type": "multipart/form-data" },
    });

    //Requestas i imgdb puslapi, kad ikelti nuotrauka
    //Kazkodel neveikia sitaip, reikia perduoti parametrus per url
    // const response = await axios.post("https://api.imgbb.com/1/upload", {
    //   key: apiKey,
    //   image: imgData.split(",").pop(),
    //   name: userId,
    // });

    //Grazinama nuotraukos url
    const imageUrl = response.data.data.url;

    //Irasoma nuotraukos url i duomenu baze
    await User.update({ pictureUrl: imageUrl }, { where: { id: userId } });

    //Grazinamas atsakymas (url)
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error:", error.response.data);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
};

const deletePicture = async (req, res) => {
  try {
    const userId = req.body.userId;

    // Patikrinti reiksmes
    if (!userId) {
      return res.status(400).json({ error: "Nenusiustas user id" });
    }

    // Istrinama nuotraukos url is duomenu bazes
    await User.update({ pictureUrl: null }, { where: { id: userId } });

    res.status(200).json({ message: "Nuotrauka ištrinta sėkmingai" });
  } catch (error) {
    console.error("Error:", error.response.data);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const userId = req.body.userId;
    const userType = req.body.userType;

    //Patikrina reiksmes
    if (!userId || !userType) {
      return res.status(400).json({ error: "Trūksta parametrų." });
    }

    //Ismeta user is misc lenteliu
    if (userType === "teacher") {
      // Fetch quiz IDs created by the teacher
      const quizzes = await Quiz.findAll({ where: { userId: userId } });
      const quizIds = quizzes.map((quiz) => quiz.id);

      // Delete associated student grades, quizzes, questions for each quiz
      await Grade.destroy({ where: { quizId: quizIds } });

      await UserQuiz.destroy({ where: { quizId: quizIds } });

      await Question.destroy({ where: { quizId: quizIds } });

      // Delete all quizzes created by the teacher
      await Quiz.destroy({ where: { userId: userId } });

      // Delete other related records for the teacher
      await Category.destroy({ where: { userId: userId } });
      await Group.destroy({ where: { userId: userId } });
    } else if (userType === "student") {
      await UserQuiz.destroy({ where: { userId: userId } });
      console.log(UserGroup);
      await UserGroup.destroy({ where: { userId: userId } });
      await UserAnswer.destroy({ where: { userId: userId } });
      await Grade.destroy({ where: { userId: userId } });
    }

    // Ismeta vartotoja is user ir sessions lenteliu
    await Session.destroy({ where: { userId: userId } });
    const deletedCount = await User.destroy({ where: { id: userId } });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "Vartotojas nerastas" });
    }
    return res.status(200).json({ message: "Sėkmingai panaikintas profilis." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
};

module.exports = { uploadPicture, deletePicture, deleteProfile };
