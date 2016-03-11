'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'comments',
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
        userId: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        taskId: {
          type: Sequelize.BIGINT,
          allowNull: false,
          references: {
            model: 'tasks',
            key: 'id'
          },
          onDelete: 'CASCADE'
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false
        }
      }
    );
  },

  down: function (queryInterface) {
    return queryInterface.dropTable('comments');
  }
};
