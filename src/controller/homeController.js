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
  userService.createNewUser(req.body);
  return res.redirect("/");
};

const handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.redirect("/");
};
const getUpdateUserPage = async (req, res) => {
  let id = req.params.id;
  if (id) {
    let user = await userService.getUserById(id);
    let userData = {};
    // dùng sequelize thì getById mặc định trả về 1 ptu chứ kh còn là mảng - truyền mảng mới lặp đc
    userData = user;

    // if (user && user.length > 0) {
    //   userData = user[0];
    // }
    return res.render("update.ejs", { userData });
  } else {
    return res.send("user not found");
  }
};
const handleUpdateUser = async (req, res) => {
  await userService.UpdateUser(req.body);
  return res.redirect("/user");
};
module.exports = {
  handleHome,
  handleUser,
  handleUserCreate,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
};
