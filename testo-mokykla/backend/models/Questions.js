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
    Question.belongsTo(models.Quiz, {
      foreignKey: "quizId",
      onDelete: "CASCADE",
    });
    Question.hasMany(models.Answer, {
      foreignKey: "questionId",
      onDelete: "CASCADE",
    });
  };

  return Question;
};
