import jwt from "jsonwebtoken";

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

const nonSecurePaths = ["", "/register", "/login"]; // kh check middleware url (1)

// middleware jwt check user đã đăng nhập chưa
const checkUserJwt = (req, res, next) => {
  if (nonSecurePaths.includes(req.path)) return next(); // kh check middleware url (2)
  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    let token = cookies.jwt;
    let decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded; // gán thêm .user(data cookie) vào req BE nhận từ FE
      req.token = token; // gán thêm .token(data cookie) vào req BE nhận từ FE
      next();
    } else {
      return res.status(401).json({
        EC: -1,
        DT: "",
        EM: "Not authenticated the user",
      });
    }
    console.log(">>> my cookies: ", cookies.jwt);
  } else {
    return res.status(401).json({
      EC: -1,
      DT: "",
      EM: "Not authenticated the user",
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
    let canAccess = roles.some((item) => item.url === currentUrl); // vòng lặp some từng phần tử ss token vs path(router)
    if (canAccess) {
      next();
    } else {
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

module.exports = {
  createJwt,
  verifyToken,
  checkUserJwt,
  checkUserPermission,
};
