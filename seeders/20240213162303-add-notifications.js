'use strict';

const initialNotifications = require('./20240213162303-add-notifications.json');

const TABLE_NAME = 'notifications';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      initialNotifications
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TABLE_NAME, {
      name: initialNotifications.map((notification) => notification.name),
    });
  },
};
