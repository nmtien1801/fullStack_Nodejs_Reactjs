"use strict";
require("dotenv").config(); // có file env nên cài vào cho khỏi lỗi
const { time } = require("console");
const { query } = require("express");
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const db = {};
// const config = require(__dirname + "/../config/config.js")[env];

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

// ======> thay vì lấy thông tin qua file config.json thì trực tiếp qua .env
let sequelize;
const customizeConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  define: {
    freezeTableName: true,
  },
  logging: false,
  timezone: "+07:00",
  // chỉ khi dùng (postgres) thì mới cần đến cái dưới đây
  dialectOptions:
    process.env.DB_SSL === true
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
};
sequelize = new Sequelize(
  process.env.DB_DATABASE_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  customizeConfig
);

// =============================================================================

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
