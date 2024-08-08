// search: sequelize add column

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("User", "image", {
        // type: Sequelize.STRING,
        type: Sequelize.BLOB("long"), // postgres không dùng migrate_updateColumnUser.js được
      }),
      queryInterface.addColumn("User", "positionID", {
        type: Sequelize.STRING,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("User", "image"),
      queryInterface.removeColumn("User", "positionID"),
    ]);
  },
};
