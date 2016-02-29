'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      'tasks',
      {
        id: {
          type: Sequelize.INTEGER,
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
          type: Sequelize.INTEGER,
          allowNull: false,
          references: 'users',
          referenceKey: 'id',
          onDelete: 'CASCADE'
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.STRING
        },
        completedAt: {
          type: Sequelize.DATE
        },
        isComplete: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        priority: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        difficulty: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        dueDate: {
          type: Sequelize.DATE
        }
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
