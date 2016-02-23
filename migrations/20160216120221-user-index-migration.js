'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
     queryInterface.addIndex('users', ['email']);
     return queryInterface.addIndex('users', ['username']);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
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
