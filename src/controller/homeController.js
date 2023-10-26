import userService from "../service/userService";

const handleHome = (req, res) => {
  //   return res.send("hello home");
  return res.render("home.ejs");
};

const handleUser = (req, res) => {
  let email = req.body.email;
  let passWord = req.body.passWord;
  let userName = req.body.userName;
  userService.createNewUser(email, passWord, userName);
  return res.render("user.ejs");
};
module.exports = {
  handleHome,
  handleUser,
};
