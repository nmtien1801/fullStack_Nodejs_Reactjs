import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";

const router = express.Router(); // bằng app = express();
/**
 *
 * @param {*} app : express app
 * @returns
 */

const handleAbout = (req, res) => {
  return res.send("this is about");
};
const initApiRoutes = (app) => {
  //rest api - dùng web sử dụng các method (CRUD)
  //GET(R), POST (C), PUT (U), DELETE (D)
  router.get("/test-api", apiController.testApi);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  router.get("/user/read", userController.read);
  router.post("/user/create", userController.create);
  router.put("/user/update", userController.update);
  router.delete("/user/delete", userController.remove);

  router.get("/group/read", groupController.read);

  return app.use("/api/v1", router);
};

export default initApiRoutes;
