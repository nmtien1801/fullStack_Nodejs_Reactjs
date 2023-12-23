import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import bluebird from "bluebird";
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

const createNewUser = async (email, passWord, userName) => {
  let CheckHashPass = hashPassWord(passWord);
  try {
    // db. - tên table - create not save(update)
    await db.User.create({
      userName: userName,
      email: email,
      passWord: CheckHashPass,
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

  console.log("test user new : ", newUser);
  console.log("test role new : ", roles);

  //    select data from db to sequelize
  let users = [];
  users = await db.User.findAll();
  return users;
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
  });
  //  chuyển thành obj của javascrip (kh dùng raw vì sẽ kh dùng đc các methot của sequelize)
  return user.get({ plain: true });
};

const UpdateUser = async (email, userName, id) => {
  await db.User.update(
    { email: email, userName: userName },
    {
      where: {
        id: id,
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
