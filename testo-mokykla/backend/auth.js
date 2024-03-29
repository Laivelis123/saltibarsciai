const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("./db");

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    req.token = token;
    next();
  } else {
    res.sendStatus(401);
  }
};
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, accountType } = req.body;

    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email]
    );
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ error: "Vartotojas arba paštas jau egzistuoja" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (username, email, password, accountType) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, accountType]
    );
    res.status(201).json({ message: "Vartotojas priregistruotas sėkmingai" });
  } catch (error) {
    console.error("Klaida registruojant vartotoją:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
});

function generateToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "2h" }); // Token expires in 2 hours
}

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const [user] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (user.length === 0) {
      return res
        .status(401)
        .json({ error: "Neteisingas vartotojo vardas arba slaptažodis." });
    }

    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ error: "Neteisingas vartotojo vardas arba slaptažodis." });
    }

    const token = generateToken({ id: user[0].id, username: user[0].username });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Klaida jungiant vartotoją:", error);
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
});

router.get("/data/user", checkToken, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      console.log(
        "Baigėsi sesija arba nebegalioja žetonas. Atjungiamas vartotojas."
      );
      return res
        .status(401)
        .json({ error: "Baigėsi sesija arba nebegalioja žetonas." });
    }
    const [user] = await pool.query("SELECT * FROM users WHERE username = ?", [
      decoded.username,
    ]);
    res.status(200).json({
      username: user[0].username,
      email: user[0].email,
      accountType: user[0].accountType,
    });
  } catch (error) {
    console.error("Klaida ieškant vartotojo vardo:", error);
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      console.log(
        "Baigėsi sesija arba nebegalioja žetonas. Atjungiamas vartotojas."
      );
      return res
        .status(401)
        .json({ error: "Baigėsi sesija arba nebegalioja žetonas." });
    }
    res.status(500).json({ error: "Vidinė serverio klaida" });
  }
});

module.exports = router;
