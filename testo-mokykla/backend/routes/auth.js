const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Session } = require("../models");
const { Op } = require("sequelize");

// Generuoja žetoną pagal vartotoją su nurodytu galiojimo laiku.
const generateToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "2h" }); // Žetonas pasibaigs po 2 valandų
};

router.post("/updateToken", async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_SECRET);

    if (decoded) {
      decoded.exp = Math.floor(Date.now() / 1000) + 2 * 60 * 60; // Atnaujina žetono galiojimo laiką

      const token = jwt.sign(decoded, process.env.JWT_SECRET);

      res.status(200).json({ token });
    }
  } catch (error) {
    res.status(401).json({ error: "Neteisingas arba pasibaigęs žetonas" });
  }
});

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

    if (!user) {
      return res
        .status(401)
        .json({ error: "Neteisingas vartotojo vardas arba slaptažodis." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
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

    const token = generateToken({ id: user.id, username: user.username });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Klaida prisijungiant vartotoją:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
});

module.exports = router;
