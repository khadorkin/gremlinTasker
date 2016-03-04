'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'tasks',
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
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT
        },
        completedAt: {
          type: Sequelize.DATE
        },
        isComplete: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        priority: {
          type: Sequelize.BIGINT,
          defaultValue: 0
        },
        difficulty: {
          type: Sequelize.BIGINT,
          defaultValue: 0
        },
        dueDate: {
          type: Sequelize.DATE
        }
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('tasks');
  }
};
