import userApiService from "../service/userApiService";

const read = async (req, res) => {
  try {
    let data = await userApiService.getAllUser();
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

const create = async (req, res) => {
  try {
    let data = await userApiService.getAllUser();
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
const update = async (req, res) => {
  try {
    let data = await userApiService.getAllUser();
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
const remove = async (req, res) => {
  try {
    let data = await userApiService.getAllUser();
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

module.exports = {
  read,
  create,
  update,
  remove,
};
