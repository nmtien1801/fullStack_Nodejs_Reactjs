const handleHome = (req, res) => {
  //   return res.send("hello home");
  return res.render("home.ejs");
};

const handleUser = (req, res) => {
  return res.render("user.ejs");
};
module.exports = {
  handleHome,
  handleUser,
};
