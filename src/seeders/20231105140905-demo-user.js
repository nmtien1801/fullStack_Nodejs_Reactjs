"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // import data ytb sern 52: https://docs.google.com/spreadsheets/d/175ts9y-bJGAwEUtVEFojJQ4nFCH_lIU0poA0wVjM_lk/edit?gid=466017350#gid=466017350
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "admin@gmail.com",
          passWord: "1234",
          userName: "fake2",
          address: "HN",
          sex: "Male",
          phone: "0123456985",
          groupID: 2,
        },
        {
          email: "dev@gmail.com",
          passWord: "1234",
          userName: "fake3",
          address: "An Giang",
          sex: "Male",
          phone: "0129526789",
          groupID: 2,
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
