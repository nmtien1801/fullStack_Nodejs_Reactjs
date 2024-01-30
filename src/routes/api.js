import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import { checkUserJwt, checkUserPermission } from "../middleware/jwtAction";
import roleController from "../controller/roleController";

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
  // middleware
  router.all("*", checkUserJwt, checkUserPermission);

  //rest api - dùng web sử dụng các method (CRUD)
  //GET(R), POST (C), PUT (U), DELETE (D)
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.post("/logout", apiController.handleLogout);
  router.get("/account", userController.getUserAccount);

  // user router
  router.get("/user/read", userController.read);
  router.post("/user/create", userController.create);
  router.put("/user/update", userController.update);
  router.delete("/user/delete", userController.remove);

  // roles router
  router.get("/role/read", roleController.read);
  router.post("/role/create", roleController.create);
  router.put("/role/update", roleController.update);
  router.delete("/role/delete", roleController.remove);

  // group router
  router.get("/group/read", groupController.read);

  return app.use("/api/v1", router);
};

export default initApiRoutes;
