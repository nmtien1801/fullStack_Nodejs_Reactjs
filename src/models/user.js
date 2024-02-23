"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // sequelize defind relationship stackoverflow
      User.belongsTo(models.Group, { foreignKey: "groupID" });
      User.belongsToMany(models.Project, { through: "Project_User" });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      passWord: DataTypes.STRING,
      userName: DataTypes.STRING,
      address: DataTypes.STRING,
      sex: DataTypes.STRING,
      phone: DataTypes.STRING,
      image: DataTypes.STRING,  // add column
      groupID: DataTypes.INTEGER,
      positionId: DataTypes.STRING,  // add column
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
