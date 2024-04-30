module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define("Quiz", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false, // Represents the creator (teacher) of the quiz
    },
  });

  Quiz.associate = (models) => {
    Quiz.hasMany(models.UserQuiz, { foreignKey: "quizId" });
    Quiz.belongsTo(models.User, { as: "Creator", foreignKey: "userId" });
    Quiz.belongsTo(models.Category, {
      as: "categoryAlias",
      foreignKey: "categoryId",
    });
    Quiz.hasMany(models.Question, { foreignKey: "quizId" });
  };

  return Quiz;
};
