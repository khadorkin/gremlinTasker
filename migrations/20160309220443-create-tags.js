'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'tags',
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
        boardId: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'boards',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        }
      }
    );
  },

  down: function (queryInterface) {
    return queryInterface.dropTable('tags');
  }
};
