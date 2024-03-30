// models/category.js
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
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Categories", // Fix typo here
        key: "id",
      },
    },
  });

  Category.associate = (models) => {
    Category.belongsTo(models.User, { foreignKey: "userId" });
    Category.hasMany(models.Quiz, { foreignKey: "categoryId" });
    // Define the parent-child relationship
    Category.hasMany(models.Category, {
      foreignKey: "parentId",
      as: "children",
    });
    Category.belongsTo(models.Category, {
      foreignKey: "parentId",
      as: "parent",
    });
  };

  return Category;
};
