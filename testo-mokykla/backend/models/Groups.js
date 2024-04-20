const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define("Group", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Group.associate = (models) => {
    Group.belongsTo(models.User, { as: "Controller", foreignKey: "userId" });
    Group.belongsToMany(models.User, {
      through: "UserGroup",
      foreignKey: "groupId",
    });
    Group.belongsToMany(models.Quiz, {
      through: "QuizGroup",
      foreignKey: "groupId",
    });
  };

  // Generate a random code before creating a new Group
  Group.beforeCreate((group) => {
    group.code = uuidv4();
  });

  return Group;
};
