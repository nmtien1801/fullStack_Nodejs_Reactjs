require("dotenv").config();

const configCORS = (app) => {
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
};

export default configCORS;
