'use strict';

const initialComments = require('./20240208193052-add-comments.json');

const TABLE_NAME = 'comments';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      initialComments
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TABLE_NAME, {
      name: initialComments.map((comment) => comment.name),
    });
  },
};
