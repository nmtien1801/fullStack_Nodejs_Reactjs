// search: sequelize add column

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("User", "image", {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn("User", "positionId", {
        type: Sequelize.STRING,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("User", "image"),
      queryInterface.removeColumn("User", "positionId"),
    ]);
  },
};
