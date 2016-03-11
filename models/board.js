'use strict';

export default function(sqlize, DataTypes) {
  const Board = sqlize.define('board', {
    name: {
      type: DataTypes.STRING,
      field: 'name',
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    }
  },
  {},{
    classMethods: {
      // Define the relationships
      associate(models) {
        Board.belongsToMany(models.user, {as: 'users', through: 'userBoards'});
        Board.hasMany(models.task, {as: 'tasks'});
      }
    }
  });

  return Board;
}