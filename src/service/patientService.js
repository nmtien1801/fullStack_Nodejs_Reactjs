import db from "../models/index";
require("dotenv").config(); // dùng env
import _, { find, includes } from "lodash";
import { Find_ConvertDateToTimeStampSchedule } from "../config/find_ConvertDate";
import emailService from "./emailService";

const postBookAppointment = async (dataInput) => {
  try {
    if (
      dataInput.email &&
      dataInput.doctorID &&
      dataInput.date &&
      dataInput.timeType &&
      dataInput.fullName
    ) {
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
        redirectLink: "https://www.youtube.com/@TienNguyen-fu4is",
      });

      // upsert patient
      // upsert: nếu có thì update, không có thì insert
      // findOrCreate return array [data, boolean(created)] -> chỉ lấy obj data thì cần user[0]
      let user = await db.User.findOrCreate({
        where: { email: dataInput.email },
        defaults: {
          email: dataInput.email,
          roleId: "R3", // R3: patient
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

module.exports = {
  postBookAppointment,
};
