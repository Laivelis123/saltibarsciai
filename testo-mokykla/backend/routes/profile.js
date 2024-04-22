const express = require("express");
const axios = require("axios");
const { User } = require("../models");
const router = express.Router();

router.post("/upload", async (req, res) => {
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
});

module.exports = router;