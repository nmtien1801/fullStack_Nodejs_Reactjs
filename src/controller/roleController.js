import userApiService from "../service/userApiService";
import roleApiService from "../service/roleApiService";

const read = async (req, res) => {
  try {
    // if (req.query.page && req.query.limit) {
    //   let page = req.query.page;
    //   let limit = req.query.limit;
    //   console.log(">>>>check params: ", "page = ", page, "limit = ", limit);
    //   let data = await userApiService.getUserWithPagination(+page, +limit);
    //   return res.status(200).json({
    //     EM: data.EM,
    //     EC: data.EC,
    //     DT: data.DT, // data
    //   });
    // } else {
    //   let data = await userApiService.getAllUser();
    //   return res.status(200).json({
    //     EM: data.EM,
    //     EC: data.EC,
    //     DT: data.DT, // data
    //   });
    // }
    let data = await roleApiService.getAllRoles();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT, // data
    });
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
    let data = await roleApiService.createNewRoles(req.body);
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
    let data = await roleApiService.deleteRole(req.body.id);
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

module.exports = {
  read,
  create,
  update,
  remove,
};
