import userService from "../service/userService";

const handleHome = async (req, res) => {
  //   return res.send("hello home");
  let userList = await userService.getUserList();
  return res.render("home.ejs", { userList });
};

const handleUser = (req, res) => {
  let email = req.body.email;
  let passWord = req.body.passWord;
  let userName = req.body.userName;
  userService.createNewUser(email, passWord, userName);

  return res.redirect("/");
};
module.exports = {
  handleHome,
  handleUser,
};
