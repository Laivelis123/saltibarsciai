const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const db = require("./models");

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
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

app.use("/api/auth", require("./routes/auth"));
app.use("/api/categories", require("./routes/category"));
app.use("/api/groups", require("./routes/group"));
app.use("/api/quizzes", require("./routes/quiz"));
app.use("/api/quizzes/questions", require("./routes/quest"));
app.use("/api/quizzes/assigned", require("./routes/asigned"));
db.sequelize.sync().then(() => {
  console.log("Database connected");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
