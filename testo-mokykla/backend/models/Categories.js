module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bulletPoints: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Category.associate = (models) => {
    Category.belongsTo(models.User, { foreignKey: "userId" });
    Category.hasMany(models.Quiz, { foreignKey: "categoryId" });
  };

  return Category;
};
