module.exports = (sequelize, DataTypes) => {
  const UserGroup = sequelize.define("UserGroup", {
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    groupId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  });

  UserGroup.associate = (models) => {
    UserGroup.belongsTo(models.User, { foreignKey: "userId" });
    UserGroup.belongsTo(models.Group, { foreignKey: "groupId" });
  };
  return UserGroup;
};
