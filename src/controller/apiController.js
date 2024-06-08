import loginRegisterService from "../service/loginRegisterService";
import { verifyToken } from "../middleware/jwtAction";

const testApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test api",
  });
};

const handleRegister = async (req, res) => {
  try {
    //req.body : email, phone, userName, password
    if (!req.body.email || !req.body.phone || !req.body.password) {
      res.status(200).json({
        EM: "Missing require parameters", //error message
        EC: 1, //error code
        DT: "", // data
      });
    }
    if (req.body.password && req.body.password.length < 4) {
      res.status(200).json({
        EM: "your password must more than 3 letters", //error message
        EC: 1, //error code
        DT: "", // data
      });
    }

    // service: create user
    let data = await loginRegisterService.registerNewUser(req.body);

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT, // data
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from sever", //error message
      EC: -1, //error code
      DT: "", // data
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    let data = await loginRegisterService.handleUserLogin(req.body);
    // set cookie chứa refreshToken -> còn access_token lưu trong localStorage(FE)
    if (data && data.DT.access_token) {
      res.cookie("jwt", data.DT.access_token, {
        httpOnly: true,
        // secure: true,
        maxAge: 60 * 60 * 1000,
        sameSite: "strict", // ngăn chặn(CSOS) request từ các trang web khác
      });
    }

    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("check control login", req.body);
    return res.status(500).json({
      EM: "error from sever", //error message
      EC: 2, //error code
      DT: "", // data
    });
  }
};

const handleLogout = async (req, res) => {
  try {
    // search: express delete cookie
    res.clearCookie("jwt");
    return res.status(200).json({
      EM: "clear cookies - logout",
      EC: 0,
      DT: "",
    });
  } catch (error) {
    console.log("check control login", req.body);
    return res.status(500).json({
      EM: "error from sever", //error message
      EC: 2, //error code
      DT: "", // data
    });
  }
};

const getRefreshToken = (req) => {
  let cookies = req.cookies;
  if (cookies && cookies.refreshToken) {
    return cookies.refreshToken;
  } else {
    return res.status(401).json({
      EM: "you are not authenticated", //error message
      EC: 2, //error code
      DT: "", // data
    });
    verifyToken(cookies.refreshToken);
  }
};

module.exports = {
  testApi,
  handleRegister,
  handleLogin,
  handleLogout,
};
