const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const db = require("./models");

db.User.hasOne(db.Session, { foreignKey: "userId" });
db.Session.belongsTo(db.User, { foreignKey: "userId" });

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
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
app.use("/api/auth", require("./routes/auth"));
app.use("/api/data", require("./routes/user"));
db.sequelize.sync().then(() => {
  console.log("Database connected");
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
