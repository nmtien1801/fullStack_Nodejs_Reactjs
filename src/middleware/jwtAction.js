import jwt from "jsonwebtoken";

const createJwt = (payload) => {
  //   let token = jwt.sign({ name: "Tien", address: "HCM" }, process.env.JWT_SECRET);
  let key = process.env.JWT_SECRET;
  let token = null;

  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log(">>>>>check err token: ", error);
  }
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;
  try {
    let decoded = jwt.verify(token, "k");
    data = decoded;
  } catch (error) {
    console.log(">>>check err verify token: ", error);
  }
  return data;
};

module.exports = {
  createJwt,
  verifyToken,
};
