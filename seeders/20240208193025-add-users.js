'use strict';

const initialUsers = require('./20240208193025-add-users.json');

const TABLE_NAME = 'users';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      initialUsers,
      {},
      {
        role: { type: new Sequelize.JSON() },
        status: { type: new Sequelize.JSON() },
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TABLE_NAME, {
      name: initialUsers.map((user) => user.name),
    });
  },
};
