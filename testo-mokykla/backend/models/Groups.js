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
  };

  return Group;
};
