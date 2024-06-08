"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Group_Role",
      [
        {
          groupID: "2",
          roleID: "1",
        },
        {
          groupID: "2",
          roleID: "2",
        },
        {
          groupID: "2",
          roleID: "3",
        },
        {
          groupID: "2",
          roleID: "4",
        },
        {
          groupID: "2",
          roleID: "5",
        },
        {
          groupID: "2",
          roleID: "6",
        },
        {
          groupID: "2",
          roleID: "7",
        },
        {
          groupID: "2",
          roleID: "8",
        },
        {
          groupID: "2",
          roleID: "9",
        },
        {
          groupID: "2",
          roleID: "10",
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
