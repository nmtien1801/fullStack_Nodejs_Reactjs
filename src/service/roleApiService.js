import db from "../models/index";
import _ from "lodash";
const createNewRoles = async (roles) => {
  try {
    // search: how to get difference between two arrays of objects javascript
    let currentRoles = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });

    const persist = roles.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)
    );

    console.log(">>>>check currentRoles: ", currentRoles);
    console.log(">>>>check dif: ", persist);
    if (persist.length === 0) {
      return {
        EM: "notthing to create roles...", //error message
        EC: 1, //error code
        DT: [], // data
      };
    }
    await db.Role.bulkCreate(persist);
    return {
      EM: `create roles success: ${persist.length} role`, //error message
      EC: 0, //error code
      DT: [], // data
    };
  } catch (error) {
    console.log(">>>check err createNewRoles: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

const getAllRoles = async () => {
  try {
    let data = await db.Role.findAll({
      attributes: ["id", "url", "description"],
      order: [["id", "ASC"]],
    });
    return {
      EM: `get all roles success`, //error message
      EC: 0, //error code
      DT: data, // data
    };
  } catch (error) {
    console.log(">>>check err getAllRoles: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

const deleteRole = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: { id: id },
    });
    if (role) {
      await role.destroy();
      return {
        EM: "delete role success",
        EC: 0,
        DT: [], // data
      };
    } else {
      return {
        EM: "role not exists",
        EC: 1,
        DT: [], // data
      };
    }
  } catch (error) {
    console.log(">>>check err deleteRole: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

const getRoleByGroup = async (id) => {
  try {
    // Group - Role(N-1)

    let role = await db.Group.findOne({
      where: { id: id },
      // join
      include: [
        {
          model: db.Role,
          attributes: ["id", "url", "description"],
          through: { attributes: [] }, // không lấy bảng đính kèm ngoài attribute
        },
      ],
    });
    if (id) {
      return {
        EM: "get roles by group success",
        EC: 0,
        DT: role, // data
      };
    } else {
      return {
        EM: "not found any roles",
        EC: 1,
        DT: [], // data
      };
    }
  } catch (error) {
    console.log(">>>check err getRoleByGroup service: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};

const assignRoleToGroup = async (data) => {
  try {
    await db.Group_Role.destroy({
      where: { groupID: +data.groupId},
    });
    await db.Group_Role.bulkCreate(data.groupRoles);

    return {
      EM: `assign role group success`, //error message
      EC: 0, //error code
      DT: [], // data
    };
  } catch (error) {
    console.log(">>>check err assignRoleToGroup: ", error);
    return {
      EM: "some thing wrongs with service", //error message
      EC: 2, //error code
      DT: [], // data
    };
  }
};
module.exports = {
  createNewRoles,
  getAllRoles,
  deleteRole,
  getRoleByGroup,
  assignRoleToGroup,
};
