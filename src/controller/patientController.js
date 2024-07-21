import patientService from "../service/patientService";

const postBookAppointment = async (req, res) => {
  try {
    let data = await patientService.postBookAppointment(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(">>>check err postBookAppointment: ", error);
    return res.status(500).json({
      EM: "error from sever",
      EC: 2,
      DT: "",
    });
  }
};
module.exports = {
  postBookAppointment,
};
