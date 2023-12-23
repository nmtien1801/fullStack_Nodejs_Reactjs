import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
require("dotenv").config();
import connection from "./config/connectDB";

const app = express();
// config viewEngine
configViewEngine(app);

// config body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//test connection sequelize
// connection();

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);
  // Request methods bạn muốn cho phép
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request tiêu đề bạn muốn cho phép
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Đặt thành true nếu bạn cần trang web đưa cookie vào các requests được gửi
  // tới API (ví dụ: trong trường hợp bạn sử dụng phiên)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Chuyển sang lớp middleware tiếp theo
  next();
});

// init web router
initWebRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`>>> jwt backend is running on the port ${PORT}`);
});
