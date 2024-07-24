"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Doctor_Info", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      doctorID: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      specialtyID: {
        type: Sequelize.INTEGER,
      },
      clinicID: {
        type: Sequelize.INTEGER,
      },
      priceID: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      provinceID: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      paymentID: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      addressClinic: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nameClinic: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      note: {
        type: Sequelize.STRING,
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Doctor_Info");
  },
};

// npx sequelize-cli db:migrate --to migrate_Doctor_info.js
