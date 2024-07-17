"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AllCodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AllCodes.hasMany(models.User, {
        foreignKey: "positionID",
        as: "positionData",
      });
      AllCodes.hasMany(models.User, {
        foreignKey: "sex",
        as: "genderDate",
      });
      AllCodes.hasMany(models.Schedules, {
        foreignKey: "timeType",
        as: "timeTypeData",
      });

      AllCodes.hasMany(models.Doctor_Info, {
        foreignKey: "priceID",
        as: "priceTypeData",
      });
      AllCodes.hasMany(models.Doctor_Info, {
        foreignKey: "provinceID",
        as: "provinceTypeData",
      });
      AllCodes.hasMany(models.Doctor_Info, {
        foreignKey: "paymentID",
        as: "paymentTypeData",
      });
    }
  }
  AllCodes.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AllCodes",
    }
  );
  return AllCodes;
};
