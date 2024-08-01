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
      User.belongsTo(models.AllCodes, {
        foreignKey: "positionID",
        targetKey: "keyMap",
        as: "positionData",
      });
      User.belongsTo(models.AllCodes, {
        foreignKey: "sex",
        targetKey: "keyMap",
        as: "genderData",
      });
      User.hasOne(models.Markdown, {
        foreignKey: "doctorID",
      });
      User.hasOne(models.Doctor_Info, {
        foreignKey: "doctorID",
      });

      User.hasMany(models.Schedules, {
        foreignKey: "doctorID",
        as: "doctorData",
      });
      User.hasMany(models.Booking, {
        foreignKey: "patientId",
        as: "patientData",
      });
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
      groupID: DataTypes.INTEGER,
      positionID: DataTypes.STRING, // add column
      image: DataTypes.STRING, // add column -> dùng string để hứng blob đã lưu trong db
      roleID: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
