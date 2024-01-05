import db from "../models/index";
import {
  hashPassWord,
  checkEmailExists,
  checkPhoneExists,
} from "./loginRegisterService";
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

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    let { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "userName", "email", "phone", "sex"], // chỉ lấy cái muốn xem
      raw: true, // trả về 1 obj
      include: { model: db.Group, attributes: ["id", "name", "description"] }, // hiện bảng join
      nest: true, // đưa bảng join vào obj
      order: [["id", "ASC"]],
    });
    let totalPage = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPage: totalPage,
      users: rows,
    };
    return {
      EM: "fetch data success", //error message
      EC: 0, //error code
      DT: data, // data
    };
  } catch (error) {
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

const createNewUser = async (data) => {
  try {
    //check email, phone
    let isEmailExists = await checkEmailExists(data.email);
    if (isEmailExists === true) {
      return {
        EM: "the email is already exists",
        EC: 1,
        DT: "email", // bôi đỏ lại input bị sai
      };
    }
    let isPhoneExists = await checkPhoneExists(data.phone);
    if (isPhoneExists === true) {
      return {
        EM: "the phone is already exists",
        EC: 1,
        DT: "phone",
      };
    }
    // hash user password
    let CheckHashPass = hashPassWord(data.password);
    // create new user from modalUser
    await db.User.create({ ...data, passWord: CheckHashPass });
    return {
      EM: "create user success", //error message
      EC: 0, //error code
      DT: [], // data
    };
  } catch (error) {
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

const updateUser = () => {};

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });
    if (user) {
      await user.destroy();
      return {
        EM: "delete user success",
        EC: 0,
        DT: [], // data
      };
    } else {
      return {
        EM: "user not exists",
        EC: 1,
        DT: [], // data
      };
    }
  } catch (error) {
    console.log(">>>>check err: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
