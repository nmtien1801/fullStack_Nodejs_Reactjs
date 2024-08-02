require("dotenv").config(); // dùng env
import nodemailer from "nodemailer";

// search : nodemailer
let sendSimpleEmail = async (dataSend) => {
  // fortmat email chủ -> nơi gửi email đến patient
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // gửi mail tới đối tượng chủ transporter
  const info = await transporter.sendMail({
    from: '"tên fake email👻" <tiennguyenminh1801@gmail.com>', // sender address
    to: dataSend.receiverEmail, // email của patient -> "a@example.com, b@example.com"
    subject: "Tiêu đề - THÔNG TIN ĐẶT LỊCH KHÁM BỆNH", // Subject line
    html: getBodyHTMLEmail(dataSend), // html body -> lưu theo ngôn ngữ
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
      <h3> Xin chào ${dataSend.patientName}!</h3>
      <p> Bạn đã đặt lịch khám bệnh online thành công tại phòng khám chúng tôi</p>
      <p> Thông tin chi tiết: </p>
      <div> <b>Bác sĩ: ${dataSend.doctorName}</b> </div>
      <div> <b>Thời gian: ${dataSend.time}</b> </div>

      <p> Nếu thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác
      nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>

      <div> <a href=${dataSend.redirectLink} target="_blank">Click here</a> </div>
      <div> <b>Trân trọng!</b> </div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3> Dear ${dataSend.patientName}!</h3>
    <p> You have successfully booked an online medical examination appointment at our clinic </p>
    <p> Details: </p>
    <div> <b> Doctor: ${dataSend.doctorName}</b> </div>
    <div> <b> Time: ${dataSend.time}</b> </div>

    <p> If the above information is true, please click on the link below to confirm 
    and complete the medical appointment procedure.</p>

    <div> <a href=${dataSend.redirectLink} target="_blank" >Click here</a> </div>
    <div> <b>Best regards!</b> </div>
  `;
  }
  return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
      <h3> Xin chào ${dataSend.patientName}!</h3>
      <p> Bạn đã nhận được email này vì đã đặt lịch khám bệnh online thành công tại phòng khám chúng tôi</p>
      <p> Thông tin đơn thuốc/ hoá đơn được gửi trong file đính kèm sau: </p>
   
      <div> <b>Xin chân thành cảm ơn!</b> </div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3> Dear ${dataSend.patientName}!</h3>
    <p> You are receiving this email because you have successfully booked an online medical examination appointment at our clinic </p>
    <p> Prescription / invoice information is sent in the attached file below: </p>

    <div> <b>Thank you very much!</b> </div>
  `;
  }
  return result;
};

// gửi tệp kèm theo (ảnh / video) tới email
// search: How to send email attachments using nodemailer
let sendAttachmentEmail = async (dataSend) => {
  // fortmat email chủ -> nơi gửi email đến patient
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // gửi mail tới đối tượng chủ transporter
  const info = await transporter.sendMail({
    from: '"tên fake 2 email👻" <tiennguyenminh1801@gmail.com>', // sender address
    to: dataSend.email, // email của patient -> "a@example.com, b@example.com"
    subject: "KẾT QUẢ ĐẶT LỊCH KHÁM BỆNH", // Subject line
    html: getBodyHTMLEmailRemedy(dataSend), // html body -> lưu theo ngôn ngữ
    // search: nodejs send image base64 as attachment
    attachments: [
      {
        filename: `remedy-${dataSend.patientID}-${new Date().getTime()}.png`, // file khi được lưu vào email có dạng này
        content: dataSend.imgBase64.split("base64,")[1], // lấy đường dẫn từ FE gửi xuống
        encoding: "base64",
      },
    ],
  });
};

module.exports = { sendSimpleEmail, sendAttachmentEmail };
