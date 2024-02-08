'use strict';

const TABLE_NAME = 'users';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
      },
      sex: {
        type: Sequelize.STRING,
      },
      about: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      friends: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      achievements: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      avatar: {
        type: Sequelize.STRING,
      },
      wallpaper: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable(TABLE_NAME);
  },
};
