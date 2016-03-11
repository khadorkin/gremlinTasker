'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'tasks',
      'boardId',
      {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'boards',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    );
  },

  down: function (queryInterface) {
    return queryInterface.removeColumn('tasks', 'boardId');
  }
};
