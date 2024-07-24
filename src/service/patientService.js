import db from "../models/index";
require("dotenv").config(); // dùng env
import _ from "lodash";
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid"; // tạo token

// bug lỗi version npm: [nodemon] app crashed - waiting for file changes before starting...

const buildUrlEmail = (doctorID, token) => {
  let result = `${process.env.REACT_URL}/verify-booking?token=${token}&doctorID=${doctorID}`;
  return result;
};

const postBookAppointment = async (dataInput) => {
  try {
    if (
      dataInput.email &&
      dataInput.doctorID &&
      dataInput.date &&
      dataInput.timeType &&
      dataInput.fullName
    ) {
      // tạo token -> đổi trạng thái booking
      let token = uuidv4(); //  '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

      // gửi email khi tạo thành công patient
      await emailService.sendSimpleEmail({
        receiverEmail: dataInput.email,
        patientName: dataInput.fullName, // tên bệnh nhân
        doctorName: dataInput.doctorName, // tên bác sĩ
        time: dataInput.timeString, // thời gian
        language: dataInput.language, // ngôn ngữ

        // chuyển trạng thái chờ
        // link xác nhận -> cần lưu token bên db để FE có thể click
        // link này sẽ gửi (FE) request lên (BE) để thay đổi trạng thái booking (đang chờ -> xác nhận)
        // không nên truyền patientID vào token email vì nó phải create trước -> bị chậm
        redirectLink: buildUrlEmail(dataInput.doctorID, token),
      });

      // upsert patient
      // upsert: nếu có thì update, không có thì insert
      // findOrCreate return array [data, boolean(created)] -> chỉ lấy obj data thì cần user[0]
      let user = await db.User.findOrCreate({
        where: { email: dataInput.email },
        defaults: {
          email: dataInput.email,
          roleID: "R3", // R3: patient
        },
      });

      // create booking record
      if (user && user[0]) {
        await db.Booking.findOrCreate({
          where: {
            patientId: user[0].id,
          },
          defaults: {
            statusId: "S1",
            doctorId: dataInput.doctorID,
            patientId: user[0].id,
            date: dataInput.date, // ngày : bên FE (3165133) -> tự động convert dang dd/mm/yyyy
            timeType: dataInput.timeType,
            token: token,
          },
        });
        //   console.log(">>>check user: ", user[0]);
      }

      return {
        EM: "create patient success", //error message
        EC: 0, //error code
        DT: [], // data
      };
    } else {
      return {
        EM: "create patient miss", //error message
        EC: 1, //error code
        DT: [], // data
      };
    }
  } catch (error) {
    console.log(">>>check err postBookAppointment: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

const postVerifyBookAppointment = async (dataInput) => {
  try {
    if (dataInput.token && dataInput.doctorID) {
      let appointment = await db.Booking.findOne({
        where: {
          token: dataInput.token,
          doctorId: dataInput.doctorID,
          statusId: "S1", // chuyển trạng thái khi lấy token từ this.props.match.params.id
        },
        raw: false, // dùng .save phải có raw: false
      });

      // update status
      if (appointment) {
        appointment.statusId = "S2";
        await appointment.save();

        return {
          EM: "update the appointment success", //error message
          EC: 0, //error code
          DT: [], // data
        };
      } else {
        return {
          EM: "appointment has been active", //error message
          EC: 1, //error code
          DT: [], // data
        };
      }
    } else {
      return {
        EM: "create the appointment miss", //error message
        EC: 1, //error code
        DT: [], // data
      };
    }
  } catch (error) {
    console.log(">>>check err postVerifyBookAppointment: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

module.exports = {
  postBookAppointment,
  postVerifyBookAppointment,
};
