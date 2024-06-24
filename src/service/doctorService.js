import { at } from "lodash";
import db from "../models/index";
import { where } from "sequelize/dist/index.js";
import { raw } from "body-parser";

const getTopDoctorHome = async (limit) => {
  try {
    let data = await db.User.findAll({
      limit: limit,
      where: { roleId: "R2" }, // chỉ lấy bác sĩ (roleId = R2)
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password", "image"], // không lấy trường password
      },
      include: [
        {
          model: db.AllCode,
          as: "positionData",
          attributes: ["valueEn", "valueVi"],
        },
        {
          model: db.AllCode,
          as: "genderData",
          attributes: ["valueEn", "valueVi"],
        },
      ],
      raw: true,
      nest: true,
    });
    return {
      EM: "get data group success", //error message
      EC: 0, //error code
      DT: data, // data
    };
  } catch (error) {
    console.log(">>>check err doctorHome: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

module.exports = {
  getTopDoctorHome,
};
