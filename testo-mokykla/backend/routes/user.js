const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Gauna vartotojo duomenis pagal žetoną.
router.get("/user", async (req, res) => {
  try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //console.log("decoded", decoded.username);
    if (!decoded) {
      console.log(
        "Sesija pasibaigė arba netinkamas žetonas. Vartotojas atsijungė."
      );
      return res
        .status(401)
        .json({ error: "Sesija pasibaigė arba netinkamas žetonas." });
    }
      const user = await User.findOne({ where: { username: decoded.username } });
    if (!user) {
      return res.status(404).json({ error: "Vartotojas nerastas" });
      }
      //console.log("Decoded token:", user);
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      accountType: user.accountType,
    });
  } catch (error) {
    console.error("Klaida ieškant vartotojo:", error);
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      console.log(
        "Sesija pasibaigė arba netinkamas žetonas. Vartotojas atsijungė."
      );
      return res
        .status(401)
        .json({ error: "Sesija pasibaigė arba netinkamas žetonas." });
    }
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
});

module.exports = router;
