"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // sequelize defind relationship stackoverflow
      Booking.belongsTo(models.User, {
        foreignKey: "patientId",
        targetKey: "id",
        as: "patientData",
      });

      Booking.belongsTo(models.AllCodes, {
        foreignKey: "timeType",
        targetKey: "keyMap",
        as: "timeTypeDataPatient", // trùng tên: You have used the alias ${options.as} in two separate associations
      });
    }
  }
  Booking.init(
    {
      statusId: DataTypes.STRING, // key của allcode
      doctorId: DataTypes.INTEGER,
      patientId: DataTypes.INTEGER,
      date: DataTypes.DATE,
      timeType: DataTypes.STRING,
      token: DataTypes.STRING, // dùng để tạo link <a> khi click vào trạng thái sẽ chuyển (chờ -> xác nhận)
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
