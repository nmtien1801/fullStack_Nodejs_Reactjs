import db from "../models/index";
import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import { Op } from "sequelize";
// SEARCH: sequelize

const checkEmailExists = async (userEmail) => {
  let user = await db.User.findOne({
    where: { email: userEmail },
  });
  if (user) {
    return true;
  }
  return false;
};

const checkPhoneExists = async (userPhone) => {
  let phone = await db.User.findOne({
    where: { phone: userPhone },
  });
  if (phone) {
    return true;
  }
  return false;
};

// hash password
const salt = bcrypt.genSaltSync(10);
const hashPassWord = (userPassWord) => {
  return bcrypt.hashSync(userPassWord, salt);
};

const registerNewUser = async (rawUserData) => {
  try {
    // check email | phone are exists
    let isEmailExists = await checkEmailExists(rawUserData.email);
    if (isEmailExists === true) {
      return {
        EM: "the email is already exists",
        EC: 1,
        DT: "email",
      };
    }
    let isPhoneExists = await checkPhoneExists(rawUserData.phone);
    if (isPhoneExists === true) {
      return {
        EM: "the phone is already exists",
        EC: 1,
      };
    }
    // hash user password
    let CheckHashPass = hashPassWord(rawUserData.password);
    //create new user
    await db.User.create({
      email: rawUserData.email,
      phone: rawUserData.phone,
      userName: rawUserData.userName,
      passWord: CheckHashPass,
    });
    // không bị lỗi
    return {
      EM: "A user is create successfully",
      EC: 0,
    };
  } catch (error) {
    console.log("check Err create new user Register: ", error);
    return {
      EM: "something wrong in service ...",
      EC: -2,
    };
  }
};

const checkPassword = (userPassWord, hashPassWord) => {
  return bcrypt.compareSync(userPassWord, hashPassWord); // true or false
};

const handleUserLogin = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });
    if (user) {
      console.log(">>>>>find email or phone");
      let isCorrectPassword = checkPassword(rawData.password, user.passWord);
      // không bị lỗi
      if (isCorrectPassword === true) {
        return {
          EM: "ok!",
          EC: 0,
          DT: "",
        };
      }
    }
    console.log(">>>>>not find email | phone | password");
    return {
      EM: "your email | phone or password is incorrect",
      EC: 1,
      DT: "",
    };
  } catch (error) {
    console.log(">>>>check Err Login user: ", error);
    return {
      EM: "something wrong in service ...",
      EC: -2,
      DT: "",
    };
  }
};
module.exports = {
  registerNewUser,
  handleUserLogin,
  hashPassWord,
  checkEmailExists,
  checkPhoneExists
};
