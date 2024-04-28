// models/UserAnswer.js

module.exports = (sequelize, DataTypes) => {
  const UserAnswer = sequelize.define("UserAnswer", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quizId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    answerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  UserAnswer.associate = (models) => {
    UserAnswer.belongsTo(models.User, { foreignKey: "userId" });
    UserAnswer.belongsTo(models.Quiz, { foreignKey: "quizId" });
    UserAnswer.belongsTo(models.Question, { foreignKey: "questionId" });
    UserAnswer.belongsTo(models.Answer, { foreignKey: "answerId" });
  };

  return UserAnswer;
};
