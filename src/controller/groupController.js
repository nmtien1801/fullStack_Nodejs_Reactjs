import groupService from "../service/groupService";

const read = async (req, res) => {
  try {
    let data = await groupService.getGroup();
    return res.status(200).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT, // data
    });
  } catch (error) {
    console.log(">>>>check err: ", error);
    return res.status(500).json({
      EM: "error from sever", //error message
      EC: 2, //error code
      DT: "", // data
    });
  }
};

module.exports = { read };
