import userApiService from "../service/userApiService";

const read = async (req, res) => {
  try {
    console.log(">>>>check cookie(BE) from FE -> BE: ", req.cookies);
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;

      console.log(">>>>check params: ", "page = ", page, "limit = ", limit);
      let data = await userApiService.getUserWithPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT, // data
      });
    } else {
      let data = await userApiService.getAllUser();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT, // data
      });
    }
  } catch (error) {
    console.log(">>>check err: ", error);
    return res.status(500).json({
      EM: "error from sever", //error message
      EC: 2, //error code
      DT: "", // data
    });
  }
};

const create = async (req, res) => {
  try {
    //validate(chua lam)
    let data = await userApiService.createNewUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT, // data
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from sever", //error message
      EC: 2, //error code
      DT: "", // data
    });
  }
};
const update = async (req, res) => {
  try {
    // valid chưa làm
    let data = await userApiService.updateUser(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT, // data
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from sever", //error message
      EC: 2, //error code
      DT: "", // data
    });
  }
};
const remove = async (req, res) => {
  try {
    let data = await userApiService.deleteUser(req.body.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT, // data
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from sever", //error message
      EC: 2, //error code
      DT: "", // data
    });
  }
};

const getUserAccount = async (req, res) => {
  try {
    return res.status(200).json({
      EM: "ok fetch context",
      EC: 0,
      DT: {
        access_token: req.token,
        groupWithRole: req.user.groupWithRole,
        email: req.user.email,
        userName: req.user.userName,
      },
    });
  } catch (error) {
    return res.status(500).json({
      EM: "error from sever", //error message
      EC: 2, //error code
      DT: "", // data
    });
  }
};
module.exports = {
  read,
  create,
  update,
  remove,
  getUserAccount,
};
