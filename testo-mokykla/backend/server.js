const express = require("express");
const mysql = require("mysql");
const nodemon = require("nodemon");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

//Middleware
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
//MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "projektas",
});

app.post("/registracija", (req, res) => {
  const { username, email, password, accountType } = req.body;

  // Check if username already exists
  db.query("SELECT * FROM user WHERE username = ?", [username], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Klaida registracijos metu" });
    }

    if (rows.length > 0) {
      return res.status(400).json({ error: "Vartotojas jau egzistuoja" });
    }
    db.query(
      "INSERT INTO user (username, email, password, accountType) VALUES (?, ?, ?, ?)",
      [username, email, password, accountType],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Klaida registracijos metu" });
        }
        console.log("User registered successfully");
        return res.status(200).json({ message: "Registration successful" });
      }
    );
  });
});

app.post("/prisijungimas", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM user WHERE name = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (rows.length > 0) {
        res.send({ message: "Sėkmingai prisijungta", result: result });
      } else {
        res.send({ message: "Blogas vartotojo vardas / slaptažodis" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log(`Server running on port 3001`);
});
