import { where } from "sequelize/lib/sequelize";
import db from "../models/index";
import {
  hashPassWord,
  checkEmailExists,
  checkPhoneExists,
} from "./loginRegisterService";
const getAllUser = async () => {
  // return new Promise(async (resolve, reject) => {
  //   try {
  //     let user = "";
  //     if (userId === "ALL") {
  //       user = await db.User.findAll({
  //         attributes: ["id", "userName", "email", "phone", "sex"], // chỉ lấy cái muốn xem
  //             raw: true, // trả về 1 obj
  //             include: { model: db.Group, attributes: ["id", "name", "description"] }, // hiện bảng join
  //             nest: true, // đưa bảng join vào obj
  //       });
  //     }
  //     if (user && userId !== "ALL") {
  //       user = await db.User.findOne({
  //         where: { id: userId },
  //       });
  //     }
  //     resolve(user);
  //   } catch (error) {
  //     reject(error);
  //   }
  // });

  try {
    let users = await db.User.findAll({
      attributes: ["id", "userName", "email", "phone", "sex"], // chỉ lấy cái muốn xem
      raw: true, // trả về 1 obj
      include: { model: db.Group, attributes: ["id", "name", "description"] }, // hiện bảng join
      nest: true, // đưa bảng join vào obj
    });
    if (users) {
      return {
        EM: "get data user success", //error message
        EC: 0, //error code
        DT: users, // data
      };
    } else {
      return {
        EM: "get data user success", //error message
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
      attributes: ["id", "userName", "email", "phone", "sex", "address"], // chỉ lấy cái muốn xem
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
    console.log(">>>>check data: ", data);
    await db.User.create({
      ...data,
      positionID: data.position,
      roleID: data.role,
      image: data.avatar,
      passWord: CheckHashPass,
    });

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

const updateUser = async (data) => {
  try {
    if (!data.groupID) {
      return {
        EM: "error groupID emty", //error message
        EC: 1, //error code
        DT: "group", // data
      };
    }
    let user = await db.User.findOne({
      where: { id: data.id },
    });
    if (user) {
      console.log(">>>>check user: ", user);
      await user.update({
        userName: data.userName,
        address: data.address,
        sex: data.sex,
        groupID: data.groupID,
      });
      return {
        EM: "update user success", //error message
        EC: 0, //error code
        DT: [], // data
      };
    } else {
      return {
        EM: "user not found", //error message
        EC: 1, //error code
        DT: [], // data
      };
    }
  } catch (error) {
    console.log(">>>>check err update: ", error);
    return {
      EM: "some thing wrongs with service",
      EC: 2,
      DT: [],
    };
  }
};

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

// import data ytb sern 52: https://docs.google.com/spreadsheets/d/175ts9y-bJGAwEUtVEFojJQ4nFCH_lIU0poA0wVjM_lk/edit?gid=466017350#gid=466017350
const getAllCodeService = async (typeInput) => {
  try {
    // service lấy data từ db: tìm trong model

    if (!typeInput) {
      return {
        EM: "error typeInput emty", //error message
        EC: 1, //error code
        DT: [], // data
      };
    } else {
      let data = await db.AllCodes.findAll({
        where: { type: typeInput },
      });
      return {
        EM: "get data success", //error message
        EC: 0, //error code
        DT: data, // data
      };
    }
  } catch (error) {
    // err: Table 'jwt.allcode' doesn't exist -> sửa tên model cho giống migration
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
  getAllCodeService,
};
