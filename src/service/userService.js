import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import bluebird from "bluebird";
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
  // ---------connect to mysql
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  // query database
  const [rows, fields] = await connection.execute(
    "insert into users(email,passWord,userName) values(?,?,?)",
    [email, CheckHashPass, userName]
  );
};

const getUserList = async () => {
  // ---------connect to mysql
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  // query database
  const [rows, fields] = await connection.execute("select * from users");
  return rows;
};

module.exports = {
  createNewUser,
  getUserList,
};
