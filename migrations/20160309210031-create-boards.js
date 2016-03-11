'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'boards',
      {
        id: {
          type: Sequelize.BIGINTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        }
      }
    );
  },

  down: function (queryInterface) {
    return queryInterface.dropTable('boards');
  }
};
