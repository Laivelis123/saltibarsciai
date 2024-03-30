module.exports = (sequelize, DataTypes) => {
  const UserQuiz = sequelize.define("UserQuiz", {
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
  });

  UserQuiz.associate = (models) => {
    UserQuiz.belongsTo(models.User, { foreignKey: "userId" });
    UserQuiz.belongsTo(models.Quiz, { foreignKey: "quizId" });
  };

  return UserQuiz;
};
