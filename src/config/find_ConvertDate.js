import _ from "lodash";
import db from "../models/index";

// ngày tháng năm
// vì date khi chọn từ FE sẽ có dạng 2133261 và đc lưu vào db dạng dd/mm/yyyy
// nên khi muốn tìm theo ngày cần convert dd/mm/yyyy sang 2133261

const Find_ConvertDateToTimeStampSchedule = async (exists) => {
  try {

    // xem FE chuyển lên ở header bên Network của inspect
    // ngày tháng năm
    // ngày có dạng 146452300 khác với trong DB là 10/07/2024
    // dù bên FE đã format đúng rồi nhưng mặc định chuyền lên là 1 chuỗi(146452300) nên vẫn phải format lại ở BE
    if (exists && exists.length > 0) {
      exists = exists.map((item) => {
        item.date = new Date(item.date).getTime();
        return item;
      });
    }

    return exists;
  } catch (error) {
    console.log(">>>check err Find_ConvertDateToTimeStampSchedule: ", error);
  }
};

module.exports = { Find_ConvertDateToTimeStampSchedule };
