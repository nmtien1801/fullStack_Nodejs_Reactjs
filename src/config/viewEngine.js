import express from "express";
/**
 *
 * @param {*} app - express app
 */

const configViewEngine = (app) => {
  app.use(express.static("./src/public"));
  app.set("view engine", "ejs"); // dùng ejs để viết html
  app.set("views", "./src/views"); // nếu thấy file ejs thì sẽ tìm trong views
};

export default configViewEngine;
