"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Markdown", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contentHTML: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      contentMarkdown: {
        type: Sequelize.TEXT("long"),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      doctorID: {
        type: Sequelize.INTEGER,
      },
      specialtyID: {
        type: Sequelize.INTEGER,
      },
      clinicID: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Markdown");
  },
};

// npx sequelize-cli db:migrate --to migrate_markdown.js
