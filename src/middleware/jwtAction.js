import jwt from "jsonwebtoken";

const createJwt = () => {
  //   let token = jwt.sign({ name: "Tien", address: "HCM" }, process.env.JWT_SECRET);
  let payload = { name: "Tien", address: "HCM" };
  let key = process.env.JWT_SECRET;
  let token = null;

  try {
    token = jwt.sign(payload, key);
    console.log(">>>>check token : ", token);
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
