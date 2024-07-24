import e from "express";
import db from "../models/index";
require("dotenv").config(); // dùng env
import _, { at } from "lodash";

const createSpecialty = async (data) => {
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
      await db.Specialties.create({
        name: data.name,
        image: data.imageBase64,
        descriptionHTML: data.descriptionHTML,
        descriptionMarkdown: data.descriptionMarkdown,
      });
    }
    return {
      EM: "create the specialty success", //error message
      EC: 0, //error code
      DT: [], // data
    };
  } catch (error) {
    console.log(">>>check err createSpecialty: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

const getAllSpecialty = async () => {
  try {
    let data = await db.Specialties.findAll();

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
      EM: "get specialty success", //error message
      EC: 0, //error code
      DT: data, // data
    };
  } catch (error) {
    console.log(">>>check err getAllSpecialty: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

module.exports = {
  createSpecialty,
  getAllSpecialty,
};
