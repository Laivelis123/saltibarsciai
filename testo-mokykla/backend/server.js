const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const db = require("./models");

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const groupRoutes = require("./routes/groupRoutes");
const quizRoutes = require("./routes/quizRoutes");
const questionRoutes = require("./routes/questionRoutes");
const profileRoutes = require("./routes/profileRoutes");
const assignedRoutes = require("./routes/assignedRoutes");
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
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(
  session({
    secret: "your_session_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/quizzes/questions", questionRoutes);
app.use("/api/quizzes/assigned", assignedRoutes);
app.use("/api/profile", profileRoutes);

db.sequelize.sync().then(() => {
  console.log("Database connected");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
