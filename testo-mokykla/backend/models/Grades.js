module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define("Grade", {
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
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  Grade.associate = (models) => {
    Grade.belongsTo(models.User, { foreignKey: "userId" });
    Grade.belongsTo(models.Quiz, { foreignKey: "quizId" });
  };

  return Grade;
};
