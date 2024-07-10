import doctorService from "../service/doctorService";

const getDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;

  try {
    let data = await doctorService.getTopDoctorHome(+limit);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT, // data
    });
  } catch (error) {
    console.log(">>>check err doctorHome: ", error);
    return res.status(500).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  }
};

const getAllDoctor = async (req, res) => {
  try {
    let data = await doctorService.getAllDoctors();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(">>>check err getAllDoctor: ", error);
    return res.status(500).json({
      EM: "error from sever",
      EC: 2,
      DT: "",
    });
  }
};

const postInfoDoctor = async (req, res) => {
  try {
    let data = await doctorService.saveDetailInfoDoctor(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(">>>check err postInfoDoctor: ", error);
    return res.status(500).json({
      EM: "error from sever",
      EC: 2,
      DT: "",
    });
  }
};

const getDetailDoctorById = async (req, res) => {
  try {
    let data = await doctorService.getDetailDoctorById(+req.query.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(">>>check err getDetailDoctorById: ", error);
    return res.status(500).json({
      EM: "error from sever",
      EC: 2,
      DT: "",
    });
  }
};

const bulkCreateSchedule = async (req, res) => {
  try {
    let data = await doctorService.bulkCreateSchedule(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(">>>check err bulkCreateSchedule: ", error);
    return res.status(500).json({
      EM: "error from sever",
      EC: 2,
      DT: "",
    });
  }
};

module.exports = {
  getDoctorHome,
  getAllDoctor,
  postInfoDoctor,
  getDetailDoctorById,
  bulkCreateSchedule,
};
