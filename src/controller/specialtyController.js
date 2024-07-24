import specialtyService from "../service/specialtyService";

const createSpecialty = async (req, res) => {
  try {
    let data = await specialtyService.createSpecialty(req.body);
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(">>>check err createSpecialty: ", error);
    return res.status(500).json({
      EM: "error from sever",
      EC: 2,
      DT: "",
    });
  }
};

const getAllSpecialty = async (req, res) => {
  try {
    let data = await specialtyService.getAllSpecialty();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log(">>>check err getAllSpecialty: ", error);
    return res.status(500).json({
      EM: "error from sever",
      EC: 2,
      DT: "",
    });
  }
};
module.exports = {
  createSpecialty,
  getAllSpecialty,
};
