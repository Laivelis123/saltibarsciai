module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 16],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 72],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [1, 128],
      },
    },
    accountType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 16],
      },
    },
    pictureUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  });

  User.associate = (models) => {
    User.hasOne(models.Session, { foreignKey: "userId" });
    User.belongsToMany(models.Group, {
      through: "UserGroup",
      foreignKey: "userId",
    });
    User.belongsToMany(models.Category, {
      as: "UserCategories",
      through: "UserCategory",
    });
    User.belongsToMany(models.Quiz, {
      as: "CreatedQuizzes",
      through: "UserCreatedQuizzes",
    });
    User.belongsToMany(models.Quiz, {
      as: "AllowedQuizzes",
      through: "UserAllowedQuizzes",
    });
  };

  return User;
};
