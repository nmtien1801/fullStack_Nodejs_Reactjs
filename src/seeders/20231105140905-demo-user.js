"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // email: DataTypes.STRING,
    //   passWord: DataTypes.STRING,
    //   userName: DataTypes.STRING,
    //   address: DataTypes.STRING,
    //   sex: DataTypes.STRING,
    //   phone: DataTypes.STRING,
    //   gender: DataTypes.BOOLEAN,
    //   groupID: DataTypes.INTEGER,
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
