import loginRegisterService from "../service/loginRegisterService";

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
  console.log("check control register", req.body);
};

const handleLogin = async (req, res) => {
  try {
    let data = await loginRegisterService.handleUserLogin(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      ED: data.DT,
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from sever", //error message
      EC: 2, //error code
      DT: "", // data
    });
  }
  console.log("check control login", req.body);
};
module.exports = {
  testApi,
  handleRegister,
  handleLogin,
};
