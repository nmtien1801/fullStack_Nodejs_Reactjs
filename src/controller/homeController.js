import userService from "../service/userService";

const handleHome = (req, res) => {
  return res.send("hello home");
};

const handleUser = async (req, res) => {
  //   return res.send("hello home");
  let userList = await userService.getUserList();
  return res.render("home.ejs", { userList });
};

const handleUserCreate = (req, res) => {
  let email = req.body.email;
  let passWord = req.body.passWord;
  let userName = req.body.userName;
  userService.createNewUser(email, passWord, userName);

  return res.redirect("/");
};

const handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.redirect("/");
};
const getUpdateUserPage = async (req, res) => {
  let id = req.params.id;
  let user = await userService.getUserById(id);
  let userData = {};
  // dùng sequelize thì getById mặc định trả về 1 ptu chứ kh còn là mảng
  userData = user;

  // if (user && user.length > 0) {
  //   userData = user[0];
  // }
  return res.render("update.ejs", { userData });
};
const handleUpdateUser = async (req, res) => {
  let email = req.body.email;
  let userName = req.body.userName;
  let id = req.body.id;
  await userService.UpdateUser(email, userName, id);
  return res.redirect("/");
};
module.exports = {
  handleHome,
  handleUser,
  handleUserCreate,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
};
