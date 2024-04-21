const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const User = require("../models/User");
const router = express.Router();

app.post("/upload", async (req, res) => {
  try {
    const imgData = req.body.image;
    const apiKey = process.env.IMGDB_API_KEY;
    const userId = req.body.userId;

    //Requestas i imgdb puslapi, kad ikelti nuotrauka
    const response = await axios.post("https://api.imgbb.com/1/upload", {
      key: apiKey,
      image: imgData,
    });

    //Grazinama nuotraukos url
    const imageUrl = response.data.data.url;

    //Irasoma nuotraukos url i duomenu baze
    await User.update({ pictureUrl: imageUrl }, { where: { id: userId } });

    //Grazinamas atsakymas (url)
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Nepavyko ikelti nuotraukos: ", error);
    res.status(500).json({ message: "Vidinė serverio klaida" });
  }
});

module.exports = router;
