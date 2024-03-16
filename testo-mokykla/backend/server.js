const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();

const app = express();
const port = 3001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/api/auth", require("./auth"));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
