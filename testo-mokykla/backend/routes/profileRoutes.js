const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.post("/upload", profileController.uploadPicture);

module.exports = router;
