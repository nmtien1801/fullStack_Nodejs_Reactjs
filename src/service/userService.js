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

const createNewUser = (email, passWord, userName) => {
  let CheckHashPass = hashPassWord(passWord);
  connection.query(
    `insert into users(email,passWord,userName) values(?,?,?)`,
    [email, CheckHashPass, userName],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
      console.log(results);
    }
  );
};

const getUserList = async () => {
  let users = [];
  // connection.query(`select * from users`, function (err, results, fields) {
  //   if (err) {
  //     console.log(err);
  //     return users;
  //   }
  //   users = results;
  //   return users;
  // });

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
