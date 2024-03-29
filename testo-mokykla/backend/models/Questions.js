module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("Question", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quizId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    questionText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Question.associate = (models) => {
    Question.belongsTo(models.Quiz, { foreignKey: "quizId" });
    Question.hasMany(models.Answer, { foreignKey: "questionId" });
  };

  return Question;
};
