"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Role",
      [
        {
          url: "/user/read",
          description: "show all user",
        },
        {
          url: "/user/create",
          description: "create user",
        },
        {
          url: "/user/update",
          description: "update user",
        },
        {
          url: "/user/delete",
          description: "delete user",
        },
        {
          url: "/group/read",
          description: "read group",
        },
        {
          url: "/role/create",
          description: "create roles",
        },
        {
          url: "/role/read",
          description: "read all role",
        },
        {
          url: "/role/delete",
          description: "delete role",
        },
        {
          url: "/role/by-groupd",
          description: "get roles in group",
        },
        {
          url: "/role/assign-to-group",
          description: "delete -create role in group-role click",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
