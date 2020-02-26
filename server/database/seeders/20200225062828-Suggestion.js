'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Suggestions',
    [
      {
        prodId: '5e50a752f4f45d19d43bcc62',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        prodId: '5e50a768f4f45d19d43bcc63',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Suggestions', null, {}),
};
