import db from "../models/index";
import { where } from "sequelize/dist/index.js";
import { raw } from "body-parser";
require("dotenv").config(); // dùng env
import _, { find, includes } from "lodash";
import e from "express";
import { Find_ConvertDateToTimeStampSchedule } from "../config/find_ConvertDate";

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
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
    if (
      dataInput.id ||
      dataInput.contentHTML ||
      dataInput.contentMarkdown ||
      dataInput.action ||
      dataInput.selectedPrice ||
      dataInput.selectedPayment ||
      dataInput.selectedProvince ||
      dataInput.nameClinic ||
      dataInput.addressClinic ||
      dataInput.note ||
      dataInput.specialtyID ||
      dataInput.clinicID
    ) {
      // upsert to Markdown
      if (dataInput.action === "CREATE") {
        let data = await db.Markdown.create({
          ...dataInput,
          doctorID: dataInput.doctorID,
        });
      } else if (dataInput.action === "EDIT") {
        // update .save
        let dataUpdate = await db.Markdown.findOne({
          where: { doctorID: dataInput.doctorID },
          raw: false, // dùng .save phải có raw: false
        });

        if (dataUpdate) {
          dataUpdate.contentMarkdown = dataInput.contentMarkdown;
          dataUpdate.contentHTML = dataInput.contentHTML;
          dataUpdate.description = dataInput.description;
          await dataUpdate.save();
        }
      }

      // upsert to Doctor_info
      let doctorInfo = await db.Doctor_Info.findOne({
        where: { doctorID: dataInput.doctorID },
        raw: false, // dùng .save phải có raw: false
      });

      if (doctorInfo) {
        //update
        doctorInfo.doctorID = dataInput.doctorID;
        doctorInfo.priceID = dataInput.selectedPrice;
        doctorInfo.provinceID = dataInput.selectedProvince;
        doctorInfo.paymentID = dataInput.selectedPayment;
        doctorInfo.specialtyID = dataInput.specialtyID;
        doctorInfo.clinicID = dataInput.clinicID;
        await doctorInfo.save();
      } else {
        //create
        let data = await db.Doctor_Info.create({
          ...dataInput,
          doctorID: dataInput.doctorID,
          priceID: dataInput.selectedPrice,
          provinceID: dataInput.selectedProvince,
          paymentID: dataInput.selectedPayment,
          specialtyID: dataInput.specialtyID,
          clinicID: dataInput.clinic,
        });
      }
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
      // map 3 bảng user - markdown - doctor_info
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
            attributes: ["valueEn", "valueVi"], // chỉ lấy
          },
          {
            model: db.Doctor_Info,
            attributes: {
              exclude: ["id", "doctorID"], // không lấy
            },
            include: [
              {
                model: db.AllCodes,
                as: "priceTypeData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.AllCodes,
                as: "provinceTypeData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.AllCodes,
                as: "paymentTypeData",
                attributes: ["valueEn", "valueVi"],
              },
            ],
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

const bulkCreateSchedule = async (data) => {
  try {
    if (!data.arraySchedule || !data.doctorID || !data.date) {
      return {
        EM: "miss data arraySchedule", //error message
        EC: 1, //error code
        DT: [], // data
      };
    } else {
      let schedule = data.arraySchedule;
      if (schedule && schedule.length > 0) {
        schedule = schedule.map((item) => {
          item.maxNumber = MAX_NUMBER_SCHEDULE; // maxNumber bên DB -> tự thêm do FE kh truyền
          return item;
        });
      }
      // ==================================================================================
      // tạo nhiều bị trùng
      // tìm tất cả schedule của bác sĩ theo ngày
      // search: how to get difference between two arrays of objects javascript
      let exists = await db.Schedules.findAll({
        where: {
          doctorID: data.doctorID,
          date: data.date,
        },
        attributes: ["timeType", "date", "doctorID", "maxNumber"],
        raw: true,
      });

      let convertDateToTimeStamp = await Find_ConvertDateToTimeStampSchedule(
        exists
      );

      // lọc những cái đã có và chỉ thêm cái mới
      let toCreate = _.differenceWith(
        schedule,
        convertDateToTimeStamp,
        (a, b) => {
          return a.timeType === b.timeType && a.date === b.date;
        }
      );

      // =============================================================================================
      if (toCreate && toCreate.length > 0) {
        await db.Schedules.bulkCreate(toCreate);
      }

      return {
        EM: "create schedule doctor success", //error message
        EC: 0, //error code
        DT: [], // data
      };
    }
  } catch (error) {
    console.log(">>>check err bulkCreateSchedule: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

const getSchedulesByDate = async (doctorID, date) => {
  try {
    if (!doctorID || !date) {
      return {
        EM: "missing required parameters", //error message
        EC: 1, //error code
        DT: [], // data
      };
    } else {
      // ==================================================================================
      // tạo nhiều bị trùng
      // tìm tất cả schedule của bác sĩ theo ngày
      // ngày tháng năm dd/mm/yyyy (BE) -> 2133261 (FE)
      // search: how to get difference between two arrays of objects javascript
      let exists = await db.Schedules.findAll({
        where: {
          doctorID: doctorID,
          date: date, // 21563016
        },
        attributes: ["timeType", "date", "doctorID", "maxNumber"],
        include: [
          {
            model: db.AllCodes,
            as: "timeTypeData",
            attributes: ["valueEn", "valueVi"],
          },

          {
            model: db.User,
            as: "doctorData",
            attributes: ["userName"],
          },
        ],
        raw: true,
        nest: true, // đưa bảng join vào obj
      });

      let convertDateToTimeStamp = await Find_ConvertDateToTimeStampSchedule(
        exists
      );
      // console.log("convertDateToTimeStamp: ", convertDateToTimeStamp);
      if (convertDateToTimeStamp && convertDateToTimeStamp.length > 0) {
        return {
          EM: "get data doctor success", //error message
          EC: 0, //error code
          DT: convertDateToTimeStamp, // data
        };
      } else {
        return {
          EM: "get data doctor success but not data", //error message
          EC: 0, //error code
          DT: [], // data
        };
      }
    }
  } catch (error) {
    console.log(">>>check err getSchedulesByDate: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

const getExtraInfoDoctorById = async (doctorID) => {
  try {
    if (!doctorID) {
      return {
        EM: "missing required parameters", //error message
        EC: 1, //error code
        DT: [], // data
      };
    } else {
      // console.log("doctorID: ", doctorID);
      let data = await db.Doctor_Info.findOne({
        where: { doctorID: doctorID },
        attributes: {
          exclude: ["id", "doctorID"], // không lấy
        },
        include: [
          {
            model: db.AllCodes,
            as: "priceTypeData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.AllCodes,
            as: "provinceTypeData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.AllCodes,
            as: "paymentTypeData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: false, // dùng .save phải có raw: false
        nest: true, // đưa bảng join vào obj
      });

      if (!data) data = {};
      return {
        EM: "get data doctor success", //error message
        EC: 0, //error code
        DT: data, // data
      };
    }
  } catch (error) {
    console.log(">>>check err getExtraInfoDoctorById: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

const getProfileDoctorById = async (doctorID) => {
  try {
    if (!doctorID) {
      return {
        EM: "missing required parameters", //error message
        EC: 1, //error code
        DT: [], // data
      };
    } else {
      // console.log("doctorID: ", doctorID);
      let data = await db.User.findOne({
        where: { id: doctorID },
        attributes: {
          exclude: ["passWord"], // không lấy
        },
        include: [
          {
            model: db.Markdown,
            attributes: ["contentHTML", "contentMarkdown", "description"],
          },
          {
            model: db.AllCodes,
            as: "positionData",
            attributes: ["valueEn", "valueVi"], // chỉ lấy
          },
          {
            model: db.Doctor_Info,
            attributes: {
              exclude: ["id", "doctorID"], // không lấy
            },
            include: [
              {
                model: db.AllCodes,
                as: "priceTypeData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.AllCodes,
                as: "provinceTypeData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.AllCodes,
                as: "paymentTypeData",
                attributes: ["valueEn", "valueVi"],
              },
            ],
          },
        ],
        raw: false, // dùng .save phải có raw: false -> không dùng vì không muốn lấy markdown khi find không có
        nest: true, // đưa bảng join vào obj
      });

      // ảnh
      // chuyển trực tiếp bên BE
      if (data && data.image) {
        data.image = Buffer.from(data.image, "base64").toString("binary"); // chuyển từ base64 sang Blob
      }

      if (!data) data = {};
      return {
        EM: "get data doctor success", //error message
        EC: 0, //error code
        DT: data, // data
      };
    }
  } catch (error) {
    console.log(">>>check err getProfileDoctorById: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

const getListPatientForDoctor = async (doctorID, date) => {
  try {
    if (!doctorID || !date) {
      return {
        EM: "missing required parameters", //error message
        EC: 1, //error code
        DT: [], // data
      };
    } else {
      // console.log("doctorID: ", doctorID, "date: ", date);
      // ==================================================================================
      // tạo nhiều bị trùng
      // tìm tất cả schedule của bác sĩ theo ngày
      // search: how to get difference between two arrays of objects javascript
      let exists = await db.Booking.findAll({
        where: {
          statusId: "S2", // đây là trạng thái đã xác nhận khi patient click vào link email -> vì bác sĩ cần kiểm soát những client này
          doctorId: doctorID,
          date: date,
        },

        include: [
          {
            model: db.User,
            as: "patientData", // you must use the 'as'
            attributes: ["userName", "email", "sex", "address"],
            include: [
              {
                model: db.AllCodes,
                as: "genderData",
                attributes: ["valueEn", "valueVi"],
              },
            ],
          },
          {
            model: db.AllCodes,
            as: "timeTypeDataPatient",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true, // dùng .save phải có raw: false
        nest: true, // đưa bảng join vào obj
      });

      let convertDateToTimeStamp = await Find_ConvertDateToTimeStampSchedule(
        exists
      );

      if (convertDateToTimeStamp && convertDateToTimeStamp.length > 0) {
        return {
          EM: "get data getListPatientForDoctor success", //error message
          EC: 0, //error code
          DT: convertDateToTimeStamp, // data
        };
      } else {
        // if (!data) data = {};
        return {
          EM: "get data doctor success but not data", //error message
          EC: 0, //error code
          DT: [], // data
        };
      }
    }
  } catch (error) {
    console.log(">>>check err getListPatientForDoctor: ", error);
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
  bulkCreateSchedule,
  getSchedulesByDate,
  getExtraInfoDoctorById,
  getProfileDoctorById,
  getListPatientForDoctor,
};
