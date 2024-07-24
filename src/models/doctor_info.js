"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_Info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // search: sequelize defind relationship stackoverflow
      Doctor_Info.belongsTo(models.User, {
        foreignKey: "doctorID",
      });

      Doctor_Info.belongsTo(models.AllCodes, {
        foreignKey: "priceID",
        targetKey: "keyMap",
        as: "priceTypeData",
      });
      Doctor_Info.belongsTo(models.AllCodes, {
        foreignKey: "provinceID",
        targetKey: "keyMap",
        as: "provinceTypeData",
      });
      Doctor_Info.belongsTo(models.AllCodes, {
        foreignKey: "paymentID",
        targetKey: "keyMap",
        as: "paymentTypeData",
      });
    }
  }
  Doctor_Info.init(
    {
      doctorID: DataTypes.INTEGER,
      specialtyID: DataTypes.INTEGER,
      clinicID: DataTypes.INTEGER,
      priceID: DataTypes.STRING,
      provinceID: DataTypes.STRING,
      paymentID: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor_Info",
    }
  );
  return Doctor_Info;
};
