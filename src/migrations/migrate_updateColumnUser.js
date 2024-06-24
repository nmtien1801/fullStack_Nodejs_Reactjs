// search: sequelize change column
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("User", "image", {
        type: Sequelize.BLOB("long"),
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("User", "image", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },
};

// npx sequelize-cli db:migrate --to migrate_updateColumnUser.js
