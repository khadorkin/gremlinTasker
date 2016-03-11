'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable(
      'userBoards',
      {
        userId: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        boardId: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'boards',
            key: 'id'
          },
          onDelete: 'CASCADE'
        }
      }
    ).then(() => {
      return queryInterface.addIndex(
        'userBoards',
        ['userId', 'boardId'],
        {
          indexName: 'usersBoardsPK',
          indicesType: 'unique'
        }
      );
    });
  },

  down: function (queryInterface) {
    return queryInterface.dropTable('userBoards');
  }
};
