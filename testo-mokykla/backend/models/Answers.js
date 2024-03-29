module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define("Answer", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    answerText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    points: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  Answer.associate = (models) => {
    Answer.belongsTo(models.Question, { foreignKey: "questionId" });
  };

  return Answer;
};
