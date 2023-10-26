import mysql from "mysql2";
import bcrypt from "bcryptjs";

// ---------connect to mysql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});
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

module.exports = {
  createNewUser,
};
