import db from "../models/index";
require("dotenv").config(); // dùng env
import _ from "lodash";

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
      EM: "create the appointment success", //error message
      EC: 1, //error code
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

module.exports = {
  createSpecialty,
};
