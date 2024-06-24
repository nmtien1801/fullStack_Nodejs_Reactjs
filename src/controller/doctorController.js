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
      EM: "error from sever", //error message
      EC: 2, //error code
      DT: "", // data
    });
  }
};

module.exports = {
  getDoctorHome,
};
