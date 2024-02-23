"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Clinics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // search: sequelize defind relationship stackoverflow
    }
  }
  Clinics.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING, // key của allcode
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Clinics",
    }
  );
  return Clinics;
};
