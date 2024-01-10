import db from "../models/index";

const getGroupWithRoles = async (user) => {
  // scope: phạm vi
  let role = await db.Group.findOne({
    where: { id: user.groupID },
    attributes: ["id", "name", "description"],
    include: [
      {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
    ],

    //     raw: true,
    //     nest: true,
  });
  return role ? role : {};
};

module.exports = {
  getGroupWithRoles,
};
