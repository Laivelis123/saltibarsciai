const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  refreshToken,
  getUserData,
  logoutUser,
  updatePassword,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshToken);
router.get("/user", getUserData);
router.post("/update-password", updatePassword);
module.exports = router;
