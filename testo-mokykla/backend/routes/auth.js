const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Session } = require("../models");
const { Op } = require("sequelize");

// Generuoja žetoną pagal vartotoją su nurodytu galiojimo laiku.
const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "2h" });
};
// Registruoja naują vartotoją.
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, accountType } = req.body;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Vartotojas arba el. paštas jau egzistuoja" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      accountType,
    });

    res.status(201).json({ message: "Vartotojas sėkmingai užregistruotas" });
  } catch (error) {
    console.error("Klaida registruojant vartotoją:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
});

// Prisijungia vartotoją.
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({ error: "Neteisingas vartotojo vardas arba slaptažodis." });
    }

    // Patikrina, ar vartotojas jau turi sesiją.
    let session = await Session.findOne({ where: { userId: user.id } });

    if (!session) {
      // Jei sesija neegzistuoja, sukuria naują.
      session = await Session.create({
        userId: user.id,
        ipAddress: req.ip,
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // Pasibaigs po 2 valandų
      });
    } else {
      // Jei sesija egzistuoja, ją atnaujina.
      session.ipAddress = req.ip;
      session.expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // Atnaujina galiojimo laiką
      await session.save();
    }

    const accessToken = generateToken({
      id: user.id,
      username: user.username,
    });
    const refreshToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_REFRESH_SECRET
    );
    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Klaida prisijungiant vartotoją:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
});
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.sendStatus(204);
  } catch (error) {
    console.error("Klaida atsijungiant:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
});
router.post("/refresh", async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    if (!decoded) return res.sendStatus(403);

    const session = await Session.findOne({ where: { userId: decoded.id } });
    if (!session) return res.sendStatus(404);

    session.expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
    await session.save();

    const accessToken = generateToken({
      id: decoded.id,
      username: decoded.username,
    });
    res.json({ accessToken });
  } catch (error) {
    console.error("Klaida atnaujintant žetoną:", error);
    return res.sendStatus(500);
  }
});
// Gauna vartotojo duomenis pagal žetoną.
router.get("/user", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Pasimetęs žetonas" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
