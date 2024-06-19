import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import bluebird, { reject, resolve } from "bluebird";
import db from "../models/index";
// ---------connect to mysql
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "jwt",
// });
// -----------hash passWord
const salt = bcrypt.genSaltSync(10);

const hashPassWord = (userPassWord) => {
  return bcrypt.hashSync(userPassWord, salt);
};

const createNewUser = async (data) => {
  let CheckHashPass = hashPassWord(data.passWord);
  try {
    // db. - tên table - create not save(update)
    await db.User.create({
      userName: data.userName,
      email: data.email,
      passWord: CheckHashPass,
      address: data.address,
      phone: data.phone,
      sex: data.gender,
      groupID: data.groupRole,
    });
  } catch (error) {
    console.log(">>> check err: ", error);
  }
};

const getUserList = async () => {
  let newUser = await db.User.findOne({
    where: { id: 1 },
    attributes: ["id", "userName", "email"], // chỉ lấy cái muốn xem
    raw: true, // trả về 1 obj
    include: { model: db.Group, attributes: ["id", "name", "description"] }, // hiện bảng join
    nest: true, // đưa bảng join vào obj
  });

  let roles = await db.Role.findAll({
    raw: true, // trả về 1 obj
    include: { model: db.Group, where: { id: 1 } }, // hiện bảng join
    nest: true, // đưa bảng join vào obj
  });

  //    select data from db to sequelize
  return new Promise(async (resolve, reject) => {
    try {
      let users = [];
      users = await db.User.findAll({ raw: true });
      resolve(users);
    } catch (error) {
      console.log(">>> check err getUserList: ", error);
      reject(error);
    }
  });
};

const deleteUser = async (userId) => {
  await User.destroy({
    where: {
      id: userId,
    },
  });
};
const getUserById = async (id) => {
  // user đang ở kiểu obj của sequelize
  let user = {};
  user = await db.User.findOne({
    where: {
      id: id,
    },
    // raw: true, // thay vì user.get({plain: true})
  });
  //  chuyển thành obj của javascrip (kh dùng raw vì sẽ kh dùng đc các methot của sequelize)
  return user.get({ plain: true });
};

const UpdateUser = async (user) => {
  await db.User.update(
    { email: user.email, userName: user.userName, address: user.address },
    {
      where: {
        id: user.id,
      },
    }
  );
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  UpdateUser,
};
