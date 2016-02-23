"use strict";

const bcrypt = require("bcryptjs");

module.exports = function(sqlize, DataTypes) {

  // Define the user.
  let user = sqlize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'username',
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      field: 'email',
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      field: 'password',
      allowNull: false,
      validate: {
        notEmpty: true
      },
      set: function(val) {
        this.setDataValue('password', bcrypt.hashSync(val));
      }
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['username']
      },
      {
        unique: true,
        fields: ['email']
      },
    ],
    instanceMethods: {

      /**
       * Check to see if the password is the same as the hashed password
       * @param String password
       * @param function(error, boolean isMatched) cb
       * @return {Boolean}
       */
      checkPassword: function(password, cb) {
        return bcrypt.compare(password, this.password, cb);
      }
    }
  });

  // Define the relationships

  // Return the user.
  return user;
};