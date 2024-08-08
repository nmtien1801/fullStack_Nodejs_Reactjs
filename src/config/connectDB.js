import { reject } from "lodash";

const { Sequelize } = require("sequelize");
require("dotenv").config();

// connect DB (dataBaseName, userName, password, {host, dialect})
// ============ dùng cho mySql (xampp)==========
// const sequelize = new Sequelize(
//   process.env.DB_DATABASE_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: process.env.DB_DIALECT,
//     logging: false,
//     timezone: "+07:00",
//   }
// );

// =============== dùng cho Postgres(postgess) ===============
const sequelize = new Sequelize(
  process.env.DB_DATABASE_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false,
    timezone: "+07:00",
    dialectOptions:
      process.env.DB_SSL === true
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
  }
);

//test connect
const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connection;
