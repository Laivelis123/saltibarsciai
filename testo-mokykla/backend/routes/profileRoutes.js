const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.post("/upload", profileController.uploadPicture);
router.post("/delete", profileController.deletePicture);
router.post("/remove", profileController.deleteProfile);
module.exports = router;
