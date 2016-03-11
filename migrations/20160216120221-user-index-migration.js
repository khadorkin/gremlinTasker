'use strict';

module.exports = {
  up: function (queryInterface) {
    queryInterface.addIndex('users', ['email']);
    return queryInterface.addIndex('users', ['username']);
  },

  down: function (queryInterface) {
    queryInterface.removeIndex('users', ['username']);
    return queryInterface.removeIndex('users', ['email']);
  }
};
