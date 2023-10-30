import express from "express";
import homeController from "../controller/homeController";
const router = express.Router(); // bằng app = express();
/**
 *
 * @param {*} app : express app
 * @returns
 */

const handleAbout = (req, res) => {
  return res.send("this is about");
};
const initWebRoutes = (app) => {
  // path và controller
  app.get("/", homeController.handleHome);
  router.post("/user", homeController.handleUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  return app.use("/", router);
};

export default initWebRoutes;
