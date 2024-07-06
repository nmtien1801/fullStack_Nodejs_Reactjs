import { at } from "lodash";
import db from "../models/index";
import { where } from "sequelize/dist/index.js";
import { raw } from "body-parser";

const getTopDoctorHome = async (limit) => {
  try {
    let data = await db.User.findAll({
      limit: limit,
      where: { roleID: "R2" }, // chỉ lấy bác sĩ (roleId = R2)
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password"], // không lấy trường password
      },
      include: [
        {
          model: db.AllCodes,
          as: "positionData",
          attributes: ["valueEn", "valueVi"],
        },
        {
          model: db.AllCodes,
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

const getAllDoctors = async () => {
  try {
    let data = await db.User.findAll({
      where: { roleID: "R2" }, // chỉ lấy bác sĩ (roleId = R2)
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["password", "image"], // không lấy trường password
      },
    });
    return {
      EM: "get all doctor success", //error message
      EC: 0, //error code
      DT: data, // data
    };
  } catch (error) {
    console.log(">>>check err getAllDoctors: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

const saveDetailInfoDoctor = async (dataInput) => {
  try {
    if (dataInput.id || dataInput.contentHTML || dataInput.contentMarkdown) {
      let data = await db.Markdown.create({
        ...dataInput,
        doctorID: dataInput.doctorID,
      });
      return {
        EM: "create doctor success", //error message
        EC: 0, //error code
        DT: [], // data
      };
    } else {
      return {
        EM: "create doctor miss", //error message
        EC: 1, //error code
        DT: [], // data
      };
    }
  } catch (error) {
    console.log(">>>check err saveDetailInfoDoctor: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

const getDetailDoctorById = async (id) => {
  try {
    if (!id) {
      return {
        EM: "id is required", //error message
        EC: 1, //error code
        DT: [], // data
      };
    } else {
      let data = await db.User.findOne({
        where: { id: id },
        attributes: {
          exclude: ["password"], // không lấy trường password
        },
        include: [
          {
            model: db.Markdown,
            attributes: ["contentHTML", "contentMarkdown", "description"],
          },
          {
            model: db.AllCodes,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        // raw: true, // trả về 1 obj - không dùng vì không muốn lấy markdown khi find không có
        nest: true, // đưa bảng join vào obj
      });
      // ảnh
      // chuyển trực tiếp bên BE
      if (data && data.image) {
        data.image = Buffer.from(data.image, "base64").toString("binary"); // chuyển từ base64 sang Blob
      }
      if (!data) data = {}; // ép cứng điều kiện luôn có data để đỡ check đk bên FE
      return {
        EM: "get data doctor success", //error message
        EC: 0, //error code
        DT: data, // data
      };
    }
  } catch (error) {
    console.log(">>>check err getDetailDoctorById: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  saveDetailInfoDoctor,
  getDetailDoctorById,
};
