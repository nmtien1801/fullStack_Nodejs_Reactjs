import db from "../models/index";

const getAllUser = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "userName", "email", "phone", "sex"], // chỉ lấy cái muốn xem
      raw: true, // trả về 1 obj
      include: { model: db.Group, attributes: ["id", "name", "description"] }, // hiện bảng join
      nest: true, // đưa bảng join vào obj
    });
    if (users) {
      return {
        EM: "get data success", //error message
        EC: 0, //error code
        DT: users, // data
      };
    } else {
      return {
        EM: "get data success", //error message
        EC: 0, //error code
        DT: [], // data
      };
    }
  } catch (error) {
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

const createNewUser = () => {};

const updateUser = () => {};

const deleteUser = () => {};
module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
};
