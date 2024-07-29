import e from "express";
import db from "../models/index";
require("dotenv").config(); // dùng env
import _, { add, at } from "lodash";
import { where } from "sequelize/dist/index.js";
import { raw } from "body-parser";

const createClinic = async (data) => {
  try {
    if (
      !data.name ||
      !data.imageBase64 ||
      !data.descriptionHTML ||
      !data.descriptionMarkdown
    ) {
      return {
        EM: "missing fields",
        EC: 1,
        DT: [],
      };
    } else {
      await db.Clinics.create({
        name: data.name,
        address: data.address,
        image: data.imageBase64,
        descriptionHTML: data.descriptionHTML,
        descriptionMarkdown: data.descriptionMarkdown,
      });
    }
    return {
      EM: "create the clinic success", //error message
      EC: 0, //error code
      DT: [], // data
    };
  } catch (error) {
    console.log(">>>check err createClinic: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

const getAllClinic = async () => {
  try {
    let data = await db.Clinics.findAll();

    // ảnh
    // chuyển trực tiếp bên BE
    if (data && data.length > 0) {
      data.map((item) => {
        if (item.image) {
          item.image = Buffer.from(item.image, "base64").toString("binary"); // chuyển từ base64 sang Blob
        }
      });
    }

    if (!data) data = {}; // ép cứng điều kiện luôn có data để đỡ check đk bên FE
    return {
      EM: "get clinic success", //error message
      EC: 0, //error code
      DT: data, // data
    };
  } catch (error) {
    console.log(">>>check err getAllClinic: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

// tìm 2 bảng doctor_info và specialties
const getDetailClinicById = async (inputID) => {
  try {
    if (!inputID) {
      return {
        EM: "missing fields",
        EC: 1,
        DT: [],
      };
    } else {
      let data = await db.Clinics.findOne({
        where: {
          id: inputID,
        },
        attributes: [
          "descriptionHTML",
          "descriptionMarkdown",
          "name",
          "address",
        ],
        raw: true,
      });

      if (data) {
        let doctorClinic = [];
        doctorClinic = await db.Doctor_Info.findAll({
          where: {
            clinicID: inputID,
          },
          attributes: ["doctorID", "provinceID"],
          raw: true,
        });
        data.doctorClinic = doctorClinic;
      } else data = {};
      return {
        EM: "get getDetailClinicById success", //error message
        EC: 0, //error code
        DT: data, // data
      };
    }
  } catch (error) {
    console.log(">>>check err getDetailClinicById: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

module.exports = {
  createClinic,
  getAllClinic,
  getDetailClinicById,
};
