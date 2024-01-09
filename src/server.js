import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCORS from "./config/cors";
import bodyParser from "body-parser";
require("dotenv").config();
import connection from "./config/connectDB";
import { createJwt, verifyToken } from "./middleware/jwtAction";

const app = express();
// config viewEngine
configViewEngine(app);

//-------------------------------------------------------------------------------------
// config body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//-------------------------------------------------------------------------------------
//test connection sequelize
// connection();

// test token jwt
createJwt();
let decodedData = verifyToken(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGllbiIsImFkZHJlc3MiOiJIQ00iLCJpYXQiOjE3MDQ3OTQ5MTR9.idoopU5PH-z1nmyTaruzOEwU0olDqZoUVN91dCPwcV8"
);
console.log(decodedData);
//-------------------------------------------------------------------------------------
// share localHost BE & FE
configCORS(app);

//-------------------------------------------------------------------------------------
// init web router
initWebRoutes(app);

//-------------------------------------------------------------------------------------
initApiRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`>>> jwt backend is running on the port ${PORT}`);
});
