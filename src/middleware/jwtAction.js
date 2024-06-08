import jwt from "jsonwebtoken";
require("dotenv").config();

const createJwt = (payload) => {
  //   let token = jwt.sign({ name: "Tien", address: "HCM" }, process.env.JWT_SECRET);
  let key = process.env.JWT_SECRET;
  let token = null;

  try {
    token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN }); // fix lỗi thời gian lưu token # cookies
  } catch (error) {
    console.log(">>>>>check err token: ", error);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let decoded = null;
  try {
    decoded = jwt.verify(token, key);
  } catch (error) {
    console.log(">>>check err verify token: ", error);
  }
  return decoded;
};

const nonSecurePaths = ["/logout", "/register", "/login"]; // kh check middleware url (1)

// token từ BE sẽ lưu vào header bên FE
const extractToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

// middleware jwt check user đã đăng nhập chưa
const checkUserJwt = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next(); // kh check middleware url (2)
  let cookies = req.cookies;
  let tokenFromHeader = extractToken(req);

  if ((cookies && cookies.jwt) || tokenFromHeader) {
    // bug vừa vào đã check quyền xác thực khi chưa login của Context
    let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded; // gán thêm .user(data cookie) vào req BE nhận từ FE
      req.token = token; // gán thêm .token(data cookie) vào req BE nhận từ FE
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated the user(token jwt)",
      });
    }
    // console.log(">>> my cookies 401: ", cookies.jwt);
  }
  // ngược lại khi không có cookies or header thì trả ra lỗi không xác thực
  else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated the user(jwt | JWT)",
    });
  }
};

//middleware check user có quyền không(lấy role -> ss URL)
const checkUserPermission = (req, res, next) => {
  if (nonSecurePaths.includes(req.path) || req.path === "/account")
    return next(); // kh check middleware url (2)
  if (req.user) {
    let email = req.user.email; // (chắc chắn hơn)-> dùng query xuống db để xem quyền -> ss roles lấy từ token
    let roles = req.user.groupWithRole.Roles;
    let currentUrl = req.path;
    if (!roles && roles.length === 0) {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: `you don't permission to access this resource`,
      });
    }
    // vòng lặp some từng phần tử ss token vs path(router)
    // bug role/:id từ req là động -> thêm include  /:id
    let canAccess = roles.some(
      (item) => item.url === currentUrl || currentUrl.includes(item.url)
    );
    if (canAccess) {
      next();
    } else {
      console.log(">>>>check canAccess: ", canAccess);
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: `you don't permission to access this resource`,
      });
    }
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated the user",
    });
  }
};

// tạo mới khi token hết hạn
const refreshToken = (payload) => {
  let key = process.env.JWT_REFRESH_TOKEN;
  let token = null;
  try {
    token = jwt.sign(payload, key, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_TOKEN,
    }); // fix lỗi thời gian lưu token # cookies
  } catch (error) {
    console.log(">>>>>check err token: ", error);
  }
  return token;
};

module.exports = {
  createJwt,
  verifyToken,
  checkUserJwt,
  checkUserPermission,
  refreshToken,
};
