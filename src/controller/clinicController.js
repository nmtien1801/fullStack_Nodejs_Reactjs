import clinicService from "../service/clinicService";

const createClinic = async (req, res) => {
  try {
    let data = await clinicService.createClinic(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(">>>check err createClinic: ", error);
    return res.status(500).json({
      EM: "error from sever",
      EC: 2,
      DT: "",
    });
  }
};

const getAllClinic = async (req, res) => {
  try {
    let data = await clinicService.getAllClinic();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(">>>check err getAllClinic: ", error);
    return res.status(500).json({
      EM: "error from sever",
      EC: 2,
      DT: "",
    });
  }
};

const getDetailClinicById = async (req, res) => {
  try {
    let data = await clinicService.getDetailClinicById(req.query.id);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(">>>check err getDetailClinicById: ", error);
    return res.status(500).json({
      EM: "error from sever",
      EC: 2,
      DT: "",
    });
  }
};

module.exports = {
  createClinic,
  getAllClinic,
  getDetailClinicById,
};
