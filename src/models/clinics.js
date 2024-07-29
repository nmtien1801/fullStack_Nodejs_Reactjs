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
      descriptionHTML: DataTypes.TEXT,
      descriptionMarkdown: DataTypes.TEXT,
      image: DataTypes.STRING, // dùng string để hứng blob đã lưu trong db
    },
    {
      sequelize,
      modelName: "Clinics",
    }
  );
  return Clinics;
};
