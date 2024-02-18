import db from "../models/index";

const getGroup = async () => {
  try {
    let data = await db.Group.findAll({
      order: [["name", "ASC"]],
    });
    return {
      EM: "get data group success", //error message
      EC: 0, //error code
      DT: data, // data
    };
  } catch (error) {
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

module.exports = {
  getGroup,
};
