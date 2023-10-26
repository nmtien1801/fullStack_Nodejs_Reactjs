import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
require("dotenv").config();

const app = express();
// config viewEngine
configViewEngine(app);

// config body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// init web router
initWebRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`>>> jwt backend is running on the port ${PORT}`);
});
