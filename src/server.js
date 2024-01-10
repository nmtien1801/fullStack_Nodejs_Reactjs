import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCORS from "./config/cors";
import bodyParser from "body-parser";
require("dotenv").config();
import connection from "./config/connectDB";

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

//-------------------------------------------------------------------------------------
// share localHost BE & FE
configCORS(app);

// app.use((req, res, next) => {
//   // đây là midleware(chạy từ trên xuống và xoay hoài nếu không có next)
//   // nếu đúng authenticate thì trang web hiện (bởi next)
//   console.log(">>>>check new request"),
//     console.log("host: ", req.hostname),
//     console.log("path: ", req.path),
//     console.log("method: ", req.method);
//   next();
// });

//-------------------------------------------------------------------------------------
// init web router
initWebRoutes(app);

//-------------------------------------------------------------------------------------
initApiRoutes(app);

// đây là midleware(chạy từ trên xuống và xoay hoài nếu không có next)
// nếu đúng authenticate thì trang web hiện (bởi next) thường đặt ở giữa
// Cannot get/(link...) -> 404 not found
app.use((req, res) => {
  return res.send("404 not found");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`>>> jwt backend is running on the port ${PORT}`);
});
